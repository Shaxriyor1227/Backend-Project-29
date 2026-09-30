const { Ticket, CartItem, Event, Seat, TicketType, TicketStatus } = require("../models");
const { validateTicket } = require("../validations/ticket.validation.js");
const { Op } = require("sequelize");

exports.createTicket = async (req, res) => {
    const { error } = validateTicket(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Ticket.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllTickets = async (req, res) => {
    try {
        const items = await Ticket.findAll({
            include: [
                { model: CartItem, as: "cartItem" },
                { model: Event, as: "event" },
                { model: Seat, as: "seat" },
                { model: TicketType, as: "ticketType" },
                { model: TicketStatus, as: "ticketStatus" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getTicketById = async (req, res) => {
    try {
        const item = await Ticket.findByPk(req.params.id, {
            include: [
                { model: CartItem, as: "cartItem" },
                { model: Event, as: "event" },
                { model: Seat, as: "seat" },
                { model: TicketType, as: "ticketType" },
                { model: TicketStatus, as: "ticketStatus" }
            ]
        });
        if (!item) return res.status(404).send("Ticket not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateTicket = async (req, res) => {
    const { error } = validateTicket(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Ticket.findByPk(req.params.id);
        if (!item) return res.status(404).send("Ticket not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteTicket = async (req, res) => {
    try {
        const item = await Ticket.findByPk(req.params.id);
        if (!item) return res.status(404).send("Ticket not found");
        await item.destroy();
        return res.status(200).send("Ticket deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchTickets = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await Ticket.findAll({
            where: !isNaN(query) ? { event_id: query } : {}});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
