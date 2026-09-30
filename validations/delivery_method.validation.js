const Joi = require("joi");

const validateDeliveryMethod = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
    });

    return schema.validate(data);
};

module.exports = { validateDeliveryMethod };
