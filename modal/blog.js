const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: { type: String },
    description: { type: String },
    tags: { type: [String] },
    fileUpload: { type: String },
    upvote: {
        type: Number,
        default: 0,
    },
    creator: { type: String },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

module.exports = mongoose.model('blog', blogSchema);