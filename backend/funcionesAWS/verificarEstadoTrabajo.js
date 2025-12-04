// PAQUETES
const { mediaConvert } = require('../configAWS.js');
const { GetJobCommand } = require("@aws-sdk/client-mediaconvert");

module.exports = async function(jobId){
    try{
        const command = new GetJobCommand({ Id: jobId});
        const response = await mediaConvert.send(command);

        return response.Job.Status; // retornamos la respuesta del trabajo.
    }
    catch(err){
        console.log("error al obtener información del trabajo.");
        throw err;
    }
}

