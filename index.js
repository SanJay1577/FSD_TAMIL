import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dataBaseConnection } from "./db.js";
import { userRouter } from "./routes/user.js";
import { notesRouter } from "./routes/notes.js";
import { isAuthorized } from "./middlewares/auth.js";

// configure env variables
dotenv.config();

// server setup
const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors());

//database connection
dataBaseConnection();

//routes
app.use("/api/user", userRouter);
app.use("/api/notes", isAuthorized, notesRouter);

//listen the server
app.listen(PORT, () => {
  console.log(`Server started in localhost:${PORT}`);
});
