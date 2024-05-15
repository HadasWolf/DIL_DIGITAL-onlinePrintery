const express = require("express");
const app = express();
const chalk = require("chalk");
const cors = require("cors");

// app.use(cors()); // הדרך שבה יכסחו לי את הצורה של השרת

// app.use(
//   cors({
//     origin: "http://127.0.0.1:5500",
//     optionsSuccessStatus: 200,
//   })
// );

// app.use(
//   cors({
//     origin: ["http://127.0.0.1:5502", "http://127.0.0.1:5501"],
//     code: 200
//   })
// );

const allowedApis = ["http://127.0.0.1:5502", "http://127.0.0.1:5500"];

const options = (req, callback) => {
  const isExist = allowedApis.find(api => api === req.headers.origin);
  if (!isExist)
    return callback("Unauthorized API", { origin: false, code: 403 });
  callback(null, { origin: true });
};

app.use(cors(options));

app.get("/", (req, res) => {
  res.send({ message: "success" });
});

const PORT = 7171;
app.listen(PORT, () =>
  console.log(chalk.blueBright(`Listening on: http://localhost:${PORT}`))
);
