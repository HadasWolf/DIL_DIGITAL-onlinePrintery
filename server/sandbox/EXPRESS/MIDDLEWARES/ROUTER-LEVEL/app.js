const express = require("express");
const app = express();
const chalk = require("chalk");
const router = express.Router();

const getMessage = (req, res) => {
  console.log("in router get!");
  res.send({ message: "in router get!!!" });
};

router.get("/message", getMessage);

router.post("/test", (req, res) => {
  console.log("in post");
  res.send("in post!!");
});

app.use("/cards", router);

const PORT = 8181;
app.listen(PORT, () =>
  console.log(chalk.blueBright(`Listening on: http://localhost:${PORT}`))
);

// const moshe = () => {
//   return {
//     // izhak
//     shula() {
//       return 5;
//     },
//     tikva() {
//       return 6;
//     },
//   };
// };

// // built in middleware - express.json
// moshe.zozo = () => 7;
// moshe.Zak = class {
//   yohevet(url) {
//     if (url === "/get-cards") return 5;
//     if (url === "/get-card") return 6;
//     return null;
//   }

//   zipora(url) {
//     if (url === "/create-card") return 9;
//   }
// };

// // express.Router
// moshe.Zak.shifra = () => {
//   const { yohevet, zipora } = new moshe.Zak();
// };

// const a = moshe.zozo; // express.static
// const x = a(); // app
// const { shula } = x; // use

// console.log("x", x);
// console.log("shula", shula);
// console.log("a", a);
