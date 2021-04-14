import AWS from 'aws-sdk';

console.log('Created AWS S3 Instance');
export const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    signatureVersion: 'v4',
    region: 'US West (Oregon) us-west-2',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

