const { VenuePhoto, Venue } = require("../models");
const { validateVenuePhoto } = require("../validations/venue_photo.validation.js");
const { Op } = require("sequelize");

exports.createVenuePhoto = async (req, res) => {
    const { error } = validateVenuePhoto(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await VenuePhoto.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllVenuePhotos = async (req, res) => {
    try {
        const items = await VenuePhoto.findAll({
            include: [
                { model: Venue, as: "venue" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getVenuePhotoById = async (req, res) => {
    try {
        const item = await VenuePhoto.findByPk(req.params.id, {
            include: [
                { model: Venue, as: "venue" }
            ]
        });
        if (!item) return res.status(404).send("VenuePhoto not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateVenuePhoto = async (req, res) => {
    const { error } = validateVenuePhoto(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await VenuePhoto.findByPk(req.params.id);
        if (!item) return res.status(404).send("VenuePhoto not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteVenuePhoto = async (req, res) => {
    try {
        const item = await VenuePhoto.findByPk(req.params.id);
        if (!item) return res.status(404).send("VenuePhoto not found");
        await item.destroy();
        return res.status(200).send("VenuePhoto deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchVenuePhotos = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await VenuePhoto.findAll({
            where: {
                url: { [Op.iLike]: `%${query}%` }
            }});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
