const { Admin } = require("../models");
const { validateAdmin } = require("../validations/admin.validation.js");
const { Op } = require("sequelize");

exports.createAdmin = async (req, res) => {
    const { error } = validateAdmin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Admin.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllAdmins = async (req, res) => {
    try {
        const items = await Admin.findAll();
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAdminById = async (req, res) => {
    try {
        const item = await Admin.findByPk(req.params.id);
        if (!item) return res.status(404).send("Admin not found");

        const data = item.toJSON(); delete data.hashed_password; delete data.hashed_refresh_token; return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateAdmin = async (req, res) => {
    const { error } = validateAdmin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Admin.findByPk(req.params.id);
        if (!item) return res.status(404).send("Admin not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        const item = await Admin.findByPk(req.params.id);
        if (!item) return res.status(404).send("Admin not found");
        await item.destroy();
        return res.status(200).send("Admin deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchAdmins = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await Admin.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
