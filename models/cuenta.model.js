'use strict'


var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CuentasSchema = Schema({
    banco: String,
    tipoCuenta: String,
    nombre: String,
    monto: Number,
    rut: String,
    dv: String
});

module.exports = mongoose.model("Cuenta", CuentasSchema);