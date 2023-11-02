import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import BookingService from "../services/BookingService.js";

const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

router.route("/:Reserve_ID/u")
    .get(async (req, res) => {
        await BookingService.find_reservationdetails(req.params.Reserve_ID, res);
    })

export default router;