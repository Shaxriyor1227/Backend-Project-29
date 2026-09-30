const { DeliveryMethod, Booking } = require("../models");
const { validateDeliveryMethod } = require("../validations/delivery_method.validation.js");
const { Op } = require("sequelize");

exports.createDeliveryMethod = async (req, res) => {
    const { error } = validateDeliveryMethod(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await DeliveryMethod.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllDeliveryMethod = async (req, res) => {
    try {
        const items = await DeliveryMethod.findAll({
            include: [
                { model: Booking, as: "bookings" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getDeliveryMethodById = async (req, res) => {
    try {
        const item = await DeliveryMethod.findByPk(req.params.id, {
            include: [
                { model: Booking, as: "bookings" }
            ]
        });
        if (!item) return res.status(404).send("DeliveryMethod not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateDeliveryMethod = async (req, res) => {
    const { error } = validateDeliveryMethod(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await DeliveryMethod.findByPk(req.params.id);
        if (!item) return res.status(404).send("DeliveryMethod not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteDeliveryMethod = async (req, res) => {
    try {
        const item = await DeliveryMethod.findByPk(req.params.id);
        if (!item) return res.status(404).send("DeliveryMethod not found");
        await item.destroy();
        return res.status(200).send("DeliveryMethod deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchDeliveryMethod = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await DeliveryMethod.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
