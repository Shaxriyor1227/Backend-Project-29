const { VenueTypes, Venue, Types } = require("../models");
const { validateVenueTypes } = require("../validations/venue_types.validation.js");
const { Op } = require("sequelize");

exports.createVenueTypes = async (req, res) => {
    const { error } = validateVenueTypes(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const existingVenueTypes = await VenueTypes.findOne({
            where: { venueId: req.body.venueId, typeId: req.body.typeId }
        });
        if (existingVenueTypes) return res.status(400).send("VenueTypes already exists");

        const item = await VenueTypes.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllVenueTypes = async (req, res) => {
    try {
        const items = await VenueTypes.findAll({
            include: [
                { model: Venue, as: "venue" },
                { model: Types, as: "type" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getVenueTypesById = async (req, res) => {
    try {
        const item = await VenueTypes.findByPk(req.params.id, {
            include: [
                { model: Venue, as: "venue" },
                { model: Types, as: "type" }
            ]
        });
        if (!item) return res.status(404).send("VenueTypes not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateVenueTypes = async (req, res) => {
    const { error } = validateVenueTypes(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await VenueTypes.findByPk(req.params.id);
        if (!item) return res.status(404).send("VenueTypes not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteVenueTypes = async (req, res) => {
    try {
        const item = await VenueTypes.findByPk(req.params.id);
        if (!item) return res.status(404).send("VenueTypes not found");
        await item.destroy();
        return res.status(200).send("VenueTypes deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchVenueTypes = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await VenueTypes.findAll({
            where: !isNaN(query) ? {
                [Op.or]: [{ venueId: query }, { typeId: query }]
            } : {}});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
