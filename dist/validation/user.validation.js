"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatevalidation = exports.loginvalidation = exports.registervalidation = void 0;
const Joi = require("joi");
// ----------------------------------register validation---------------------------------
const registervalidation = (data) => {
    const schema = Joi.object({
        user_name: Joi.string().trim().min(3).required(),
        user_email: Joi.string().lowercase().email({ minDomainSegments: 2 }),
        user_password: Joi.string().min(6).trim().required(),
        user_mobile_no: Joi.string()
            .length(10)
            .pattern(/[6-9]{1}[0-9]{9}/)
            .required(),
        user_city: Joi.string().trim().min(3).required(),
    });
    return schema.validate(data);
};
exports.registervalidation = registervalidation;
// ----------------------------------login validation---------------------------------
const loginvalidation = (data) => {
    const schema = Joi.object({
        user_email: Joi.string().lowercase().email({ minDomainSegments: 2 }),
        user_password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};
exports.loginvalidation = loginvalidation;
// ------------------update validation------------------
const updatevalidation = (data) => {
    const schema = Joi.object({
        user_mobile: Joi.string()
            .length(10)
            .pattern(/[6-9]{1}[0-9]{9}/)
            .required(),
        user_country: Joi.string().trim().min(3).required(),
        user_city: Joi.string().trim().min(3).required(),
    });
    return schema.validate(data);
};
exports.updatevalidation = updatevalidation;
