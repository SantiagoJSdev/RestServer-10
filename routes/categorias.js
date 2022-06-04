
const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const { esAdminRole } = require('../middleware/validar-role');


const router = Router();

//obtener todas las categorias - publico
router.get('/', obtenerCategorias, (req, res) => {
    res.json('get')
})

//obtener todas las categorias por id - publico
router.get('/:id', [

    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
], obtenerCategoria)

//crear categorias - privado - cuaquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not(). isEmpty(),
    validarCampos
], crearCategoria)

//actualizar privado - cualquie con token valido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
],actualizarCategoria );

//borrar  categorias - publico
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
],borrarCategoria);


module.exports = router;