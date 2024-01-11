import express from "express";
import { model } from "../models";
import { AdminAuth } from "../auth";
import {
  createProduct,
  deleteProduct,
  getById,
  productByRange,
  updateProduct,
  getAll,
  getAllPaginate,
} from "../controler/product";

const productRouter = express.Router();

productRouter.post("/create", createProduct);

productRouter.get("/getProductById/:id", getById);

productRouter.get("/getAll", getAll);

productRouter.get("/getAllPaginate", getAllPaginate);

productRouter.get("/getProductByRang", productByRange);

productRouter.put("/update/:id", updateProduct);

productRouter.delete("/delete/:id", deleteProduct);

export default productRouter;
