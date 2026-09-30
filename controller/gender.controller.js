const { Gender, Customer, HumanCategory } = require("../models");
const { validateGender } = require("../validations/gender.validation.js");
const { Op } = require("sequelize");

exports.createGender = async (req, res) => {
    const { error } = validateGender(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Gender.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllGenders = async (req, res) => {
    try {
        const items = await Gender.findAll({
            include: [
                { model: Customer, as: "customers" },
                { model: HumanCategory, as: "humanCategories" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getGenderById = async (req, res) => {
    try {
        const item = await Gender.findByPk(req.params.id, {
            include: [
                { model: Customer, as: "customers" },
                { model: HumanCategory, as: "humanCategories" }
            ]
        });
        if (!item) return res.status(404).send("Gender not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateGender = async (req, res) => {
    const { error } = validateGender(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Gender.findByPk(req.params.id);
        if (!item) return res.status(404).send("Gender not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteGender = async (req, res) => {
    try {
        const item = await Gender.findByPk(req.params.id);
        if (!item) return res.status(404).send("Gender not found");
        await item.destroy();
        return res.status(200).send("Gender deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchGenders = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await Gender.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
