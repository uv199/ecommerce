const express = require("express")
const userRouter = express.Router()

const User = require("../models/user")
const user = require("../models/user")

userRouter.get('/', async (req, res) => {
  try {
    const data = await user.find()
    res.send(data)
  } catch (error) {
    console.log(error);
  }
})


// post

userRouter.post('/create', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.send(user)
  } catch (error) {
    console.log(error);
  }
})

// Update


userRouter.put('/update/:id', async (req, res) => {
  try {
    const updatedData = await User.findByIdAndUpdate(
      req.params.id,
      req.body
      , { new: true }
    );
    res.send(updatedData);
  } catch (error) {
    res.send(error);
  }
});


// delete user

userRouter.delete('/delete/:id', async (req, res) => {
  console.log("🚀 ~ file: userRouter.js:29 ~ userRouter.put ~ req.params.id,:", req.params.id,)
  try {
    const deletedData = await User.findByIdAndDelete(req.params.id);   // params for send data in URL
    res.send(deletedData);
  } catch (error) {
    res.send(error);
  }
});

module.exports = userRouter

