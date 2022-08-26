const userProfile = require("./customer-profile")

const scraperObject = {
    url: 'https://bankof.okra.ng/login',

    async scraper(browser){
        let page = await browser.newPage();
        const auth = {email: "hijefel589@rxcay.com", password: "qwerty"};
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);

        await page.type("#email", auth.email);
        await page.type("#password", auth.password);
        await page.click("button");

        await page.on("dialog", async dialog => {
            await dialog.accept();
        })

        await page.waitForNavigation({waitUntil: "domcontentloaded"});

        await page.type("#otp", "12345");
        await page.click("button");

        await page.waitForNavigation({waitUntil: "networkidle0"});

        const customer = await userProfile.customerProfile(page);

        page.close();
    }
}

module.exports = scraperObject;