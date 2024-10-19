const mongoose = require('mongoose')

const bookCollectionSchema = mongoose.Schema(
    {
        bookId: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        condition: {
            type: String,
            required: true
        },
        availability: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const bookCollection = mongoose.model('bookCollection', bookCollectionSchema)

module.exports = bookCollection