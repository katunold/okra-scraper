async function login(page, auth) {

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
}

module.exports = { login }