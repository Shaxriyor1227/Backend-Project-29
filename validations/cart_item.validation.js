const Joi = require("joi");

const validateCartItem = (data) => {
    const schema = Joi.object({
        ticket_id: Joi.number().integer().positive().required(),
        cart_id: Joi.number().integer().positive().required(),
    });

    return schema.validate(data);
};

module.exports = { validateCartItem };
