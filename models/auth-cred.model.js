const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthCredModel = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

const Auth = mongoose.model("auth", AuthCredModel);

module.exports = Auth;