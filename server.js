const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const { mongo } = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 8086;

//middilewares
app.use(express.json());
app.use(cors());

//middleware for database connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("database is connected"))
  .catch((e) => console.log(e));

const authrout = require("./routes/auth");

// const cartroute = require("./routes/cart");

// const productroute = require("./routes/product");

app.use("/api", authrout);
// app.use("/api", cartroute);
// app.use("/api", productroute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
