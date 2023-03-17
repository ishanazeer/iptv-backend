import Joi from "joi";

const schema = {
  add: {
    body: Joi.object().keys({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
};

export default schema;
