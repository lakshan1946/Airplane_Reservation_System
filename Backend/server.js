import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// app.get("/schedule", async function (req, res) {
//   const result = await getFlightSchedule();
//   res.json(result);
// });

// app.get("/airplanes", async function (req, res) {
//   const result = await getAirplanes();
//   res.json(result);
// });

app
  .route("/login")
  .post((req, res) => {
    console.log(req.body);
    let { username, password } = req.body;
  
    res.json({ message: "submitted" });
  });

app.listen(5000, function() {
  console.log("Server is running on port 5000");
});
