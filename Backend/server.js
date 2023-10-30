import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import UserService from "./services/UserService.js";
import BookingService from "./services/BookingService.js";
import {getAirplanes} from "./database.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/register", (req, res) => {
  UserService.register(req, res);
});

app
  .route("/booking")
  .post(async(req, res) => {
    await BookingService.get_flights(req, res);
  });

import seatselectionRouter from "./routes/seatselection.js";
app.use("/seatselection", seatselectionRouter);

app.listen(5000, function() {
  console.log("Server is running on port 5000");
});