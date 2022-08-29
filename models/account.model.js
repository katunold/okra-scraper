const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountModel = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth"
    },
    accountNumber: {
        type: String,
        unique: true,
        required: true,
    },
    availableBalance: {
        type: Number,
        default: 0
    },
    ledgerBalance: {
        type: Number,
        default: 0
    },
    accountCurrency: {
        type: String,
        required: true
    }
})

const accountInfo = mongoose.model("accounts", AccountModel);

module.exports = accountInfo;