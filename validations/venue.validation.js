const Joi = require("joi");

const validateVenue = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        address: Joi.string().max(300).allow(null, ""),
        location: Joi.string().max(300).allow(null, ""),
        site: Joi.string().uri().allow(null, ""),
        phone: Joi.string().pattern(/^\+?[0-9]{9,15}$/).allow(null, ""),
        schema: Joi.string().allow(null, ""),
        region_id: Joi.number().integer().positive(),
        district_id: Joi.number().integer().positive(),
    });

    return schema.validate(data);
};

module.exports = { validateVenue };
