// PAQUETES
const path           = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const router         = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const multer         = require('multer');
const {PutObjectCommand } = require("@aws-sdk/client-s3");
const {CreateJobCommand}  = require('@aws-sdk/client-mediaconvert');
// FUNCIONES
const { s3, bucketAWS, regionAWS, mediaConvert } = require('../configAWS.js');






router.route("/subida-archivo")
.post(async function(req, res){
    try{
        const tipoArchivo = req.query.tipoArchivo; // image/jpeg
        const idUnico     = uuidv4(); // id Único.
        const extension   = tipoArchivo.startsWith('image') ? ".jpg" : ".mp4";
        const rutaEnS3    = "archivos/" + idUnico + extension;
        console.log("ruta en s3: ", rutaEnS3);
        // MULTER
        const storage = multer.memoryStorage(); // se almacena de forma temporal.
        const upload  = multer({storage: storage});

        upload.single('file')(req, res, async(err) => {
            if(err) console.log("error desde upload: ", err);

            const params = {
                Bucket: bucketAWS,
                Key: rutaEnS3,
                Body: req.file.buffer,
                ContentType: tipoArchivo
            }

            // ejecutamos la subida
            const comand = new PutObjectCommand(params);
            await s3.send(comand)
            .then(response => {
                let urlGlobal = "https://" + bucketAWS + ".s3." + regionAWS + ".amazonaws.com/" + rutaEnS3; // ruta del archivo
                return res.status(200).json({mensaje: "archivo subido correctamente.", urlGlobal })
            })
            .catch( (error) => {
                console.log("error en enviar el comando. ", error);
                return res.status(400).json({mensaje: "error al enviar el comando."});
            });
        })
    }
    catch(err){
        console.log("error en la solicitud. ", err);
        return res.json({error: err, mensaje: "error al ejecutar servidor."});
    }
});



router.route("/recortar-video")
.post(async function(req, res){

    try{
        const { urlVideo } = req.body.params;
        
        // Extraer el ID entre 'archivos/' y '.mp4'
        const idArchivo = urlVideo.match(/archivos\/(.*?)\.mp4/)[1];
        const urlDestino = "s3://" + bucketAWS + "/editados/" + idArchivo + ".mp4"; // ruta del archivo
        

        let createJobParams = {};
        createJobParams = {
        Role: process.env.ROLE,
        Settings: {
            Inputs: [
                {
                FileInput: urlVideo, // desde donde proviene el video
                TimecodeSource: "ZEROBASED", // Ignora cualquier timecode que venga dentro del archivo original. Empieza a contar el tiempo desde cero.
                InputClippings: [
                    {
                        StartTimecode: "00:00:00:00", // Comienza desde el inicio del video
                        EndTimecode: "00:00:10:00",   // Termina a los 10 segundos
                    },
                ],
                VideoSelector: {
                    ColorSpace: 'FOLLOW', // Ajuste para seguir el espacio de color del archivo de entrada
                },
                AudioSelectors: {
                    'Audio Selector 1': {
                    SelectorType: 'TRACK',
                    Tracks: [1] // Seleccionar la primera pista de audio
                    }
                }
                }
            ],
            OutputGroups: [
            {
            Name: 'File Group',
            Outputs: [
                {
                ContainerSettings: {
                    Container: 'MP4'
                },
                VideoDescription: {
                    Width: 1920,  // Ancho en píxeles 
                    Height: 1080, // Alto en píxeles
                    CodecSettings: {
                    Codec: 'H_264',
                    H264Settings: {
                        RateControlMode: 'QVBR',
                        MaxBitrate: 3000000, // MBPS Igual al valor usado en MediaRecorder, pero redondeado
                        FramerateControl: 'SPECIFIED', // Especificar la tasa de cuadros por segundo
                        FramerateNumerator: 30, // Numerador de la tasa de cuadros
                        FramerateDenominator: 1 // Denominador de la tasa de cuadros, para 60 fps se usa 1
                    }
                    }
                },
                AudioDescriptions: [
                    {
                    AudioSelectorName: 'Audio Selector 1',
                    CodecSettings: {
                        Codec: 'AAC',
                        AacSettings: {
                        Bitrate: 128000, // 128 Kbps ejempo, igual al valor usado en MediaRecorder, pero redondeado
                        CodingMode: 'CODING_MODE_2_0',
                        SampleRate: 48000 // HZ Igual al valor por defecto en MediaRecorder
                        }
                    }
                    }
                ]
                },
            ],
            OutputGroupSettings: {
                Type: 'FILE_GROUP_SETTINGS',
                FileGroupSettings: {
                    Destination: urlDestino
                }
            }
            }
            ],
        },
        };


        let job = await mediaConvert.send(new CreateJobCommand(createJobParams)); // ejecutamos conversión

        return res.json({mensaje: "video recortado correctamente."});
    }
    catch(err){
        console.log("error al recortar: ", err);
        return res.json({mensaje: "error al recortar", err});
    }
});








module.exports = router;