const Joi = require("joi");

const validateTicket = (data) => {
    const schema = Joi.object({
        event_id: Joi.number().integer().positive(),
        seat_id: Joi.number().integer().positive(),
        price: Joi.number().precision(2).positive().required(),
        service_fee: Joi.number().precision(2).min(0).required(),
        status_id: Joi.number().integer().positive(),
        ticket_type_id: Joi.number().integer().positive(),
    });

    return schema.validate(data);
};

module.exports = { validateTicket };
