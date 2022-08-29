function transactionsFormatter(transactions) {
    let transactionsData = []

    let count = 0

    while (count<transactions.length) {
        let trackCount = count;
        transactionsData.push({
            type: transactions[trackCount],
            clearedDate: transactions[trackCount+1],
            description: transactions[trackCount+2],
            amount: transactions[trackCount+3].slice(1),
            beneficiary: transactions[trackCount+4],
            sender: transactions[trackCount+5]
        })

        count+=6;
    }

    return transactionsData
}

module.exports = {
    transactionsFormatter
}