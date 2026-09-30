const { Discount, Booking } = require("../models");
const { validateDiscount } = require("../validations/discount.validation.js");
const { Op } = require("sequelize");

exports.createDiscount = async (req, res) => {
    const { error } = validateDiscount(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Discount.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllDiscounts = async (req, res) => {
    try {
        const items = await Discount.findAll({
            include: [
                { model: Booking, as: "bookings" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getDiscountById = async (req, res) => {
    try {
        const item = await Discount.findByPk(req.params.id, {
            include: [
                { model: Booking, as: "bookings" }
            ]
        });
        if (!item) return res.status(404).send("Discount not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateDiscount = async (req, res) => {
    const { error } = validateDiscount(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Discount.findByPk(req.params.id);
        if (!item) return res.status(404).send("Discount not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteDiscount = async (req, res) => {
    try {
        const item = await Discount.findByPk(req.params.id);
        if (!item) return res.status(404).send("Discount not found");
        await item.destroy();
        return res.status(200).send("Discount deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchDiscounts = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await Discount.findAll({
            where: {
                discount: { [Op.iLike]: `%${query}%` }
            }});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
