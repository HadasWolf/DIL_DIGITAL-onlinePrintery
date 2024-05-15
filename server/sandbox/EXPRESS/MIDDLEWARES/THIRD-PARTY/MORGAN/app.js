const express = require("express");
const app = express();
const chalk = require("chalk");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

app.use(cors());

// app.use(morgan("tiny"));
// app.use(morgan("dev"));

// app.use(
//   morgan(
//     ":url :status :method :res[content-length] - :response-time David Yakin Is The lion King!!!"
//   )
// );

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a",
  }
);

const controller = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
};

app.use(morgan(controller, { stream: accessLogStream }));

const PORT = 7171;
app.listen(PORT, () =>
  console.log(chalk.blueBright(`Listening on: http://localhost:${PORT}`))
);
