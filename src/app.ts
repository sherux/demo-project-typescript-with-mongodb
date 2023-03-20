import express from "express";
import mongoose from "mongoose";
const app = express();

import userroutes from "./routes/user.routes";
app.use(express.json());
app.use("/user", userroutes);

mongoose
  .connect("mongodb://localhost:27017/USERDATA")
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(5000, () => {
  console.log("server running port no 5000");
});
