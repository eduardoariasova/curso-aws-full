// PAQUETES
const path           = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const router         = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const multer         = require('multer');
const {PutObjectCommand} = require("@aws-sdk/client-s3");
// FUNCIONES
const { s3, bucketAWS } = require('../configAWS.js');






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
                return res.status(200).json({mensaje: "archivo subido correctamente."})
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








module.exports = router;