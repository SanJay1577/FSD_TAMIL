import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export function getUserByEmail(request) {
  return User.findOne({
    email: request.body.email,
  });
}

export function getUserById(id) {
  return User.findById(id).select("_id username email");
}
export function generateToken(id) {
  return jwt.sign({ id }, process.env.SECRET_KEY);
}
