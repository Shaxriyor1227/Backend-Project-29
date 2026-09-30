const Joi = require("joi");

const validateBooking = (data) => {
    const schema = Joi.object({
        cart_id: Joi.number().integer().positive().required(),
        fineshed: Joi.date().iso().required(),
        payment_method_id: Joi.number().integer().positive(),
        delivery_method_id: Joi.number().integer().positive(),
        discount_id: Joi.number().integer().positive(),
        status_id: Joi.number().integer().positive(),
    });

    return schema.validate(data);
};

module.exports = { validateBooking };
