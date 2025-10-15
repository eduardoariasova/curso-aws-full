// PAQUETES
import { useEffect, useState } from 'react';
import axios from 'axios';
//import axios from 'axios';


function Home() {

    const [archivo, setArchivo] = useState(null);


    function controlArchivo(event){
        const archivoSubido = event.target.files[0];
        console.log("Archivo subido: ", archivoSubido);

        if(!archivoSubido){alert("no subiste ningún archivo."); return;}

        setArchivo(archivoSubido);
    }
    

    async function subidaS3(event){
        event.preventDefault(); 

        if(!archivo){alert("no subiste ningún archivo."); return;}

        const formData = new FormData();
        formData.append('file', archivo);


        // DETERMINAR SI ES VIDEO O SI ES IMAGEN
        const tipoArchivo = archivo.type;

        // enviamos al servidor
        const response = await axios.post("/subida-archivo", formData, {
            headers: {'Content-Type': 'multipart/form-data',},
            params: {tipoArchivo: tipoArchivo},
        });

        alert(response.data.mensaje);
    }


    

    return(
    <div>
        <div className="container text-center my-5">
            <h1>Curso AWS</h1>
            <p>AWS Fullstack: Node.js + React + Servicios en la Nube</p>
            
            <div className="mt-4 mb-4">
                <input type="file" accept="image/*,video/*" className="form-control w-75 mx-auto" id="formFile" onChange={controlArchivo} />
            </div>

            <div className="row justify-content-center">
                <div className="col-auto">
                    <button onClick={subidaS3} className="btn btn-primary">Subir archivo a s3</button>
                </div>
                <div className="col-auto">
                    <button className="btn btn-success">Acción 2</button>
                </div>
                <div className="col-auto">
                    <button className="btn btn-danger">Acción 3</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Home;