import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import BookingService from "../services/BookingService.js";

const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

router.route("/:Flight_ID")
  .get(async (req, res) => {
    await BookingService.get_plane(req.params.Flight_ID, res);
  })

export default router;