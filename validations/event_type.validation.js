const Joi = require("joi");

const validateEventType = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        parent_event_type_id: Joi.number().integer().positive().allow(null),
    });

    return schema.validate(data);
};

module.exports = { validateEventType };
