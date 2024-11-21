import Track from "../models/TrackModel.js";
import Joi from "joi";

// Get all Tracks
export const getAllTracks = async (req, res) => {
  try {
    const allTracks = await Track.find();
    res.status(200).json(allTracks);
  } catch (error) {
    res.status(400).json({ message: "Request failed", error: error.message });
  }
};

// Get a specific Track by id
export const getATrack = async (req, res) => {
  try {
    const oneTrack = await Track.findOne({ _id: req.params.id });
    if (!oneTrack) {
      return res.status(404).json({ message: "Track doesn't exist" });
    }
    res.status(200).json(oneTrack);
  } catch (error) {
    res.status(400).json({ message: "Request failed", error: error.message });
  }
};

// Get Tracks for a specific user
export const getUserTracks = async (req, res) => {
  try {
    const { email } = req.params;
    const tracks = await Track.find({ user: email });
    res.json(tracks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user tracks", error: error.message });
  }
};

// Add a new Track
export const addTrack = async (req, res) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    name: Joi.string().required(),
    url: Joi.string().required(),
    site: Joi.string().required(),
    type: Joi.string().required(),
    demandPrice: Joi.number().required(),
    image: Joi.string(),
  });

  const { value: trackInfo, error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details, ...trackInfo });
  }

  const track = new Track(trackInfo);
  try {
    const savedTrack = await track.save();
    res.status(200).json({ success: true, id: savedTrack._id });
  } catch (err) {
    res.status(400).json({ error: err.message, ...trackInfo });
  }
};

// Delete a specific Track
export const deleteTrack = async (req, res) => {
  const TrackId = req.params.id;
  try {
    await Track.deleteOne({ _id: TrackId });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: "Request failed", error: error.message });
  }
};

// import Track from "../models/TrackModel.js";
// import Joi from "joi";

// // Get all Tracks
// export const getAllTracks = async (req, res) => {
//   try {
//     const allTracks = await Track.find();
//     res.status(200).json(allTracks);
//   } catch (error) {
//     res.status(400).json({ message: "Request failed", error: error.message });
//   }
// };

// // Get a specific Track by id
// export const getATrack = async (req, res) => {
//   try {
//     const oneTrack = await Track.findOne({ _id: req.params.id });
//     if (!oneTrack) {
//       return res.status(404).json({ message: "Track doesn't exist" });
//     }
//     res.status(200).json(oneTrack);
//   } catch (error) {
//     res.status(400).json({ message: "Request failed", error: error.message });
//   }
// };

// // Get Tracks for a specific user
// export const getUserTrack = async (req, res) => {
//   try {
//     const { email } = req.params;
//     const tracks = await Track.find({ user: email });
//     res.json(tracks);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching user tracks", error: error.message });
//   }
// };

// // Add a new Track
// export const addTrack = async (req, res) => {
//   const schema = Joi.object({
//     user: Joi.string().required(),
//     name: Joi.string().required(),
//     url: Joi.string().required(),
//     site: Joi.string().required(),
//     type: Joi.string().required(),
//     demandPrice: Joi.number().required(),
//     image: Joi.string(),
//   });

//   const { value: trackInfo, error } = schema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ error: error.details, ...trackInfo });
//   }

//   const track = new Track(trackInfo);
//   try {
//     const savedTrack = await track.save();
//     res.status(200).json({ success: true, id: savedTrack._id });
//   } catch (err) {
//     res.status(400).json({ error: err.message, ...trackInfo });
//   }
// };

// // Delete a specific Track
// export const deleteTrack = async (req, res) => {
//   const TrackId = req.params.id;
//   try {
//     await Track.deleteOne({ _id: TrackId });
//     res.status(200).json({ success: true });
//   } catch (error) {
//     res.status(400).json({ message: "Request failed", error: error.message });
//   }
// };
