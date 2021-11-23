const fs = require('fs')
var arr = fs.readFileSync('./posts.txt', 'utf-8').split('\n')

const post = arr[0];


module.exports = async function createPosts(page){
    const query = "What's on your mind?";
    const query2 = "Post"
    try {
        page.evaluate(query=> {
            const elements =  [...document.querySelectorAll('.touch ._4g34 ._5xu4')];
            console.log(elements.length);
            const targetElement = elements.find(e=>e.innerText.includes(query));
            targetElement.click()
        }, query)      
    } catch (error) {
     console.log(error.message);   
    }

      await page.waitForNavigation();
      
      try {
          await page.type(".touch ._6-l._3iyw .composerInput", post, { delay: 30 });
          page.evaluate(query2=> {
            const elements2 =  [...document.querySelectorAll('._56bw._26vk ._55sr')]
            const targetElement2 = elements2.find(e=>e.innerText.includes(query2));
            targetElement2.click();
        }, query2)
        page.on('dialog', async dialog => {
            await dialog.accept();
        });
        
         
          await page.waitForNavigation();
          console.log("Posting Succesfull ... ");          
      } catch (error) {
          console.log(error.message);
      }


 
        
}


