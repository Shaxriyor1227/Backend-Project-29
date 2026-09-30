const { Flat, CustomerAddress } = require("../models");
const { validateFlat } = require("../validations/flat.validation.js");
const { Op } = require("sequelize");

exports.createFlat = async (req, res) => {
    const { error } = validateFlat(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Flat.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllFlats = async (req, res) => {
    try {
        const items = await Flat.findAll({
            include: [
                { model: CustomerAddress, as: "customerAddresses" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getFlatById = async (req, res) => {
    try {
        const item = await Flat.findByPk(req.params.id, {
            include: [
                { model: CustomerAddress, as: "customerAddresses" }
            ]
        });
        if (!item) return res.status(404).send("Flat not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateFlat = async (req, res) => {
    const { error } = validateFlat(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Flat.findByPk(req.params.id);
        if (!item) return res.status(404).send("Flat not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteFlat = async (req, res) => {
    try {
        const item = await Flat.findByPk(req.params.id);
        if (!item) return res.status(404).send("Flat not found");
        await item.destroy();
        return res.status(200).send("Flat deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchFlats = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await Flat.findAll({
            where: {
                condition: { [Op.iLike]: `%${query}%` }
            }});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
