const { CustomerAddress, Customer, Region, District, Flat } = require("../models");
const { validateCustomerAddress } = require("../validations/customer_address.validation.js");
const { Op } = require("sequelize");

exports.createCustomerAddress = async (req, res) => {
    const { error } = validateCustomerAddress(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await CustomerAddress.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllCustomerAddresses = async (req, res) => {
    try {
        const items = await CustomerAddress.findAll({
            include: [
                { model: Customer, as: "customer" },
                { model: Region, as: "region" },
                { model: District, as: "district" },
                { model: Flat, as: "flat" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getCustomerAddressById = async (req, res) => {
    try {
        const item = await CustomerAddress.findByPk(req.params.id, {
            include: [
                { model: Customer, as: "customer" },
                { model: Region, as: "region" },
                { model: District, as: "district" },
                { model: Flat, as: "flat" }
            ]
        });
        if (!item) return res.status(404).send("CustomerAddress not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateCustomerAddress = async (req, res) => {
    const { error } = validateCustomerAddress(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await CustomerAddress.findByPk(req.params.id);
        if (!item) return res.status(404).send("CustomerAddress not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteCustomerAddress = async (req, res) => {
    try {
        const item = await CustomerAddress.findByPk(req.params.id);
        if (!item) return res.status(404).send("CustomerAddress not found");
        await item.destroy();
        return res.status(200).send("CustomerAddress deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchCustomerAddresses = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await CustomerAddress.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { street: { [Op.iLike]: `%${query}%` } },
                    { location: { [Op.iLike]: `%${query}%` } }
                ]
            }});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
