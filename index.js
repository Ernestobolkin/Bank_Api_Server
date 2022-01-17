const chalk = require("chalk");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apiRouter = require("./routes/apiRoutes");

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(chalk.green("Server is up on port ") + port);
});
