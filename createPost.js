const puppeteer = require('puppeteer');
const login = require('./middlewares/login')
const createPosts = require('./core-scraper/createPosts')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/facebook-data', {useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log(err.message))


async function createPostsCollection(){


    

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--disable-notifications"]
    });

        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(100000)

    // LOGING IN TO A FACEBOOK ACCOUNT --- //
    try {
            await login(page)
        } catch (error) {
            return console.log(error.message)
        }
    try {
        await createPosts(page)
    } catch (error) {
        return console.log(error.message);
    }        
    
}

createPostsCollection()