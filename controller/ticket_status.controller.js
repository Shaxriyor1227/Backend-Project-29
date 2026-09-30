const { TicketStatus, Ticket } = require("../models");
const { validateTicketStatus } = require("../validations/ticket_status.validation.js");
const { Op } = require("sequelize");

exports.createTicketStatus = async (req, res) => {
    const { error } = validateTicketStatus(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await TicketStatus.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllTicketStatuses = async (req, res) => {
    try {
        const items = await TicketStatus.findAll({
            include: [
                { model: Ticket, as: "tickets" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getTicketStatusById = async (req, res) => {
    try {
        const item = await TicketStatus.findByPk(req.params.id, {
            include: [
                { model: Ticket, as: "tickets" }
            ]
        });
        if (!item) return res.status(404).send("TicketStatus not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateTicketStatus = async (req, res) => {
    const { error } = validateTicketStatus(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await TicketStatus.findByPk(req.params.id);
        if (!item) return res.status(404).send("TicketStatus not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteTicketStatus = async (req, res) => {
    try {
        const item = await TicketStatus.findByPk(req.params.id);
        if (!item) return res.status(404).send("TicketStatus not found");
        await item.destroy();
        return res.status(200).send("TicketStatus deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchTicketStatuses = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await TicketStatus.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
