const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerModel = new Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "auth"},
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


const Auth = mongoose.model("customer", CustomerModel);

module.exports = Auth;