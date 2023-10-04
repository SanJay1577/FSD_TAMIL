import express from "express";
import {
  deletedNotes,
  getAllNotes,
  getUserNotes,
  postNewNotes,
  updatedNotes,
} from "../controllers/notes.js";
const router = express.Router();

//get all notes
router.get("/all", async (req, res) => {
  try {
    const notes = await getAllNotes();
    if (!notes || notes.length <= 0) {
      return res.status(404).json({
        error: "No content available",
      });
    }
    res.status(200).json({
      data: notes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server" });
  }
});

//get all user notes
router.get("/user/all", async (req, res) => {
  try {
    const notes = await getUserNotes(req);
    if (!notes || notes.length <= 0) {
      return res.status(404).json({
        error: "No content available",
      });
    }
    res.status(200).json({
      data: notes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server" });
  }
});

//add new user notes
router.post("/user/add", async (req, res) => {
  try {
    const newpost = await postNewNotes(req);
    if (!newpost) {
      return res.status(400).json({
        error: "Error Occured while uploading",
      });
    }

    res.status(201).json({
      message: "successfully uploaded",
      data: newpost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server" });
  }
});

//edit  user notes
router.put("/user/edit/:id", async (req, res) => {
  try {
    const editNotes = await updatedNotes(req);
    if (!updatedNotes) {
      return res.status(400).json({
        error: "Error Occured while updating",
      });
    }
    res.status(200).json({
      message: "successfully updated",
      data: editNotes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server" });
  }
});

//delete  user notes
router.delete("/user/delete/:id", async (req, res) => {
  try {
    const deleteNotes = await deletedNotes(req);
    if (!deleteNotes) {
      return res.status(400).json({
        error: "Error Occured while deleting",
      });
    }
    res.status(200).json({
      message: "successfully deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server" });
  }
});

export const notesRouter = router;
