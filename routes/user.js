import express from "express";
import bcrypt from "bcrypt";
import { generateToken, getUserByEmail } from "../controllers/user.js";
import { User } from "../models/user.js";

const router = express.Router();

//login
router.post("/login", async (req, res) => {
  try {
    // check user exist or not
    const user = await getUserByEmail(req);
    // no user exist
    if (!user) {
      return res.status(400).json({
        error: "Invalid authorization",
      });
    }
    // validating the password
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatePassword) {
      return res.status(400).json({
        error: "Invalid authorization",
      });
    }

    // generate password
    const token = generateToken(user._id);
    res.status(200).json({ message: "Logged in", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server" });
  }
});

//signup
router.post("/signup", async (req, res) => {
  try {
    //  check user laready exist
    let user = await getUserByEmail(req);
    if (user) {
      return res.status(400).json({ error: "User alredy exist" });
    }
    // generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user = await new User({
      ...req.body,
      password: hashedPassword,
    }).save();
    // generated token and giove response
    const token = generateToken(user._id);
    res.status(201).json({
      message: "Registered",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server" });
  }
});

export const userRouter = router;
