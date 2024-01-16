import { model } from "../models";

export const createWishlist = (req, res) => {
  req.body.userId = req?.loginUser?.id;
  model.WishList.update({ userId: req?.loginUser?.id }, req?.body, {
    upsert: true,
  })
    .then((resData) => {
      res.send({ status: 200, data: resData });
    })
    .catch((err) => {
      res.send({ status: 400, message: err.message });
    });
};

export const getByUserId = (req, res) => {
  model.WishList.findOne({ userId: req?.loginUser?.id })
    .populate([{ path: "products" }])
    .then((resData) => {
      res.send({ status: 200, data: resData });
    })
    .catch((err) => {
      res.send({ status: 400, message: err.message });
    });
};

export const updateWishlist = (req, res) => {
  model.WishList.findOneAndUpdate({ userId: req?.loginUser?.id }, req?.body, {
    new: true,
  })
    .then((resData) => {
      res.send({ status: 200, data: resData });
    })
    .catch((err) => {
      res.send({ status: 400, message: err.message });
    });
};
