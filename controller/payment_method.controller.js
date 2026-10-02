const { PaymentMethod, Booking } = require("../models");
const { validatePaymentMethod } = require("../validations/payment_method.validation.js");
const { Op } = require("sequelize");

exports.createPaymentMethod = async (req, res) => {
    const { error } = validatePaymentMethod(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await PaymentMethod.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllPaymentMethods = async (req, res) => {
    try {
        const items = await PaymentMethod.findAll({
            include: [
                { model: Booking, as: "bookings" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getPaymentMethodById = async (req, res) => {
    try {
        const item = await PaymentMethod.findByPk(req.params.id, {
            include: [
                { model: Booking, as: "bookings" }
            ]
        });
        if (!item) return res.status(404).send("PaymentMethod not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updatePaymentMethod = async (req, res) => {
    const { error } = validatePaymentMethod(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await PaymentMethod.findByPk(req.params.id);
        if (!item) return res.status(404).send("PaymentMethod not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deletePaymentMethod = async (req, res) => {
    try {
        const item = await PaymentMethod.findByPk(req.params.id);
        if (!item) return res.status(404).send("PaymentMethod not found");
        await item.destroy();
        return res.status(200).send("PaymentMethod deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchPaymentMethods = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await PaymentMethod.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
