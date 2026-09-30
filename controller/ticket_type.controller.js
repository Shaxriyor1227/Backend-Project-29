const { TicketType, Ticket } = require("../models");
const { validateTicketType } = require("../validations/ticket_type.validation.js");
const { Op } = require("sequelize");

exports.createTicketType = async (req, res) => {
    const { error } = validateTicketType(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await TicketType.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllTicketTypes = async (req, res) => {
    try {
        const items = await TicketType.findAll({
            include: [
                { model: Ticket, as: "tickets" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getTicketTypeById = async (req, res) => {
    try {
        const item = await TicketType.findByPk(req.params.id, {
            include: [
                { model: Ticket, as: "tickets" }
            ]
        });
        if (!item) return res.status(404).send("TicketType not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateTicketType = async (req, res) => {
    const { error } = validateTicketType(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await TicketType.findByPk(req.params.id);
        if (!item) return res.status(404).send("TicketType not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteTicketType = async (req, res) => {
    try {
        const item = await TicketType.findByPk(req.params.id);
        if (!item) return res.status(404).send("TicketType not found");
        await item.destroy();
        return res.status(200).send("TicketType deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchTicketTypes = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await TicketType.findAll({
            where: {
                ticket_type: { [Op.iLike]: `%${query}%` }
            }});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
