const { Event, Ticket, Venue, Lang, EventType, HumanCategory } = require("../models");
const { validateEvent } = require("../validations/event.validation.js");
const { Op } = require("sequelize");

exports.createEvent = async (req, res) => {
    const { error } = validateEvent(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Event.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const items = await Event.findAll({
            include: [
                { model: Ticket, as: "tickets" },
                { model: Venue, as: "venue" },
                { model: Lang, as: "language" },
                { model: EventType, as: "eventType" },
                { model: HumanCategory, as: "humanCategory" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getEventById = async (req, res) => {
    try {
        const item = await Event.findByPk(req.params.id, {
            include: [
                { model: Ticket, as: "tickets" },
                { model: Venue, as: "venue" },
                { model: Lang, as: "language" },
                { model: EventType, as: "eventType" },
                { model: HumanCategory, as: "humanCategory" }
            ]
        });
        if (!item) return res.status(404).send("Event not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateEvent = async (req, res) => {
    const { error } = validateEvent(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Event.findByPk(req.params.id);
        if (!item) return res.status(404).send("Event not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const item = await Event.findByPk(req.params.id);
        if (!item) return res.status(404).send("Event not found");
        await item.destroy();
        return res.status(200).send("Event deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchEvents = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await Event.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
