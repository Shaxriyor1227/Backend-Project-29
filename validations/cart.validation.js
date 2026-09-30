const Joi = require("joi");

const validateCart = (data) => {
    const schema = Joi.object({
        customer_id: Joi.number().integer().positive().required(),
        fineshedAt: Joi.date().iso().allow(null),
        status_id: Joi.number().integer().positive(),
    });

    return schema.validate(data);
};

module.exports = { validateCart };
