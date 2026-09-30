const Joi = require("joi");

const validateEvent = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        photo: Joi.string().uri().allow(null, ""),
        start_date: Joi.date().iso().allow(null),
        start_time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/).allow(null, ""),
        finish_date: Joi.date().iso().allow(null),
        finish_time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/).allow(null, ""),
        info: Joi.string().max(5000).allow(null, ""),
        event_type_id: Joi.number().integer().positive(),
        human_category_id: Joi.number().integer().positive(),
        venue_id: Joi.number().integer().positive(),
        lang_id: Joi.number().integer().positive(),
        release_date: Joi.date().iso().allow(null),
    });

    return schema.validate(data);
};

module.exports = { validateEvent };
