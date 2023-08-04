const mongoose = require("mongoose");

const DB = process.env.DATABASE;
console.log("For connection");
mongoose.set("strictQuery", true);
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection successful..");
  })
  .catch((err) => console.log(err + " No connection"));
