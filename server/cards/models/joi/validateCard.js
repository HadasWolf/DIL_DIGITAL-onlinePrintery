const Joi = require("joi");

const REQUIRED_FIELD = Joi.string().min(2).max(256).required();
const NOT_REQUIRED = Joi.string().min(2).max(256).allow("");
const URL =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const message = (regex, message, required = true) => {
  if (required)
    return Joi.string()
      .ruleset.regex(regex)
      .rule({ message: message })
      .required();

  return Joi.string().ruleset.regex(regex).rule({ message: message }).allow("");
};

const validateCard = (card) => {
  const schema = Joi.object({
    title: REQUIRED_FIELD,
    subtitle: REQUIRED_FIELD,
    description: Joi.string().min(2).max(1024).required(),
    phone: message(
      /0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/,
      'card "phone" mast be a valid phone number'
    ),
    email: message(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
      'card "mail" mast be a valid mail'
    ),
    web: message(URL, 'card "web" mast be a valid url', false),
    image: Joi.object()
      .keys({
        url: message(URL, 'card.image "url" mast be a valid url', false),
        alt: NOT_REQUIRED,
      })
      .required(),
    address: Joi.object()
      .keys({
        state: NOT_REQUIRED,
        country: REQUIRED_FIELD,
        city: REQUIRED_FIELD,
        street: REQUIRED_FIELD,
        houseNumber: Joi.number().required(),
        zip: Joi.number().required().allow(""),
      })
      .required(),
    bizNumber: Joi.number().allow(""),
    user_id: Joi.string().allow(""),
  });

  return schema.validate(card);
};

module.exports = validateCard;
