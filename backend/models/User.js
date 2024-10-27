const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "please enter an email."],
        unique: true,
        lowercase: true,
        validate: [(isEmail) => {}, 'please enter a vaild email.']
    },
    password: {
        type: String,
        required: [true, "please enter a password."],
        minlength: [4, "please enter a password > 4 characters."]
    }
})

// function before user saved to db
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model('user', userSchema)

module.exports = User