const Joi = require("joi");

const validateVenuePhoto = (data) => {
    const schema = Joi.object({
        venueId: Joi.number().integer().positive().required(),
        url: Joi.string().uri().required(),
    });

    return schema.validate(data);
};

module.exports = { validateVenuePhoto };
