'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TipoCuentasSchema = Schema({
    nombreTipo: String,
    idTipo: Number,
});

module.exports = mongoose.model("TipoCuenta", TipoCuentasSchema);