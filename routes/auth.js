const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSingnIn } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');


const router = Router();

router.post('/login', [
check('correo', 'El correo es obligatorio').isEmail(),
check('password', 'La contraseña es obligatorio').not().isEmpty(),
validarCampos

], login );

router.post('/google', [
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validarCampos
    
    ], googleSingnIn );

module.exports = router;