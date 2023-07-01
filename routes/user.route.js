'use strict'

const { check } = require('express-validator');
const userController = require('../controllers/user.controller');
var express = require('express');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')
var api = express.Router();

// Login de usuario
api.post('/login', userController.login);
api.post("/setUsuario", userController.setUsuario);


module.exports = api;
