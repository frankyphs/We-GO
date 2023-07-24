require(`dotenv`).config();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const router = require("./router");
const errorHandling = require("./middleware/errorHandling");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// module.exports = app;
