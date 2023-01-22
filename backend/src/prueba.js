//importaciones
const express = require("express");
const Sequelize = require("./config/db");
const path = require("path");
const cors = require("cors");
require("./models/associations");
const cosas = require("./productos")
const producto = require("../src/models/producto")(Sequelize);
//configurando el puerto
const {PORT} = require("./config/config");

const app = express();

//middlewares
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());


 
 
// verificacion de conexion con la tabla
Sequelize.authenticate()//
    .then(() =>{
        console.log("conectado")
    })
    .catch(error =>{
        console.log("el error fue: " + error)
    })



//--------------------------------------------------base de datos -----------------------------------//
 
app.use("/posts", require("./routes/post"))


// middleware para usar el contenido de la carpeta "imagenes"
app.use(express.static(path.join(__dirname,"imagenes"))) 

//endpoints acerca de
app.use("/acercaDe", require("./routes/acercaDe"))
//endpoints productos
app.use("/products", require("./routes/productos"))
//endpoints carrito
app.use("/cart", require("./routes/compras"))
//endpoints admin
app.use("/admin", require("./routes/admin"))


//producto.bulkCreate(cosas).then(() =>{ console.log("insertado con exito")})
app.listen(PORT, () =>{
    console.log(`proceso iniciado en puerto ${PORT}`);

    //sincornizando las tablas con la base de datos
    Sequelize.sync()
    .then(() => { console.log("probando")})
    .catch(error => console.error('Error sincronizando las tablas', error));

});

 //---------------------------------------------inicio del server--------------------------------------------
