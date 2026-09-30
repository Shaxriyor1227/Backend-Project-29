const Joi = require("joi");

const validateSector = (data) => {
    const schema = Joi.object({
        sector_name: Joi.string().min(2).max(100).required(),
    });

    return schema.validate(data);
};

module.exports = { validateSector };
