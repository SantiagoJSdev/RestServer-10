
const {response, request} = require('express')


const usuariosGet = (req = request, res = response) => {

    const {q, nombre, apikey, page = 1, limit} = req.query;

    res.json({
        msg: 'get Api - controllers',
        q,
        nombre,
        apikey,
        page,
        limit
    })
  }

  const usuariosPost = (req, res) => {

    const body = req.body;

    res.status(201).json({
        msg: 'post Api - controllers',
        body

    })
  }

  const usuariosPut = (req, res) => {

    const {id} = req.params;

    res.json({
        msg: 'put Api - controllers',
        id
    })
  }

  const usuariosDelete =  (req, res) => {

    res.json({
        msg: 'delete Api - controllers'
    })
  }
  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
  }