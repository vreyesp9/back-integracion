"use strict";
const config = require("../config/general");
const port = config.port;
const mongoose = require("mongoose");
const https = require("https");
const fs = require("fs");
var express = require("express");
var app = require("../index");
var user = encodeURIComponent(config.mongoUser);
var p = encodeURIComponent(config.mongoP);
var mongoURL = `mongodb+srv://admin:mandarina@clusterequifax.5bbmo.mongodb.net/equifax`;
const options = {
  useUnifiedTopology: true,
};
var server ;
mongoose.Promise = global.Promise;
mongoose
  .connect(mongoURL, { useNewUrlParser: true })
  .then(() => {
    console.log("Conexión con MongoDB establecida");
    if (config.local) {
      app.listen(port, () => {
        console.log("Servidor Node está corriendo en el puerto local: " + port);
      });
    } else {
      server = https
        .createServer(
          {
            key: fs.readFileSync("/root/back-integracion/ssl/ruta.key"),
            cert: fs.readFileSync("/root/back-integracion/ssl/ruta.crt"),
            requestCert: false,
            rejectUnauthorized: false,
          },
          app
        )
        .listen(port, () => {
          console.log(
            `Servidor Node está corriendo en el puerto xxxx SSL` + port
          );
        });
    }
  })
  .catch((err) => console.log(err));
