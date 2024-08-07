import express from "express";
import {
  deleteUser,
  getAll,
  getUserById,
  reset_passsword,
  sendotp,
  signIn,
  signUp,
  updateUser,
} from "../controler/user";
import { AdminAuth, authorized } from "../auth";

import multer from "multer";
import path from "path";
import { model } from "../models";

const uploadFolder = path.join(__dirname, "..", "..", "assets");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("-----------  file----------->", file)
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const customFileName = Date.now() + path.extname(file.originalname);
    cb(null, customFileName);
  },
});

const upload = multer({ storage });

const userRouter = express.Router();

userRouter.post(
  "/upload",
  // authorized,
  upload.single("avatar"),
  async (req, res, next) => {
    console.log("-----------  req----------->", req.body);
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    let data = await model.User.findByIdAndUpdate(
      req?.loginUser?.id,
      { image: req?.file?.filename },
      { new: true }
    );

    res.status(200).send(req.file);
  }
);
userRouter.post(
  "/photos/upload",
  authorized,
  upload.array("photos", 12),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }
      res.status(200).send(req.file);
    } catch (error) {
      console.log("-----------  error----------->", error);
    }
  }
);

userRouter.get("/getAll", getAll);

userRouter.get("/getUserById/:id", getUserById);

userRouter.post("/signin", signIn);

userRouter.post("/signUp", signUp);

userRouter.delete("/delete/:id", deleteUser);

userRouter.post(`/update/:id`, updateUser);

userRouter.post("/sendotp", sendotp);

userRouter.post("/reset_passsword", reset_passsword);

export default userRouter;
