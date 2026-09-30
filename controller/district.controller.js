const { District, Region, Venue, CustomerAddress } = require("../models");
const { validateDistrict } = require("../validations/district.validation.js");
const { Op } = require("sequelize");

exports.createDistrict = async (req, res) => {
    const { error } = validateDistrict(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await District.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllDistricts = async (req, res) => {
    try {
        const items = await District.findAll({
            include: [
                { model: Region, as: "region" },
                { model: Venue, as: "venues" },
                { model: CustomerAddress, as: "customerAddresses" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getDistrictById = async (req, res) => {
    try {
        const item = await District.findByPk(req.params.id, {
            include: [
                { model: Region, as: "region" },
                { model: Venue, as: "venues" },
                { model: CustomerAddress, as: "customerAddresses" }
            ]
        });
        if (!item) return res.status(404).send("District not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateDistrict = async (req, res) => {
    const { error } = validateDistrict(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await District.findByPk(req.params.id);
        if (!item) return res.status(404).send("District not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteDistrict = async (req, res) => {
    try {
        const item = await District.findByPk(req.params.id);
        if (!item) return res.status(404).send("District not found");
        await item.destroy();
        return res.status(200).send("District deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchDistricts = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await District.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
