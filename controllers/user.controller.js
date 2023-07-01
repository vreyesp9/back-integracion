"use strict";

const { response } = require("express");
const usuarios = require("../models/usuario.model");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/JWT");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const config = require("../config/general");

// Crear usuario

const login = async (req, res) => {
  console.log("req.boody", req.body);
  var rut = req.body.rut;
  const password = req.body.password;
  var dv = "";
  if (!rut) return res.send({ success: false, msg: "El rut es requerido" });
  if (!password)
    return res.send({ success: false, msg: "la contraseña es requerido" });

  rut = rut.replace("-", "");
  rut = rut.replace(/\./g, "");
  dv = rut[rut.length - 1];
  rut = rut.slice(0, -1);

  await console.log(rut, dv, password);

  try {
    const user = await usuarios.findOne({ rut: rut.toString() });
    console.log("usuarios", usuarios);
    await console.log("user", user);
    if (!user)
      return res
        .status(400)
        .json({ success: false, msg: "Usuario o contraseña incorrecto" });
    console.log("1", password.toString());
    console.log("2", user.password.toString());

    if (password.toString() === user.password.toString()) {
      var matchClave = true;
    } else {
      var matchClave = false;
    }

    // const matchClave = await bcrypt.compareSync(password.toString(), user.password.toString());

    await console.log("comparar", matchClave);
    if (!matchClave)
      return res
        .status(401)
        .json({ success: false, msg: "Usuario o contraseña incorrecta" });
    const payload = {
      id: user._id,
      rut: user.rut,
      iat: moment().unix(),
      die: moment().add(24, "hours").unix(),
    };
    const token = jwt.sign(payload, config.jwtSecretKey);
    if (user) {
      return res.status(200).json({
        success: true,
        msg: "Usuario encontrado",
        data: {
          token: token,
          user: user.nombre,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        msg: "Usuario no encontrado",
      });
    }
  } catch (error) {
    console.log("Error en login: ", error);
    return res.send({
      success: false,
      msg: "Ha ocurrido un problema al buscar el usuario, por favor intente más tarde",
    });
  }
};

const setUsuario = async (req, res) => {
  console.log("req.boody", req.body);

  var rut = req.body.rut;
  const password = req.body.password;
  var dv = "";
  if (!rut) return res.send({ success: false, msg: "El rut es requerido" });
  rut = rut.replace("-", "");
  rut = rut.replace(/\./g, "");
  dv = rut[rut.length - 1];
  rut = rut.slice(0, -1);

  await console.log(rut, dv, password);

  try {
    const user = await usuarios.findOne({ rut: rut.toString() });

    // if (user) {
    //   return res
    //     .status(401)
    //     .json({ success: false, msg: "Usuario ya esta registrado" });
    // }
    console.log("valor user ");
    var usu = await new usuarios({
      rut: rut,
      dv: dv,
      nombre: req.body.nombre,
      password: "123456",
      refToken: "123189dh198njd98ashd9",
      active: true,
      email: req.correo,
    });

    await usu.save();

    console.log("valor de usu ", usu);
  } catch (error) {}
};

const revalidarToken = async (req, resp = response) => {
  const { uid, name } = req;
  //Generar un nuevo JWT
  const token = generarJWT(uid, name);

  return resp.json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = {
  revalidarToken,
  login,
  setUsuario,
};
