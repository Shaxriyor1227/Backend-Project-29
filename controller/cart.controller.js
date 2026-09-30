const { Cart, Customer, CartItem, Booking } = require("../models");
const { validateCart } = require("../validations/cart.validation.js");
const { Op } = require("sequelize");

exports.createCart = async (req, res) => {
    const { error } = validateCart(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Cart.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllCarts = async (req, res) => {
    try {
        const items = await Cart.findAll({
            include: [
                { model: Customer, as: "customer" },
                { model: CartItem, as: "carts_item" },
                { model: Booking, as: "bookings" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getCartById = async (req, res) => {
    try {
        const item = await Cart.findByPk(req.params.id, {
            include: [
                { model: Customer, as: "customer" },
                { model: CartItem, as: "carts_item" },
                { model: Booking, as: "bookings" }
            ]
        });
        if (!item) return res.status(404).send("Cart not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateCart = async (req, res) => {
    const { error } = validateCart(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Cart.findByPk(req.params.id);
        if (!item) return res.status(404).send("Cart not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteCart = async (req, res) => {
    try {
        const item = await Cart.findByPk(req.params.id);
        if (!item) return res.status(404).send("Cart not found");
        await item.destroy();
        return res.status(200).send("Cart deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchCarts = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await Cart.findAll({
            where: !isNaN(query) ? { customer_id: query } : {}});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
