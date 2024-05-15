const { generateBizNumber } = require("./generateBizNumber");

const normalizeCard = async (rawCard, userId) => {
  const image = {
    url:
      rawCard.image.url ||
      "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
    alt: rawCard.image.alt || "Business card image",
  };

  const address = {
    ...rawCard.address,
    state: rawCard.address.state || "",
    zip: rawCard.address.zip || 0,
  };

  return {
    ...rawCard,
    web: rawCard.web || "",
    image,
    address,
    bizNumber: rawCard.bizNumber || (await generateBizNumber()),
    user_id: rawCard.user_id || userId,
  };
};

module.exports = normalizeCard;
