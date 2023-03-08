import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import {
    formatPrice,
    formatDiscount,
    formatAuthor
}  from './utils.js'

async function getDetailPageList(browser, url) {
    let browserInstance = await browser;
    try {
        let page = await browserInstance.newPage();
        await page.goto(url)
        await page.waitForSelector("div.inner")
        let pageDetailList  = 
            await page.$$eval('a.product-item', products => {
                return products.map(prod => prod.href)
            })
        await page.close()
        return pageDetailList;
    } catch(err) {
        console.log(err);
    }
        
}

async function scrapeDetailPage(browser, url) {
    let browserInstance = await browser;
    try{
        let detailPage = await browserInstance.newPage();
        await detailPage.goto(url)   
        await detailPage.waitForSelector('main')
        let dataObject = {};
        dataObject['name'] = await detailPage.$eval("h1.title", title => title.textContent)
        dataObject['author'] = await detailPage.$eval(".brand-and-author", author => author.textContent)
        dataObject['price'] = await detailPage.$eval(".product-price__list-price", price => price.textContent)
        dataObject['discountRate'] = await detailPage.$eval(".product-price__discount-rate", discount => discount.textContent)
        dataObject['img'] = await detailPage.$eval(".group-images img", img => img.src)
        // dataObject['seller'] = await detailPage.$eval(".seller-name span", seller => seller.textContent)

        dataObject['price'] = formatPrice(dataObject['price'])
        dataObject['discountRate'] = formatDiscount(dataObject['discountRate'])
        dataObject['author'] = formatAuthor(dataObject['author'])

        const newProd = await prisma.product.create({
            data: dataObject
        })
        

        console.log(dataObject);
        await detailPage.close()
    } catch(err){
        console.log(err);
    }
}

export {
    getDetailPageList,
    scrapeDetailPage,
}

