
const {Router} = require('express');
const { check } = require('express-validator');



const { validarCampos } = require('../middleware/validar-campos');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ), 
    validarCampos
], usuariosPut);

router.post('/', [
    //no tiene que estar vacio .not().isEmpty()
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos
    ], usuariosPost);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete);



module.exports = router;


