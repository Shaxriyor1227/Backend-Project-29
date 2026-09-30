const { Seat, Venue, Ticket, Sector, SeatType } = require("../models");
const { validateSeat } = require("../validations/seat.validation.js");
const { Op } = require("sequelize");

exports.createSeat = async (req, res) => {
    const { error } = validateSeat(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Seat.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllSeats = async (req, res) => {
    try {
        const items = await Seat.findAll({
            include: [
                { model: Venue, as: "venue" },
                { model: Ticket, as: "tickets" },
                { model: Sector, as: "sector" },
                { model: SeatType, as: "seatType" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getSeatById = async (req, res) => {
    try {
        const item = await Seat.findByPk(req.params.id, {
            include: [
                { model: Venue, as: "venue" },
                { model: Ticket, as: "tickets" },
                { model: Sector, as: "sector" },
                { model: SeatType, as: "seatType" }
            ]
        });
        if (!item) return res.status(404).send("Seat not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateSeat = async (req, res) => {
    const { error } = validateSeat(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Seat.findByPk(req.params.id);
        if (!item) return res.status(404).send("Seat not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteSeat = async (req, res) => {
    try {
        const item = await Seat.findByPk(req.params.id);
        if (!item) return res.status(404).send("Seat not found");
        await item.destroy();
        return res.status(200).send("Seat deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchSeats = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await Seat.findAll({
            where: {
                location_in_schema: { [Op.iLike]: `%${query}%` }
            }});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
