const { Customer, CustomerCard, CustomerAddress, Cart, Gender, Lang } = require("../models");
const { validateCustomer } = require("../validations/customer.validation.js");
const { Op } = require("sequelize");

exports.createCustomer = async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Customer.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllCustomers = async (req, res) => {
    try {
        const items = await Customer.findAll({
            include: [
                { model: CustomerCard, as: "customerCard" },
                { model: CustomerAddress, as: "customerAddress" },
                { model: Cart, as: "carts" },
                { model: Gender, as: "gender" },
                { model: Lang, as: "language" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const item = await Customer.findByPk(req.params.id, {
            include: [
                { model: CustomerCard, as: "customerCard" },
                { model: CustomerAddress, as: "customerAddress" },
                { model: Cart, as: "carts" },
                { model: Gender, as: "gender" },
                { model: Lang, as: "language" }
            ]
        });
        if (!item) return res.status(404).send("Customer not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateCustomer = async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Customer.findByPk(req.params.id);
        if (!item) return res.status(404).send("Customer not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const item = await Customer.findByPk(req.params.id);
        if (!item) return res.status(404).send("Customer not found");
        await item.destroy();
        return res.status(200).send("Customer deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchCustomers = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await Customer.findAll({
            where: {
                [Op.or]: [
                    { first_name: { [Op.iLike]: `%${query}%` } },
                    { last_name: { [Op.iLike]: `%${query}%` } },
                    { email: { [Op.iLike]: `%${query}%` } },
                    { phone: { [Op.iLike]: `%${query}%` } }
                ]
            }});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
