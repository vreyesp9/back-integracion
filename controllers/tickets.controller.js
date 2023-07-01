'use strict'


const { generarJWT } = require('../helpers/JWT');
const moment = require('moment')
const config = require('../config/general');

const User = require("../models/usuario.model")

const Tickets = require("../models/tickets.model");
const { jwtSecretKey } = require('../config/general');



const getTickets = async (req, res) => {
    try {
        var tickets = await Tickets.find({});
        if (!tickets) return res.status(400).json({
            success: false,
            msg: 'No exiten tickets.',
        })

        return res.status(200).json({
            success: true,
            data: tickets,
            msg: 'Tickets Encontrados.',
        })


    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Ha ocurrido un problema al buscar tickets.',
        })
    }
}

const deleteTickets = async (req, res) => {

    try {
        var tickets = await Tickets.deleteOne(req.id)

        if (!tickets) return res.status(400).json({
            success: false,
            msg: 'Error al eliminar Ticket',
        })

        return res.status(200).json({
            success: true,
            msg: 'Ticket eliminado correctamente.',
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Ha ocurrido un problema al eliminar el ticket',
        })
    }
}


const updateTickets = async (req, res) => {
    try {
        var tickets = await Tickets.updateOne({ _id: req.body._id }, {
            id: req.body.id,
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            status: req.body.status,
            ejecutivo: req.body.ejecutivo
        });

        if (!tickets) return res.status(400).json({
            success: false,
            msg: 'Error al actualizar Ticket',
        })

        return res.status(200).json({
            success: true,
            msg: 'Ticket actualizado correctamente.',
        })


    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Error al actualizar Ticket',
        })
    }
}






const addTickets = async (req, res) => {
    try {

        var ticket = await new Tickets({

            id: Math.floor(Math.random() * 1000000000),
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            status: req.body.status,
            ejecutivo: req.body.nombre
        })


        await ticket.save();

        if (!ticket) return res.status(400).json({
            success: false,
            msg: 'Error al crear Ticket',
        })

        return res.status(200).json({
            success: true,
            msg: 'Ticket creado correctamente.',
        })




    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Error al crear Ticket',
        })
    }
}


module.exports = {
    getTickets,
    updateTickets,
    deleteTickets,
    addTickets
}