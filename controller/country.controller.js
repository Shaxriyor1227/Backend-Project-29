const { Country } = require("../models");
const { validateCountry } = require("../validations/country.validation.js");
const { Op } = require("sequelize");

exports.createCountry = async (req, res) => {
    const { error } = validateCountry(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Country.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllCountries = async (req, res) => {
    try {
        const items = await Country.findAll();
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getCountryById = async (req, res) => {
    try {
        const item = await Country.findByPk(req.params.id);
        if (!item) return res.status(404).send("Country not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateCountry = async (req, res) => {
    const { error } = validateCountry(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Country.findByPk(req.params.id);
        if (!item) return res.status(404).send("Country not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteCountry = async (req, res) => {
    try {
        const item = await Country.findByPk(req.params.id);
        if (!item) return res.status(404).send("Country not found");
        await item.destroy();
        return res.status(200).send("Country deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchCountries = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await Country.findAll({
            where: {
                country_name: { [Op.iLike]: `%${query}%` }
            }
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
