const normalizeCart = async (rawCart, userId) => {
  return {
    ...rawCart,
    user_id: rawCart.user_id || userId,
  };
};

module.exports = normalizeCart;
