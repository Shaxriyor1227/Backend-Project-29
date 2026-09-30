const { Types, VenueTypes } = require("../models");
const { validateTypes } = require("../validations/types.validation.js");
const { Op } = require("sequelize");

exports.createTypes = async (req, res) => {
    const { error } = validateTypes(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Types.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllTypes = async (req, res) => {
    try {
        const items = await Types.findAll({
            include: [
                { model: VenueTypes, as: "venueTypes" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getTypesById = async (req, res) => {
    try {
        const item = await Types.findByPk(req.params.id, {
            include: [
                { model: VenueTypes, as: "venueTypes" }
            ]
        });
        if (!item) return res.status(404).send("Types not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateTypes = async (req, res) => {
    const { error } = validateTypes(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Types.findByPk(req.params.id);
        if (!item) return res.status(404).send("Types not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteTypes = async (req, res) => {
    try {
        const item = await Types.findByPk(req.params.id);
        if (!item) return res.status(404).send("Types not found");
        await item.destroy();
        return res.status(200).send("Types deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchTypes = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await Types.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
