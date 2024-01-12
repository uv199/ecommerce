import express from "express";
import {
  getAll,
  getUserById,
  reset_passsword,
  sendotp,
  signIn,
  signUp,
  updateUser,
} from "../controler/user";
import { AdminAuth } from "../auth";

import multer from "multer";
import path from "path";

const uploadFolder = path.join(__dirname, "..", "..", "assets");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const customFileName = Date.now() + path.extname(file.originalname);
    cb(null, customFileName);
  },
});

const upload = multer({ storage });

const userRouter = express.Router();

userRouter.post("/upload", upload.single("avatar"), (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.status(200).send(req.file);
});

userRouter.get("/getAll", getAll);

userRouter.get("/getUserById/:id", getUserById);

userRouter.post("/signin", signIn);

userRouter.post("/signUp", signUp);

userRouter.post(`/update/:id`, updateUser);

userRouter.post("/sendotp", sendotp);

userRouter.post("/reset_passsword", reset_passsword);

export default userRouter;
