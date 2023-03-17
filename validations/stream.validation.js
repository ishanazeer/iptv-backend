import Joi from "joi";

const schema = {
  add: {
    body: Joi.object().keys({
      episode_id: Joi.string().required(),
      user_id: Joi.string().required(),
      time: Joi.string().required(),
    }),
  },
};

export default schema;
