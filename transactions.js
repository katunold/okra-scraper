async function transactions(page, browser) {

    await page.waitForSelector("section table tbody tr", { waitUntil: "domcontentloaded" });
    let entriesSize = await page.$eval("main section div span span:nth-child(3)", text => text.textContent);
    let rawTransactionData = await page.$$eval("main table tbody tr .px-6", text => text.map( item => item.textContent ));
    if ((rawTransactionData.length/6) < entriesSize) {
        await page.click("main section div button ~ button")
        await loadNextData()
    }

    async function loadNextData(){
        await page.waitForSelector("section table tbody tr", { waitUntil: "domcontentloaded" });
        const data = await page.$$eval('main table tbody tr .px-6', text => text.map( item => item.textContent ))
        rawTransactionData = [...rawTransactionData, ...data];

        if ((rawTransactionData.length/6) < entriesSize) {
            await page.click("main section div button ~ button");
            await loadNextData()
        }
    }

    return rawTransactionData;
}

module.exports = { transactions }