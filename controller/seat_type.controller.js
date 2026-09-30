const { SeatType, Seat } = require("../models");
const { validateSeatType } = require("../validations/seat_type.validation.js");
const { Op } = require("sequelize");

exports.createSeatType = async (req, res) => {
    const { error } = validateSeatType(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await SeatType.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllSeatTypes = async (req, res) => {
    try {
        const items = await SeatType.findAll({
            include: [
                { model: Seat, as: "seats" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getSeatTypeById = async (req, res) => {
    try {
        const item = await SeatType.findByPk(req.params.id, {
            include: [
                { model: Seat, as: "seats" }
            ]
        });
        if (!item) return res.status(404).send("SeatType not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateSeatType = async (req, res) => {
    const { error } = validateSeatType(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await SeatType.findByPk(req.params.id);
        if (!item) return res.status(404).send("SeatType not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteSeatType = async (req, res) => {
    try {
        const item = await SeatType.findByPk(req.params.id);
        if (!item) return res.status(404).send("SeatType not found");
        await item.destroy();
        return res.status(200).send("SeatType deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchSeatTypes = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await SeatType.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
