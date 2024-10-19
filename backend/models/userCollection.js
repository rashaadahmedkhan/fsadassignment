const mongoose = require('mongoose')

const userCollectionSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        }
    }
)