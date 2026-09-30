const { CartItem, Cart, Ticket } = require("../models");
const { validateCartItem } = require("../validations/cart_item.validation.js");
const { Op } = require("sequelize");

exports.createCartItem = async (req, res) => {
    const { error } = validateCartItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await CartItem.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllCartItems = async (req, res) => {
    try {
        const items = await CartItem.findAll({
            include: [
                { model: Cart, as: "cart" },
                { model: Ticket, as: "ticket" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getCartItemById = async (req, res) => {
    try {
        const item = await CartItem.findByPk(req.params.id, {
            include: [
                { model: Cart, as: "cart" },
                { model: Ticket, as: "ticket" }
            ]
        });
        if (!item) return res.status(404).send("CartItem not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateCartItem = async (req, res) => {
    const { error } = validateCartItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await CartItem.findByPk(req.params.id);
        if (!item) return res.status(404).send("CartItem not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteCartItem = async (req, res) => {
    try {
        const item = await CartItem.findByPk(req.params.id);
        if (!item) return res.status(404).send("CartItem not found");
        await item.destroy();
        return res.status(200).send("CartItem deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchCartItems = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await CartItem.findAll({
            where: !isNaN(query) ? { cart_id: query } : {}});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
