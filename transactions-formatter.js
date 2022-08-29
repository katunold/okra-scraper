function transactionsFormatter(transactions) {
    let transactionsData = []
    // for (let count = 0; count < transactions.length; count+6 ) {
    //     let trackCount = count;
    //     transactionsData.push({
    //         type: transactions[trackCount],
    //         clearedDate: transactions[trackCount+1],
    //         description: transactions[trackCount+2],
    //         amount: transactions[trackCount+3],
    //         beneficiary: transactions[trackCount+4],
    //         sender: transactions[trackCount+5]
    //     })
    //
    // }
    let count = 0

    while (count<transactions.length) {
        let trackCount = count;
        transactionsData.push({
            type: transactions[trackCount],
            clearedDate: transactions[trackCount+1],
            description: transactions[trackCount+2],
            amount: transactions[trackCount+3],
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