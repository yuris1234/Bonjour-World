const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIASIXB3QQCEJCGOWBG',
  secretAccessKey: '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',
  region: 'us-east-1',
});

module.exports = new AWS.S3();