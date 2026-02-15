import Media from "../models/Media.model.js";

export const uploadMedia = async (req, res) => {
  const media = await Media.create({
    ...req.body,
    uploadedBy: req.user._id,
  });
  res.status(201).json(media);
};

export const approveMedia = async (req, res) => {
  const media = await Media.findByIdAndUpdate(
    req.params.id,
    { status: "approved" },
    { new: true }
  );
  res.json(media);
};
