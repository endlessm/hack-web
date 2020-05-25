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
