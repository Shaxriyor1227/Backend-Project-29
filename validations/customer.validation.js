const Joi = require("joi");

const validateCustomer = (data) => {
    const schema = Joi.object({
        first_name: Joi.string().min(2).max(100).required(),
        last_name: Joi.string().min(2).max(100).required(),
        phone: Joi.string().pattern(/^\+?[0-9]{9,15}$/).required(),
        hashed_password: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
        birth_date: Joi.date().iso().max("now").required(),
        gender_id: Joi.number().integer().positive(),
        lang_id: Joi.number().integer().positive(),
        hashed_refresh_token: Joi.string().allow(null, ""),
    });

    return schema.validate(data);
};

module.exports = { validateCustomer };
