const userProfile = require("./customer-profile");
const accounts = require("./accounts");
const accountTransactions = require("./transactions");
const user = require("./login");
const { transactionsFormatter } = require("./transactions-formatter");

const scraperObject = {
    url: 'https://bankof.okra.ng/login',

    async scraper(browser){
        let page = await browser.newPage();
        const auth = {email: "hijefel589@rxcay.com", password: "qwerty"};
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);

        await user.login(page, auth);

        // await page.waitForNavigation({waitUntil: "networkidle0"});


        const customer = await userProfile.customerProfile(page);


        const account = await accounts.accountsData(page);

        let aTags = await page.$$('section a');
        let transactions = [];



        for (const aTag in aTags) {
            let viewTransactionPage = await browser.newPage();
            await viewTransactionPage.goto(this.url);
            await user.login(viewTransactionPage, auth);
            let tags = await viewTransactionPage.$$('section a');
            await tags[aTag].click();
            let transactionsData = await accountTransactions.transactions(viewTransactionPage);
            transactionsData = transactionsFormatter(transactionsData);
            let accountTransactionsObj = {}

            accountTransactionsObj[account[aTag].accountNumber] = transactionsData;

            transactions.push(accountTransactionsObj);
            viewTransactionPage.close();
        }

        // Scrape logout functionality
        await page.click('nav > div > a ~ a');

        await page.close()

    }
}

module.exports = scraperObject;