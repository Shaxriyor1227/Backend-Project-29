const Joi = require("joi");

const validateCustomerAddress = (data) => {
    const schema = Joi.object({
        customer_id: Joi.number().integer().positive().required(),
        name: Joi.string().min(2).max(100).required(),
        region_id: Joi.number().integer().positive(),
        district_id: Joi.number().integer().positive(),
        street: Joi.string().min(2).max(200).required(),
        house: Joi.string().max(50).required(),
        flat_id: Joi.number().integer().positive(),
        location: Joi.string().max(200).required(),
        post_index: Joi.string().max(20).required(),
        info: Joi.string().max(1000).required(),
    });

    return schema.validate(data);
};

module.exports = { validateCustomerAddress };
