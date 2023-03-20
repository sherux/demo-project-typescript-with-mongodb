const Joi = require("joi");
// ----------------------------------register validation---------------------------------
export const registervalidation = (data: any) => {
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

// ----------------------------------login validation---------------------------------

export const loginvalidation = (data: any) => {
  const schema = Joi.object({
    user_email: Joi.string().lowercase().email({ minDomainSegments: 2 }),
    user_password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
// ------------------update validation------------------
export const updatevalidation = (data: any) => {
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
