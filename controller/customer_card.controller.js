const { CustomerCard, Customer } = require("../models");
const { validateCustomerCard } = require("../validations/customer_card.validation.js");
const { Op } = require("sequelize");

exports.createCustomerCard = async (req, res) => {
    const { error } = validateCustomerCard(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await CustomerCard.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllCustomerCards = async (req, res) => {
    try {
        const items = await CustomerCard.findAll({
            include: [
                { model: Customer, as: "customer" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getCustomerCardById = async (req, res) => {
    try {
        const item = await CustomerCard.findByPk(req.params.id, {
            include: [
                { model: Customer, as: "customer" }
            ]
        });
        if (!item) return res.status(404).send("CustomerCard not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateCustomerCard = async (req, res) => {
    const { error } = validateCustomerCard(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await CustomerCard.findByPk(req.params.id);
        if (!item) return res.status(404).send("CustomerCard not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteCustomerCard = async (req, res) => {
    try {
        const item = await CustomerCard.findByPk(req.params.id);
        if (!item) return res.status(404).send("CustomerCard not found");
        await item.destroy();
        return res.status(200).send("CustomerCard deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchCustomerCards = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await CustomerCard.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { number: { [Op.iLike]: `%${query}%` } }
                ]
            }});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
