const { Region, District, Venue, CustomerAddress } = require("../models");
const { validateRegion } = require("../validations/region.validation.js");
const { Op } = require("sequelize");

exports.createRegion = async (req, res) => {
    const { error } = validateRegion(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Region.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllRegions = async (req, res) => {
    try {
        const items = await Region.findAll({
            include: [
                { model: District, as: "districts" },
                { model: Venue, as: "venues" },
                { model: CustomerAddress, as: "customerAddresses" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getRegionById = async (req, res) => {
    try {
        const item = await Region.findByPk(req.params.id, {
            include: [
                { model: District, as: "districts" },
                { model: Venue, as: "venues" },
                { model: CustomerAddress, as: "customerAddresses" }
            ]
        });
        if (!item) return res.status(404).send("Region not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateRegion = async (req, res) => {
    const { error } = validateRegion(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Region.findByPk(req.params.id);
        if (!item) return res.status(404).send("Region not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteRegion = async (req, res) => {
    try {
        const item = await Region.findByPk(req.params.id);
        if (!item) return res.status(404).send("Region not found");
        await item.destroy();
        return res.status(200).send("Region deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchRegions = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await Region.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
