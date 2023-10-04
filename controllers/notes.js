import { Notes } from "../models/notes.js";

export function getAllNotes() {
  return Notes.find().populate("user", "username");
}

export function getUserNotes(req) {
  return Notes.find({ user: req.user._id }).populate("user", "username email");
}

export function postNewNotes(req) {
  const updatedDate = new Date().toJSON().slice(0, 10);
  return new Notes({
    ...req.body,
    date: updatedDate,
    user: req.user._id,
  }).save();
}

export function updatedNotes(req) {
  return Notes.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  );
}

export function deletedNotes(req) {
  return Notes.findByIdAndDelete({
    _id: req.params.id,
  });
}
