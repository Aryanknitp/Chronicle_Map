import Location from "../models/Location.model.js";

export const getLocations = async (req, res) => {
  const locations = await Location.find().populate("createdBy", "name");
  res.json(locations);
};

export const createLocation = async (req, res) => {
  const location = await Location.create({
    ...req.body,
    createdBy: req.user._id,
  });
  res.status(201).json(location);
};
