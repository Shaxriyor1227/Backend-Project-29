const Joi = require("joi");

const validateDiscount = (data) => {
    const schema = Joi.object({
        discount: Joi.string().max(50).required(),
        finish_date: Joi.date().iso().greater("now").required(),
    });

    return schema.validate(data);
};

module.exports = { validateDiscount };
