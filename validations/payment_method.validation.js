const Joi = require("joi");

const validatePaymentMethod = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
    });

    return schema.validate(data);
};

module.exports = { validatePaymentMethod };
