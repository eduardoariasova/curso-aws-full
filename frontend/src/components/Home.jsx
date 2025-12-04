// PAQUETES
import { useEffect, useState } from 'react';
import axios from 'axios';
//import axios from 'axios';
// COMPONENTES
import ZonaCargando from './ZonaCargando';

function Home() {

    const [archivo, setArchivo]           = useState(null);
    const [urlVideo, setURLVideo]         = useState("");
    const [cargando, setCargando]         = useState(null);
    const [videoMostrar, setVideoMostrar] = useState(null);


    function controlArchivo(event){
        const archivoSubido = event.target.files[0];
        console.log("Archivo subido: ", archivoSubido);

        if(!archivoSubido){alert("no subiste ningún archivo."); return;}

        setArchivo(archivoSubido);
    }
    

    async function subidaS3(event){
        setCargando(true);
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

        setCargando(false);
        
        if(response.status === 200){
            setURLVideo(response.data.urlGlobal); // guardamos la url para mostrarla
        }
        alert(response.data.mensaje);
    }

    function controlURL(event) {
        const urlEscrita = event.target.value.trim();
        setURLVideo(urlEscrita);

        try {
            new URL(urlEscrita); // Si no es una URL válida, lanza error
            console.log("✅ Es una URL válida");
            //alert("✅ Es una URL válida");
        } catch {
            console.log("❌ No es una URL válida");
            alert("❌ No es una URL válida");
        }
    }


    async function recortarVideo(event){
        console.log("urlVideo: ", urlVideo);

        const responseRecortar = await axios.post("/recortar-video", {
            params: {urlVideo}
        });

        console.log(responseRecortar);
    }

    async function edicionCompleta(event){
        setCargando(true);
        const response = await axios.post("/edicion-completa", {
            params: {urlVideo}
        });

        setCargando(false);

        if(response.status === 200){ 
            alert("video editado correctamente."); 
            setVideoMostrar(response.data.urlAmostrar); // guardamos la url del video para mostrarla en componente
        }
        else{  alert(response.data.mensaje); }
    }
    

    return(
    <div>
    {cargando ? <ZonaCargando /> 
    :<div className="container text-center my-5">
            <h1>Curso AWS</h1>
            <p>AWS Fullstack: Node.js + React + Servicios en la Nube</p>
            
            {/* INPUT DE ARCHIVO */}
            <div className="mt-4 mb-4">
                <h2 className='text-start'>Input archivo</h2>
                <input type="file" accept="image/*,video/*" className="form-control w-100 mx-auto" id="formFile" onChange={controlArchivo} />
            </div>



            {/* INPUT DE URL */}
            <h2 className='text-start'>Input URL Video</h2>
            <p className='text-start'>Escribe una url de un video o se llenará sola cuando subas un video.</p>
            <div className="input-group mb-3">
                <span className="input-group-text">URL</span>
                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInputGroup1" placeholder="Username" value={urlVideo} onChange={controlURL} />
                    <label htmlFor="floatingInputGroup1">URL de video</label>
                </div>
            </div>



            {/* ACCIONES */}
            <div className="row justify-content-center mt-5">
                {/* botón subida de archivo */}
                <div className="col-auto">
                    <button onClick={subidaS3} className="btn btn-primary">Subir archivo a s3</button>
                </div>
                {/* botón recortar video con media convert */}
                <div className="col-auto">
                    <button onClick={recortarVideo} className="btn btn-success">Recortar video</button>
                </div>
                <div className="col-auto">
                    <button onClick={edicionCompleta} className="btn btn-danger">Edición completa</button>
                </div>
            </div>


            {/* VIDEO A MOSTRAR */}
            {videoMostrar 
            ? <div className="mt-5">
                <video 
                    src={videoMostrar}
                    controls
                    className="w-100"
                />
            </div> 
            : null}
    </div>
    }
    </div>
    )
}

export default Home;