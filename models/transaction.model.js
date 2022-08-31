const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Transaction = new Schema({
    accountId: {type: mongoose.Schema.Types.ObjectId, ref: "accounts"},
    type: {
        type: String
    },
    clearedDate: {
        type: Date
    },
    description: {
        type: String
    },
    amount: {
        type: Number,
        default: 0
    },
    beneficiary: {
        type: String
    },
    sender: {
        type: String
    }
})

const transactionsInfo = mongoose.model("transaction", Transaction);

module.exports = transactionsInfo;