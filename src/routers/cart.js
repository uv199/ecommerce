import express from "express";
import { create, getall, remove, update } from "../controler/cart";
import { authorized } from "../auth";

const cartRouter = express.Router();

cartRouter.post("/create/:id", authorized, create);

cartRouter.get("/getAll", authorized, getall);

cartRouter.put("/update", authorized, update);

cartRouter.delete("/delete/:id", authorized, remove);

export default cartRouter;
