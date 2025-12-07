// PAQUETES
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { S3Client }           = require("@aws-sdk/client-s3");
const { MediaConvertClient } = require('@aws-sdk/client-mediaconvert');
const { SQSClient }          = require('@aws-sdk/client-sqs');

// VARIABLES
const regionAWS = process.env.REGIONAWS;
const bucketAWS = process.env.BUCKET;


// CLIENTE S3
const s3 = new S3Client({
    region: regionAWS,
    credentials: {
        accessKeyId: process.env.CLAVEACCESO,
        secretAccessKey: process.env.CLAVEACCESOSECRETA,
    }
});

// CLIENTE MEDIA CONVERT
const mediaConvert = new MediaConvertClient({
    region: regionAWS,
    endpoint: process.env.ENDPOINT,
    credentials: {
        accessKeyId: process.env.CLAVEACCESO,
        secretAccessKey: process.env.CLAVEACCESOSECRETA,
    }
});

// CLIENTE SQS
const sqs = new SQSClient({
    region: regionAWS,
    credentials: {
        accessKeyId: process.env.CLAVEACCESO,
        secretAccessKey: process.env.CLAVEACCESOSECRETA,
    }
});

const colaS6 = process.env.COLAS6;






// EXPORTAR
module.exports = {
    s3,
    bucketAWS,
    regionAWS,
    mediaConvert,
    sqs,
    colaS6
};