// Import required modules
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getFlightSchedule } from "./database.js"; // Importing a function from another file

// Create an Express application
const app = express();
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing) for all routes
app.use(bodyParser.json()); // Parse incoming JSON requests

// Define a route for the root endpoint "/"
app.get("/", async function (req, res) {
  // Call the getFlightSchedule function asynchronously and wait for the result
  const result = await getFlightSchedule();
  // Send the result as a JSON response
  res.json(result);
});

// Start the server and listen on port 5000
app.listen(5000, function () {
  console.log("Server is running on port 5000"); // Log a message when the server starts
});
