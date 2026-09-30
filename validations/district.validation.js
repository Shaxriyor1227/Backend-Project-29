const Joi = require("joi");

const validateDistrict = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        region_id: Joi.number().integer().positive(),
    });

    return schema.validate(data);
};

module.exports = { validateDistrict };
