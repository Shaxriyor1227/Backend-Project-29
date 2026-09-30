const Joi = require("joi");

const validateSeat = (data) => {
    const schema = Joi.object({
        sector_id: Joi.number().integer().positive(),
        row_number: Joi.number().integer().min(1).required(),
        number: Joi.number().integer().min(1).required(),
        venue_id: Joi.number().integer().positive(),
        seat_type_id: Joi.number().integer().positive(),
        location_in_schema: Joi.string().required(),
    });

    return schema.validate(data);
};

module.exports = { validateSeat };
