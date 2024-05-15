const express = require("express");
const app = express();
const chalk = require("chalk");

app.get("/", (req, res) => {
  console.log("in app.get!!!");
  throw new Error("testing error middleware!!!!!");
});

app.use((err, req, res, next) => {
  console.log(chalk.redBright(err.message));
  res.status(500).send(err.message);
});

const PORT = 8181;
app.listen(PORT, () =>
  console.log(chalk.blueBright(`Listening on: http://localhost:${PORT}`))
);
