/* Copyright © 2020 Endless OS LLC
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

require('dotenv').config();

const mime = require('mime-types');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.KEY,
  secretAccessKey: process.env.SECRET,
  region: 'us-east-2',
});
const cloudFront = new AWS.CloudFront({
  accessKeyId: process.env.KEY,
  secretAccessKey: process.env.SECRET,
  region: 'us-east-2',
});

const fs = require('fs');
const path = require('path');

const { resolve } = require('path');
const { readdir } = require('fs').promises;

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

function uploadToS3(bucketName, keyPrefix, filePath) {
  const fileName = path.basename(filePath);
  const fileStream = fs.createReadStream(filePath);
  const keyName = path.join(keyPrefix, fileName);

  return new Promise(function(resolve, reject) {
    fileStream.once('error', reject);
    const params = {
      Bucket: bucketName,
      Key: keyName,
      Body: fileStream,
      ContentType: mime.lookup(filePath),
    };

    // 10 minutes cache for index.html
    if (fileName === 'index.html') {
      params.CacheControl = 'max-age=600';
    }

    s3.upload(params).promise().then(resolve, reject);
  });
}

const branch = path.basename(process.env.HOME).split('-').slice(-1).pop();
const bucket = branch === 'stable' ? 'try.hack-computer.com' : 'dev.hack-computer.com';
const cloudFrontId = branch === 'stable' ? 'E16ECAJWT8UJVA' : 'E35AUTY1DEB5BT';

getFiles('build')
  .then((files) => {
    files.forEach((f) => {
      const prefix = path.dirname(path.relative('build', f));
      uploadToS3(bucket, prefix, f);
    });
  })
  .catch((e) => console.error(e));

// Invalidating CloudFront distribution cache
console.log('Invalidating cloudfront cache...');
cloudFront.createInvalidation({
  DistributionId: cloudFrontId,
  InvalidationBatch: {
    CallerReference: (+new Date()).toString(),
    Paths: {
      Quantity: 1,
      Items: [ '/index.html' ],
    },
  },
}, (err, data) => {
  if (err)
    console.log(err, err.stack);
  else
    console.log('Cloudfront cache invalidated');
});
