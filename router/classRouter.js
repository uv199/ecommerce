const express = require("express")
const classRouter = express.Router()

const Class = require("../models/class.js")
// post

classRouter.post('/create', async (req, res) => {
    try {
        console.log("---====")
        const data = await Class.create(req.body)
        res.send(data)

    } catch (error) {
        console.log(error);
    }
})

module.exports = classRouter
