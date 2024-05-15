const lodash = require("lodash");
const Card = require("../models/mongoose/Card");

const generateBizNumber = async () => {
  try {
    const random = lodash.random(1_000_000, 9_999_999);
    const card = await Card.findOne(
      { bizNumber: random },
      { bizNumber: 1, _id: 0 }
    );
    if (card) return generateBizNumber();
    return random;
  } catch (error) {
    return Promise.reject(`Mongoose Error: ${error.message}`);
  }
};

exports.generateBizNumber = generateBizNumber;
