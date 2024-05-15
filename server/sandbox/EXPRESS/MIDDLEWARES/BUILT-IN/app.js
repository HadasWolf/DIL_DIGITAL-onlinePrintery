const express = require("express");
const app = express();
const chalk = require("chalk");

app.use(express.static("./public"));

app.use(express.json()); // server can receive json
app.use(express.text()); // server can receive string

app.get("/body", (req, res) => {
  const body = req.body;
  res.send(body);
});

/***** express static *****/
app.use(express.static("/public"));

app.get("/", (req, res) => {
  console.log("in app.get!!!");
  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>express static</title>
  </head>
  <body>
  <h1>Giraffe Picture</h1>
    <img src="/assets/images/giraf.jpg" alt="giraffe" />
  </body>
</html>`);
});

const PORT = 9191;
app.listen(PORT, () => {
  console.log(chalk.blueBright(`Listening on :http://localhost:${PORT}`));
});
