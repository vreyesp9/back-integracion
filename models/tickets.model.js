'use strict'


var mongoose = require("mongoose");
const { stringify } = require("querystring");
var Schema = mongoose.Schema;

var TicketsSchema = Schema({
  id:String,
  titulo:String,
  descripcion:String,
  status:String,
  ejecutivo:String
});

module.exports = mongoose.model("tickets", TicketsSchema);