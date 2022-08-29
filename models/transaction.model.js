const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountTransactions = new Schema({
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
});

const Transaction = new Schema({
    accountId: {type: mongoose.Schema.Types.ObjectId, ref: "accounts"},
    accountTransactions: [AccountTransactions]
})

const transactionsInfo = mongoose.model("transactions", Transaction);

module.exports = transactionsInfo;