const { ObjectId } = require('mongoose').Types;
const { Producto, Categoria, Usuario } = require('../models')

const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
]

const buscarUsuarios = async (termino = '', res) => {

    const esMongoID = ObjectId.isValid(termino)

    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }
    const regex = new RegExp(termino, 'i')
    //buscar los usuarios por nombres aca le digo que el nombre sea igual al termino {nombre: termino}

    const usuarios = await Usuario.find({
        // $or: [{nombre: termino, estado: true}, {correo: regex}]
        $or: [{ nombre: termino }, { correo: regex }],
        $and: [{ estado: true }]
    })

    res.json({
        results: usuarios
    })
}
const buscarCategorias = async (termino = '', res) => {

    const esMongoID = ObjectId.isValid(termino)

    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }
    const regex = new RegExp(termino, 'i')
    //buscar los usuarios por nombres aca le digo que el nombre sea igual al termino {nombre: termino}

    const categoria = await Categoria.find({ nombre: regex, estado: true })

    res.json({
        results: categoria
    })
}
const buscarProductos = async (termino = '', res) => {

    const esMongoID = ObjectId.isValid(termino)

    if (esMongoID) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({
            results: (producto) ? [producto] : []
        })
    }
    const regex = new RegExp(termino, 'i')
    //buscar los usuarios por nombres aca le digo que el nombre sea igual al termino {nombre: termino}

    const producto = await Producto.find({ nombre: regex, estado: true }).populate('categoria', 'nombre')

    res.json({
        results: producto
    })
}
const buscar = (req, res) => {

    const { coleccion, termino } = req.params

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }


    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res)
            break;
        case 'categoria':
            buscarCategorias(termino, res)
            break;
        case 'productos':
            buscarProductos(termino, res)
            break;

        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
    }

}


module.exports = {
    buscar
}