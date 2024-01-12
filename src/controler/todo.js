import { model } from "../models";

export const createTodo = (req, res) => {
  model.Todo.create(req?.body)
    .then((resData) => {
      res.send({ status: 200, data: resData });
    })
    .catch((err) => {
      res.send({ status: 400, message: err.message });
    });
};

export const getTodoById = (req, res) => {
  model.Todo.findById(req?.params?.id)
    .populate({ path: "productId" })
    .then((resData) => {
      res.send({ status: 200, data: resData });
    })
    .catch((err) => {
      res.send({ status: 400, message: err.message });
    });
};

export const updateTodo = (req, res) => {
  model.Todo.findByIdAndUpdate(req?.params?.id, req?.body, { new: true })
    .then((resData) => {
      res.send({ status: 200, data: resData });
    })
    .catch((err) => {
      res.send({ status: 400, message: err.message });
    });
};

export const deleteTodo = (req, res) => {
  model.Todo.findByIdAndRemove(req?.params?.id)
    .then((resData) => {
      res.send({ status: 200, message: "Delete successFully...!" });
    })
    .catch((err) => {
      res.send({ status: 400, message: err.message });
    });
};
