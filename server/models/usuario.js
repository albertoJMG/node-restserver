//Este .js es como si configuramos la tabla USUARIO
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');


let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

let Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//este el como el toString. Lo hacemos asi porque cuando lo quedamos "imprimir" no muestre el campo password
usuarioSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

//Necesario para los campos unique
usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} debe de ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);