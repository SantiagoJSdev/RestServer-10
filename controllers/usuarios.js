
const {response, request} = require('express');
const Usuario = require('../models/usuario');
 
const bcryptjs = require('bcryptjs');




const usuariosGet = async(req = request, res = response) => {

  const { limit = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [ total, usuarios ] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
          .skip( Number( desde ) )
          .limit(Number( limit ))
  ]);

  res.json({
      total,
      usuarios
  });
}

  const usuariosPost = async (req, res) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync(11);
    usuario.password = bcryptjs.hashSync( password, salt )
    //guardar db
    await usuario.save();

    res.json({
        usuario,

    })
  }

  const usuariosPut = async (req, res) => {

    const {id} = req.params;
    const { _id, password, google, correo, ...resto} = req.body;

    //todo validar contra base de datos
    if (password) {
      const salt = bcryptjs.genSaltSync(11);
      resto.password = bcryptjs.hashSync( password, salt )
    }

      const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    })
  }

  const usuariosDelete = async (req, res) => {

    const {id} = req.params;
        // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json({
        msg: 'delete Api - controllers',
        usuario
    })
  }
  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
  }