const Joi = require("joi");

const validateLang = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
    });

    return schema.validate(data);
};

module.exports = { validateLang };
