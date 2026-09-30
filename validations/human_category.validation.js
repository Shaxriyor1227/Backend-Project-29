const Joi = require("joi");

const validateHumanCategory = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        start_age: Joi.number().integer().min(0).max(150).allow(null),
        finish_age: Joi.number().integer().min(0).max(150).allow(null),
        gender_id: Joi.number().integer().positive(),
    });

    return schema.validate(data);
};

module.exports = { validateHumanCategory };
