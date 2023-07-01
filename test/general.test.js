const { request } = require('express')
const app = require('../index')
const server = require('../controllers/transferencias.controller')
const TipoCuentas = require("../models/transferencia.model")

var cuenta = [{
    nombreTipo: "hola",
    idTipo: 232
}];
const { createRequest, createResponse } = require("node-mocks-http");
describe('Get Api List', () => {
    let req;

    let res;
    beforeEach(() => {

        req = createRequest();

        res = createResponse();

        jest.resetModules();

    });
    test("return Tipo Cuentas", async () => {
        jest.doMock('../models/transferencia.model', () => {
            return {
                cuenta
            };
        });
        const result = await server.getTipoCuenta(req, res);
        expect(result.statusCode).toEqual(200);
    });


})