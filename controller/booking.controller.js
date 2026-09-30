const { Booking, Cart, PaymentMethod, DeliveryMethod, Discount } = require("../models");
const { validateBooking } = require("../validations/booking.validation.js");
const { Op } = require("sequelize");

exports.createBooking = async (req, res) => {
    const { error } = validateBooking(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Booking.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const items = await Booking.findAll({
            include: [
                { model: Cart, as: "cart" },
                { model: PaymentMethod, as: "paymentMethod" },
                { model: DeliveryMethod, as: "deliveryMethod" },
                { model: Discount, as: "discount" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const item = await Booking.findByPk(req.params.id, {
            include: [
                { model: Cart, as: "cart" },
                { model: PaymentMethod, as: "paymentMethod" },
                { model: DeliveryMethod, as: "deliveryMethod" },
                { model: Discount, as: "discount" }
            ]
        });
        if (!item) return res.status(404).send("Booking not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateBooking = async (req, res) => {
    const { error } = validateBooking(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Booking.findByPk(req.params.id);
        if (!item) return res.status(404).send("Booking not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const item = await Booking.findByPk(req.params.id);
        if (!item) return res.status(404).send("Booking not found");
        await item.destroy();
        return res.status(200).send("Booking deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchBookings = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await Booking.findAll({
            where: !isNaN(query) ? { cart_id: query } : {}});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
