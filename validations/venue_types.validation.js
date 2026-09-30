const Joi = require("joi");

const validateVenueTypes = (data) => {
    const schema = Joi.object({
        venueId: Joi.number().integer().positive().required(),
        typeId: Joi.number().integer().positive().required(),
    });

    return schema.validate(data);
};

module.exports = { validateVenueTypes };
