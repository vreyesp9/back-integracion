'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TransferenciaSchema = Schema({
    rutEmisor: String,
    dvEmisor: String,
    bancoEmisor: String,
    monto: Number,
    tipoCuentaEmisor: String,
    fechaTransaccion: String,
    nombreReceptor: String,
    rutReceptor: String,
    dvReceptor: String,
    correoReceptor: String,
    idTransac: String,
    bancoReceptor: String,
    tipoCuentaReceptor: String,
});

module.exports = mongoose.model("Transferencia", TransferenciaSchema);