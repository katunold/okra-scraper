async function customerProfile(page) {
    let dataObj = {};

    await page.waitForSelector('main .text-2xl')
    dataObj['customerName'] = await page.$eval('.text-2xl', text => {
        return text.textContent.split(" ").slice(2).join(" ").replace('!', "");
    });

    const address = await page.$eval("main > div > h1 ~ div > p:nth-child(1)", element => element.textContent.trim());
    dataObj['address'] = address.split(":")[1];
    const bvn = await page.$eval("main > div > h1 ~ div > p:nth-child(2)", element => element.textContent.trim());
    dataObj['bvn'] = bvn.split(":")[1];
    const phone = await page.$eval("main > div > h1 ~ div > p:nth-child(3)", element => element.textContent.trim());
    dataObj['phone'] = phone.split(":")[1];
    const email = await page.$eval("main > div > h1 ~ div > p:nth-child(4)", element => element.textContent.trim());
    dataObj['email'] = email.split(":")[1];

    return dataObj;
}

module.exports = {
    customerProfile
}