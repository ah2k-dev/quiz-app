const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const courseSchema = Schema({
    name: {
        type: String,
        required: true
    },
    creditHrs: {
        type: Number,
        required:true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'teacher',
        required: true,
    },
    students: {
        type: [Schema.Types.ObjectId],
        ref: 'student'
    }
})

const course = mongoose.model("course", courseSchema);

module.exports = course;