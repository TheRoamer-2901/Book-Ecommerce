import puppeteer from "puppeteer"

async function startBrowser() {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: false,
            args: ["--disable-setuid-sandbox"],
	        'ignoreHTTPSErrors': true,
        });
    } catch(err) {
        console.log(err)
    }
    return browser;

}

export { startBrowser }