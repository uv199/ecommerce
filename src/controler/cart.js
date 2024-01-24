import { VirtualAgent } from "twilio/lib/twiml/VoiceResponse";
import { model } from "../models";

export const getall = (req, res) => {
  model.Cart.find({ userId: req?.loginUser?.id })
    .populate([{ path: "products.productId" }])
    .then((resData) => {
      let data = resData?.[0];
      res.send({ status: 200, data: data?.products, cartId: data?._id });
    })
    .catch((err) => {
      res.send({ status: 400, message: err.message });
    });
};

export const create = async (req, res) => {
  const productId = req?.params?.id;
  const match = await model.Cart.findOne(
    { userId: req?.loginUser?.id }
    // { "products": { $exists: true, $not: { $size: 0 } } }
  );
  if (match) {
    let index = match?.products?.findIndex((e) => {
      console.log(e?.productId.toString(), productId);
      return e?.productId.toString() === productId;
    });
    if (index === -1) {
      match.products.push({ productId: productId, count: 1 });
    } else {
      match.products[index].count += 1;
    }
    model?.Cart?.findByIdAndUpdate(match?._id, match, { new: true })
      .then((resData) => {
        res.send({ status: 200, data: resData });
      })
      .catch((err) => {
        res.send({ status: 400, message: err.message });
      });
  } else {
    model.Cart.create({
      userId: req?.loginUser?.id,
      products: [{ productId, count: 1 }],
    })
      .then((resData) => {
        res.send({ status: 200, data: resData });
      })
      .catch((err) => {
        res.send({ status: 400, message: err.message });
      });
  }
};

export const update = (req, res) => {
  let { _id, productId, isRemove } = req?.body;
  let update = isRemove
    ? { $pull: { products: { productId } } }
    : { $inc: { "products.$.count": -1 } };

  model.Cart.findOneAndUpdate(
    { _id, "products.productId": productId },
    update,
    { new: true }
  )
    .populate({ path: "products.productId" })
    .then((resData) => {
      res.send({ status: 200, data: resData?.products, cartId: resData?._id });
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
