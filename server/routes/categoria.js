const express = require('express');
let { verificaToken, verificaAdminRole } = require('../middlewares/autentication');
let app = express();
let Categoria = require('../models/categoria');

// ==========================
// Mostrar todas las categorias
// ==========================

app.get('/categoria', (req, res) => {

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err
                });
            };

            res.json({
                ok: true,
                categorias
            })
        })

});

// ==========================
// Mostrar una categoria por ID
// ==========================

app.get('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    //Categoria.findById(id, (err, categoriaDB) => {
    //Categoria.findOne({ _id: id })                      //Para obtener datos del usuario en la respuesta
    Categoria.findById(id)
        .populate('usuario', 'nombre email')
        .exec((err, categoriaDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err
                });
            };

            if (!categoriaDB) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'ID no encontrado'
                    }
                });
            };

            res.json({
                ok: true,
                categoria: categoriaDB
            })

        })
});

// ==========================
// Crear nueva categorias
// ==========================

app.post('/categoria', verificaToken, (req, res) => {
    //regresa la nueva cayegoria
    //req.usuario._id

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id //Sin verificaToken esto no funciona
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        };



        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    })

});

// ==========================
// Actualizar una categoria
// ==========================

app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        };

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
});

// ==========================
// Borrar categorias
// ==========================

app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {
    //solo un administrador puede borrar categorias

    let id = req.params.id
    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        };

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        };

        res.json({
            ok: true,
            message: 'Categoria borrada'
        })
    })
});



module.exports = app;