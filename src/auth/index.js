import jwt from "jsonwebtoken";
import { model } from "../models";

export const authorized = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split?.(" ")?.[1];
    console.log("-----------  token----------->", token)
    if (!token) throw new Error("you are not authorized");
    const data = jwt.verify(token, process.env.SECRET_KEY);
    if (data) {
      const userData = await model.User.findOne({ email: data?.email });
      console.log("-----------  userData----------->", userData)
      req.loginUser = { ...userData, id: userData?._id.toString() };
      next();
    } else throw new Error("you are not authorized");
  } catch (error) {
    res.status(500).send("you are not authorized");
  }
};

export const AdminAuth = (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split?.(" ")[1];
    const data = jwt.verify(token, process.env.SECRET_KEY);
    if (data.userType !== "admin") throw new Error("You are--- not authorized");
    if (data) next();
    else throw new Error("you are not authorized");
  } catch (error) {
    console.log("error----------->", error.message);
    throw new Error("you are not authorized");
  }
};
