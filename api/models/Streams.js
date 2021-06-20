const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Stream = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        userId:{type:String}
    }
)

module.exports = mongoose.model('Stream', Stream)
