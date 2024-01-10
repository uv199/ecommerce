import { VirtualAgent } from "twilio/lib/twiml/VoiceResponse";
import { model } from "../models";

export const getall = (req, res) => {
  model.Cart.find({ userId: req?.loginUser?.id })
    .populate([{ path: "products.productId" }])
    .then((resData) => {
      res.send({ status: 200, data: resData });
    })
    .catch((err) => {
      res.send({ status: 400, message: err.message });
    });
};

export const create = async (req, res) => {
  const productId = req?.params?.id
  console.log("req?.loginUser?._id", req?.loginUser?._id)
  const match = await model.Cart.findOne(
    { userId: req?.loginUser?._id },
    // { "products": { $exists: true, $not: { $size: 0 } } }
  )
  console.log("match", match)
  if (match) {
    let index = match?.products?.findIndex((e) => {
      console.log(e?.productId.toString(), productId)
      return e?.productId.toString() === productId
    })
    if (index === -1) {
      console.log("----")
      match.products.push({ productId: productId, count: 1 })
    } else {
      console.log("=====")
      match.products[index].count += 1
    }
    console.log("---index", index)
    // console.log()
    model?.Cart?.findByIdAndUpdate(match?._id, match, { new: true }).
      then((resData) => {
        res.send({ status: 200, data: resData });
      })
      .catch((err) => {
        res.send({ status: 400, message: err.message });
      });

  } else {
    model.Cart.create(
      { userId: req?.loginUser?._id, products: [{ productId, count: 1 }] },
    ).
      then((resData) => {
        res.send({ status: 200, data: resData });
      })
      .catch((err) => {
        res.send({ status: 400, message: err.message });
      });

  }

};

export const update = (req, res) => {
  model.Cart.findByIdAndUpdate(req?.params?.id, req?.body, { new: true })
    .then((resData) => {
      res.send({ status: 200, data: resData });
    })
    .catch((err) => {
      res.send({ status: 400, message: err.message });
    });
};

export const remove = (req, res) => {
  model.Cart.findByIdAndRemove(req?.params?.id)
    .then((resData) => {
      res.send({ status: 200, message: "Delete successFully...!" });
    })
    .catch((err) => {
      res.send({ status: 400, message: err.message });
    });
};
