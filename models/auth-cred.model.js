const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerModel = new Schema({
    address: {
        type: String,
        required: true,
    },
    bvn: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const AuthCredModel = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    profile: CustomerModel
})

const Auth = mongoose.model("auth", AuthCredModel);

module.exports = Auth;