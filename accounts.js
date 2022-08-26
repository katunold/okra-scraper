async function accountsData(page) {
    let accountsData = await page.$$eval('main > section > section', accounts => {
        accounts = accounts.map(el => {
            const accountNumber = el.querySelector('div > a').href.split("-")[1];
            const availableBalanceData = el.querySelector('div > p').textContent.split(" ");
            const ledgerBalance = el.querySelector('div > p ~ p').textContent.split(" ")[1];
            const accountCurrency = availableBalanceData[0];
            const availableBalance = availableBalanceData[1];
            return {
                accountNumber: accountNumber,
                availableBalance: availableBalance,
                accountCurrency: accountCurrency,
                ledgerBalance: ledgerBalance
            };
        });
        return accounts
    })

    return accountsData
}

module.exports = {
    accountsData
}