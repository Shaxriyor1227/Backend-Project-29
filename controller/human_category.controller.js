const { HumanCategory, Event, Gender } = require("../models");
const { validateHumanCategory } = require("../validations/human_category.validation.js");
const { Op } = require("sequelize");

exports.createHumanCategory = async (req, res) => {
    const { error } = validateHumanCategory(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await HumanCategory.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllHumanCategories = async (req, res) => {
    try {
        const items = await HumanCategory.findAll({
            include: [
                { model: Event, as: "events" },
                { model: Gender, as: "gender" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getHumanCategoryById = async (req, res) => {
    try {
        const item = await HumanCategory.findByPk(req.params.id, {
            include: [
                { model: Event, as: "events" },
                { model: Gender, as: "gender" }
            ]
        });
        if (!item) return res.status(404).send("HumanCategory not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateHumanCategory = async (req, res) => {
    const { error } = validateHumanCategory(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await HumanCategory.findByPk(req.params.id);
        if (!item) return res.status(404).send("HumanCategory not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteHumanCategory = async (req, res) => {
    try {
        const item = await HumanCategory.findByPk(req.params.id);
        if (!item) return res.status(404).send("HumanCategory not found");
        await item.destroy();
        return res.status(200).send("HumanCategory deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchHumanCategories = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await HumanCategory.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
