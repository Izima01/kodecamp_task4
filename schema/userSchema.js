const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role : {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true });

const userCollection = model('users', userSchema);

module.exports = userCollection;