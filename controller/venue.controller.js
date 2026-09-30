const { Venue, Event, Seat, Region, District, VenuePhoto, VenueTypes } = require("../models");
const { validateVenue } = require("../validations/venue.validation.js");
const { Op } = require("sequelize");

exports.createVenue = async (req, res) => {
    const { error } = validateVenue(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Venue.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAllVenues = async (req, res) => {
    try {
        const items = await Venue.findAll({
            include: [
                { model: Event, as: "events" },
                { model: Seat, as: "seats" },
                { model: Region, as: "region" },
                { model: District, as: "district" },
                { model: VenuePhoto, as: "photos" },
                { model: VenueTypes, as: "venueTypes" }
            ]
        });
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getVenueById = async (req, res) => {
    try {
        const item = await Venue.findByPk(req.params.id, {
            include: [
                { model: Event, as: "events" },
                { model: Seat, as: "seats" },
                { model: Region, as: "region" },
                { model: District, as: "district" },
                { model: VenuePhoto, as: "photos" },
                { model: VenueTypes, as: "venueTypes" }
            ]
        });
        if (!item) return res.status(404).send("Venue not found");

        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateVenue = async (req, res) => {
    const { error } = validateVenue(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await Venue.findByPk(req.params.id);
        if (!item) return res.status(404).send("Venue not found");
        await item.update(req.body);
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.deleteVenue = async (req, res) => {
    try {
        const item = await Venue.findByPk(req.params.id);
        if (!item) return res.status(404).send("Venue not found");
        await item.destroy();
        return res.status(200).send("Venue deleted successfully");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.searchVenues = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).send("Search query is required");

        const items = await Venue.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }});
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
