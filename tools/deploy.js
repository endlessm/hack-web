'use strict';

require('dotenv').config();

const mime = require('mime-types');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
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
    s3.upload({
      Bucket: bucketName,
      Key: keyName,
      Body: fileStream,
      ContentType: mime.lookup(filePath),
    }).promise().then(resolve, reject);
  });
}

const exec = require('child_process').execSync;
const branch = exec('git rev-parse --abbrev-ref HEAD').toString().trim();
const bucket = branch === 'stable' ? 'hack-web-stable' : 'hack-web';

getFiles('build')
  .then((files) => {
    files.forEach((f) => {
      const prefix = path.dirname(path.relative('build', f));
      uploadToS3(bucket, prefix, f);
    });
  })
  .catch((e) => console.error(e));
