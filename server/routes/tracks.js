import express from "express";
import {
  getAllTracks,
  getATrack,
  addTrack,
  deleteTrack,
  getUserTracks,
} from "../controllers/track.js";

const router = express.Router();

router.route("/").get(getAllTracks); //Route for getting all Tracks
router.route("/:id").get(getATrack); // Routing for getting specific Track
router.get("/user/:email", getUserTracks);
router.route("/").post(addTrack); // Route for adding Track
router.route("/:id").delete(deleteTrack); // Route for deleting specific Tracks

export default router;
