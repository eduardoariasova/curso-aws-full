// FUNCIONES
const verificarEstadoTrabajo = require('./verificarEstadoTrabajo');

module.exports = function(jobId){
    const interval = 5000; // 5 segundos


    return new Promise( (resolve, reject) => {

        const verificar = async() => {
            try{
                const estado = await verificarEstadoTrabajo(jobId);
                console.log("Estado trabajo: ", estado);

                if(estado === "COMPLETE"){resolve('trabajo completado'); }
                else if(estado === "ERROR"){resolve('error en el trabajo');}

                // si no hemos obtenido una respuesta
                else{ setTimeout(verificar, interval); }
            }
            catch(err){
                console.log("error al ejecutar espera finalización del trabajo.");
                reject(err);
            }
        }

        verificar(); // ejecutar función

    } );
}