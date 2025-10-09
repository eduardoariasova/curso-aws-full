import { useEffect, useState } from 'react';
//import axios from 'axios';


function Home() {

    

    return(
    <div>
        <div class="container text-center my-5">
            <h1>Curso AWS</h1>
            <p>AWS Fullstack: Node.js + React + Servicios en la Nube</p>
            
            <div class="mt-4 mb-4">
                <input type="file" accept="video/*" class="form-control w-75 mx-auto" />
            </div>

            <div class="row justify-content-center">
                <div class="col-auto">
                    <button class="btn btn-primary">Acción 1</button>
                </div>
                <div class="col-auto">
                    <button class="btn btn-success">Acción 2</button>
                </div>
                <div class="col-auto">
                    <button class="btn btn-danger">Acción 3</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Home;