const Nightmare = require('nightmare');
const nightmare = Nightmare({show: true});

const goToInitialPage = async () => {
  try {
    const iframeURL = await nightmare
      .goto('http://grnh.se/5ocetf1')
      //.goto('https://careers.google.com/jobs#!t=jo&jid=/google/software-engineer-345-spear-st-san-francisco-ca-usa-2683110138&f=true&')
      .wait('iframe')
      .evaluate(() => {
        return [...document.querySelectorAll('iframe')]
          .map(el => el.src);
      })
    return iframeURL[0];
    } catch (e) {
      console.error(e);
  }
};

const scrapeIframe = async () => {
  try {
    const url = await goToInitialPage();
    console.log(url)
    const data = await nightmare
      .goto(url)
      .wait()
      .evaluate(() => {
        return [...document.querySelectorAll('li')]
        .map(el => el.innerText);;
      })
      .end();
    console.log('madeit',data);
    return data
    } catch (e) {
      console.error(e);
  }
};

scrapeIframe();
