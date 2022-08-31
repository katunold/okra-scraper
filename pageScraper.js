const { mongoose } = require("mongoose");
require('dotenv').config();
const userProfile = require("./customer-profile");
const accounts = require("./accounts");
const accountTransactions = require("./transactions");
const user = require("./login");
const authModel = require("./models/auth-cred.model");
const accountModel = require("./models/account.model");
const transactionsModel = require("./models/transaction.model");
const customerModel = require("./models/customer.model");
const { transactionsFormatter } = require("./transactions-formatter");

const scraperObject = {
    url: 'https://bankof.okra.ng/login',

    async scraper(browser){
        const url = process.env.mongo_url
        mongoose.connect(url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error: "));
        db.once("open", function () {
            console.log(" Data base connected connected successfully 🎉");
        });

        let page = await browser.newPage();
        const auth = {email: "hijefel589@rxcay.com", password: "qwerty"};
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);

        await user.login(page, auth);

        const userAuth = new authModel(auth);
        let userDetails;

        try {
            console.log("Login credentials saving ...");
            await userAuth.save();
            console.log("Login credentials saved!");
        }catch (error) {
            if (error.code !== 11000) {
                returnError(error);
            }else {
                console.log("Login credentials already exists!");
            }
        }

        userDetails = await authModel.findOne({"email": auth.email});

        const customer = await userProfile.customerProfile(page);
        customer["userId"] = userDetails._id;

        const customerDataModel = new customerModel(customer);

        try {
            console.log("Customer profile saving ...");
            await customerDataModel.save();
            console.log("Customer profile info saved!");
        }catch (error) {
            if (error.code !== 11000) {
                returnError(error);
            }else {
                console.log("Customer profile already exists!");
            }
        }

        const account = await accounts.accountsData(page);

        for (const acc of account) {
            acc["userId"] = userDetails._id;
            const accountModelData = new accountModel(acc);
            try {
                console.log("Account data saving ...");
                await accountModelData.save();
                console.log("Account data saved!");
            }catch (error) {
                if (error.code !== 11000) {
                    returnError(error);
                }else {
                    console.log("Account already exists!");
                }
            }
        }

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

        for (const transaction of transactions) {
            const transactionsArray = []
            const accountNumber = Object.keys(transaction);
            const transactionsData = transaction[accountNumber];
            const account = await accountModel.findOne({accountNumber}).exec();

            transactionsData.forEach(transaction => {
                const transactionsObj = {
                    accountId: account._id,
                    ...transaction
                }
                transactionsArray.push(new transactionsModel(transactionsObj))
            })

            try {
                console.log("Account transactions data saving ...");
                await Promise.all(transactionsArray.map(async transaction => await transaction.save()))
                console.log("Account transactions data saved!");
            }catch (error) {
                returnError(error);
            }

        }

        // Scrape logout functionality
        await page.click('nav > div > a ~ a');

        await page.close();

        console.log("🎉🎊 Scraping completed successfully 🎉🎊");

        process.exit();

        function returnError(error) {
            console.log("Error : ", error);
        }

    }


}

module.exports = scraperObject;