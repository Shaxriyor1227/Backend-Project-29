const Joi = require("joi");

const validateTicketType = (data) => {
    const schema = Joi.object({
        ticket_type: Joi.string().min(2).max(100).required(),
    });

    return schema.validate(data);
};

module.exports = { validateTicketType };
