const Joi = require("joi");

const validateCountry = (data) => {
    const schema = Joi.object({
        country_name: Joi.string().min(2).max(100).required(),
    });

    return schema.validate(data);
};

module.exports = { validateCountry };
