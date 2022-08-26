const scraperObject = {
    url: 'https://bankof.okra.ng/login',

    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);

        await page.type("#email", "hijefel589@rxcay.com");
        await page.type("#password", "qwerty");
        await page.click("button");

        await page.on("dialog", async dialog => {
            await dialog.accept();
        })

        await page.waitForNavigation({waitUntil: "domcontentloaded"});

        await page.type("#otp", "12345");
        await page.click("button");

        // await page.goto("https://bankof.okra.ng/dashboard");
    }
}

module.exports = scraperObject;