const Role = require('../models/role')
const {Usuario, Categoria, Producto} = require('../models')

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado`)
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo })
    if ( existeEmail ) {
        throw new Error(`El correo: ${correo} ya esta registrado`)
    }
}


const existeUsuarioPorId = async( id ) => {

    // Verificar si el ID existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existeCategoriaPorId = async( id ) => {

    // Verificar si el correo existe
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existeProductoPorId = async( id ) => {

    // Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id no existe ${ id }`);
    }
}


module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}