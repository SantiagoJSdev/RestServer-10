
const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatoria']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatoria'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: false
    },
    google: {
        type: Boolean,
        default: false
    }
    
})

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario} = this.toObject();
    return usuario;
}


module.exports = model('Usuario', UsuarioSchema) 