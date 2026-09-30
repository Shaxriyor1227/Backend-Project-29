const Joi = require("joi");

const validateFlat = (data) => {
    const schema = Joi.object({
        etaj: Joi.number().integer().min(1).max(200).required(),
        condition: Joi.string().min(2).max(200).required(),
    });

    return schema.validate(data);
};

module.exports = { validateFlat };
