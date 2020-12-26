const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const Usuario = require('../models/usuario')
const app = express()

app.get('/usuario', function (req, res) {

    let desde = req.query.desde || 0;   //De esta forma recogemos los parametros opcionales de la petición
    desde = Number(desde);              //Pasamos a numero, ya que el parametro es un String

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ /*google: true*/ estado: true }, 'nombre email role estado google img')      //Dentro de las llaves del find podiamos poner condicones a cumplir para realizar la busqueda. Con el String seleccionamos que atributos se mostraran en la respuesta 
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {             //usuarios es un array con los "Usuarios" de la base de datos
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ /*google: true*/ estado: true }, (err, conteo) => {      //Si el find tiene condiciones en este caso el count tambien deberia tener las mismas condiciones
                res.json({
                    ok: true,
                    usuarios: usuarios,
                    cuantos: conteo
                })
            });

        })

})

app.post('/usuario', function (req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }



        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

})

app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    //Underscore, para evitar que ciertos elementos de un objeto se puedan actualizar
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);


    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {   //new: true => para que la respuesta sea actualizada

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

})

app.delete('/usuario/:id', function (req, res) {

    let id = req.params.id;

    // Eliminacion "fisica"
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     };

    //     if (!usuarioBorrado) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'Usuario no encontrado'
    //             }
    //         });
    //     }

    //     res.json({
    //         ok: true,
    //         usuario: usuarioBorrado
    //     })
    // })

    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })


})

module.exports = app;