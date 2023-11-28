const mongoose = require('mongoose')

const classSchema = mongoose.Schema({

    student: {
        type: String,
        required: [true, "Please enter student name"]
    },
    timeTableId: {
        type: String,
        required: [true, "Please enter timeTable Id "]
    },
    teacherId: {
        type: String,
        required: [true, "Please enter teacher Id "]
    },
    className: {
        type: String,
        required: [true, "Please enter class name"]
    },
    grade: {
        type: String,
        required: [true, "Please enter grade "]
    }
})


module.exports = new mongoose.model('Class', classSchema)