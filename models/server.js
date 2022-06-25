const express = require('express');
var cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('../database/config');


class Server {

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            buscar:       '/api/buscar',
            categorias: '/api/categorias',
            usuario:    '/api/usuarios',
            producto:   '/api/productos'
        }
       


        //conectar a base de datos
        this.conectarDb();
        //middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
    
    }

    async conectarDb(){

        await dbConnection();
    }

    middlewares(){
    //cors
        this.app.use( cors() );

    //parseo y lectura del body
        this.app.use( express.json() );

    //Directorio publico
        this.app.use( express.static('public') )
    }

    routes(){
        // Aqui uso este  middlewares para configurar mi routas
        // indico mi routa y en el otro argumento que voy a llamar
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.buscar, require('../routes/buscar'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.usuario, require('../routes/usuarios'))
        this.app.use(this.paths.producto, require('../routes/productos'))
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('servidor corriendo en el puerto', + this.port)
        })
    }

}

module.exports = Server;