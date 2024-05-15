const { generateUserPassword } = require("./bcrypt");

const normalizeUser = (rawUser) => {
  const name = {
    ...rawUser.name,
    middle: rawUser.name.middle || "",
  };

  const image = {
    ...rawUser.image,
    url:
      rawUser.image.url ||
      "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
    alt: rawUser.image.alt || "user image",
  };

  const address = {
    ...rawUser.address,
    state: rawUser.address.state || "",
    zip: rawUser.address.zip || "",
  };

  const user = {
    ...rawUser,
    name,
    image,
    address,
    password: generateUserPassword(rawUser.password),
  };

  return user;
};

module.exports = normalizeUser;
