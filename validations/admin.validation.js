const Joi = require("joi");

const validateAdmin = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        login: Joi.string().min(3).max(100).required(),
        hashed_password: Joi.string().min(6).required(),
        is_active: Joi.boolean().required(),
        is_creator: Joi.boolean().required(),
        hashed_refresh_token: Joi.string().optional().allow(null, ""),
    });

    return schema.validate(data);
};

module.exports = { validateAdmin };
