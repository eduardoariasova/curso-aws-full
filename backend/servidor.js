// paquetes
const path = require("path");
const express = require('express');
const bodyParser = require("body-parser");

// CONFIGURACIÓN DE EXPRESS
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));


// IMPORTAR RUTAS
app.use(require('./routes/rutasAWS'));


app.use(express.static(path.resolve('frontend/build')));
app.get('*', (req, res) => { res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));  });


// LISTEN 
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("servidor escuchando en: ", PORT);
});


