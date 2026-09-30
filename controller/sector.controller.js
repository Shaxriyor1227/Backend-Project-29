const { Sector, Seat } = require("../models");
const { validateSector } = require("../validations/sector.validation.js");
const { Op } = require("sequelize");

exports.createSector = async (req, res) => {
    const { error } = validateSector(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Sector.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllSectors = async (req, res) => {
    try {
        const items = await Sector.findAll({
            include: [
                { model: Seat, as: "seats" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getSectorById = async (req, res) => {
    try {
        const item = await Sector.findByPk(req.params.id, {
            include: [
                { model: Seat, as: "seats" }
            ]
        });
        if (!item) return res.status(404).send("Sector not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateSector = async (req, res) => {
    const { error } = validateSector(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Sector.findByPk(req.params.id);
        if (!item) return res.status(404).send("Sector not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteSector = async (req, res) => {
    try {
        const item = await Sector.findByPk(req.params.id);
        if (!item) return res.status(404).send("Sector not found");
        await item.destroy();
        return res.status(200).send("Sector deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchSectors = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await Sector.findAll({
            where: {
                sector_name: { [Op.iLike]: `%${query}%` }
            }});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
