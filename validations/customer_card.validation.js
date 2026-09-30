const Joi = require("joi");

const validateCustomerCard = (data) => {
    const schema = Joi.object({
        customer_id: Joi.number().integer().positive().required(),
        name: Joi.string().min(2).max(100).required(),
        phone: Joi.string().pattern(/^\+?[0-9]{9,15}$/).required(),
        number: Joi.string().pattern(/^[0-9]{16}$/).required(),
        year: Joi.string().pattern(/^[0-9]{4}$/).required(),
        month: Joi.string().pattern(/^(0[1-9]|1[0-2])$/).required(),
        is_active: Joi.boolean().required(),
        is_main: Joi.boolean().required(),
    });

    return schema.validate(data);
};

module.exports = { validateCustomerCard };
