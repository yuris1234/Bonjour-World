const AWS = require('aws-sdk');
const config = require('./config');

AWS.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: config.region,
});

module.exports = new AWS.S3();