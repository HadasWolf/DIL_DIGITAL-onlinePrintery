const { bgYellowBright } = require("chalk");
console.log(bgYellowBright("In test.js!"));

/***** Query Params *****/
// ?key=value
// ?second=value2&key=value

const queryParams = {
  key: "value",
  second: "value2",
};

/***** Params *****/

// server side - url/:key
// client side - url/value

let params = {
  key: "value",
};
// server side - url/:key/:second
// client side - url/value/value2

params = {
  key: "value",
  second: "value2",
};
