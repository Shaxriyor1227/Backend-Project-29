const { Lang, Customer, Event } = require("../models");
const { validateLang } = require("../validations/lang.validation.js");
const { Op } = require("sequelize");

exports.createLang = async (req, res) => {
    const { error } = validateLang(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Lang.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllLangs = async (req, res) => {
    try {
        const items = await Lang.findAll({
            include: [
                { model: Customer, as: "customers" },
                { model: Event, as: "events" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getLangById = async (req, res) => {
    try {
        const item = await Lang.findByPk(req.params.id, {
            include: [
                { model: Customer, as: "customers" },
                { model: Event, as: "events" }
            ]
        });
        if (!item) return res.status(404).send("Lang not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateLang = async (req, res) => {
    const { error } = validateLang(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Lang.findByPk(req.params.id);
        if (!item) return res.status(404).send("Lang not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteLang = async (req, res) => {
    try {
        const item = await Lang.findByPk(req.params.id);
        if (!item) return res.status(404).send("Lang not found");
        await item.destroy();
        return res.status(200).send("Lang deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchLangs = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await Lang.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
