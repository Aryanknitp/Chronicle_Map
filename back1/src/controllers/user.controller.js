import User from "../models/user.model.js";

export const getProfile = async (req, res) => {

  const user = await User.findById(req.user.id);

  res.json(user);

};

export const updateProfile = async (req, res) => {

  const user = await User.findByIdAndUpdate(
    req.user.id,
    req.body,
    { new: true }
  );

  res.json(user);
};
