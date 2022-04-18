
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { response } = require('express');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req, res) => {

    const {correo, password} = req.body;

    try {

        //verificar si el email.existe
        const usuario = await Usuario.findOne({correo})

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - email'
            })
        }

        //verificar si el usuario esta activo

        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        //verificar la contraseña

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        //generar jwt

        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
            
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el admin'
        })
    }
    
}

const googleSingnIn = async(req, res =response) => {

    const {id_token} = req.body;

    try {
        const  {nombre, img, correo} = await googleVerify(id_token);
        
        let usuario = await Usuario.findOne({correo});

        if (!usuario ) {
            const data = {
                nombre,
                correo,
                password: '123',
                img,
                google:true,
                rol: "USER_ROLE",

            }
            usuario = new Usuario(data);
            await usuario.save();
        }
        //si el user en db esta en false borrado
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el admin, usuario bloqueado'
            })
        }
        //generara el jwk
        const token = await generarJWT(usuario.id)
        
        res.json({
           usuario,
           token
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg: 'El token no se pudo verificar'
        })
        
    }

   
}
module.exports = {
    
    login,
    googleSingnIn

}