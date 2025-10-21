// PAQUETES
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { S3Client }           = require("@aws-sdk/client-s3");
const { MediaConvertClient } = require('@aws-sdk/client-mediaconvert');

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







// EXPORTAR
module.exports = {
    s3,
    bucketAWS,
    regionAWS,
    mediaConvert
};