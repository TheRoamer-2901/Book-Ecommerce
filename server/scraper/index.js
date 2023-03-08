import { startBrowser } from './browser.js'
import {    
    getDetailPageList,
    scrapeDetailPage
} from './scraper.js'

const PAGE = 4
const ROOT_PAGE_URL = `https://tiki.vn/search?q=s%C3%A1ch&page=${PAGE}`;
const START = 39;
const END = 50;



async function runScraper(){
    let browserInstance = await startBrowser()    
    let pageList = await getDetailPageList(browserInstance, ROOT_PAGE_URL)


    for(let i=START; i < END; i++) {
        scrapeDetailPage(browserInstance, pageList[i])
    }


}
    
runScraper()