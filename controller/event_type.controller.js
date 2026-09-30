const { EventType, Event } = require("../models");
const { validateEventType } = require("../validations/event_type.validation.js");
const { Op } = require("sequelize");

exports.createEventType = async (req, res) => {
    const { error } = validateEventType(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await EventType.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllEventTypes = async (req, res) => {
    try {
        const items = await EventType.findAll({
            include: [
                { model: Event, as: "events" },
                { model: EventType, as: "subEventTypes" },
                { model: EventType, as: "parentEventType" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getEventTypeById = async (req, res) => {
    try {
        const item = await EventType.findByPk(req.params.id, {
            include: [
                { model: Event, as: "events" },
                { model: EventType, as: "subEventTypes" },
                { model: EventType, as: "parentEventType" }
            ]
        });
        if (!item) return res.status(404).send("EventType not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateEventType = async (req, res) => {
    const { error } = validateEventType(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await EventType.findByPk(req.params.id);
        if (!item) return res.status(404).send("EventType not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteEventType = async (req, res) => {
    try {
        const item = await EventType.findByPk(req.params.id);
        if (!item) return res.status(404).send("EventType not found");
        await item.destroy();
        return res.status(200).send("EventType deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchEventTypes = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await EventType.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
