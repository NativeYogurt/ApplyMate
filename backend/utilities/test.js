const Nightmare = require('nightmare');
const nightmare = Nightmare({show: true});

//works for google

const goToInitialPage = async () => {
  try {
    const iframeURL = await nightmare
      .goto('https://www.facebook.com/careers/jobs/a0I1200000LT0PkEAL/')
      //.goto('https://careers.google.com/jobs#!t=jo&jid=/google/software-engineer-345-spear-st-san-francisco-ca-usa-2683110138&f=true&')
      .wait(10000)
      .evaluate(() => {
        return [...document.querySelectorAll('li')]
          .map(el => el.innerText);
      })
    console.log(iframeURL);
    } catch (e) {
      console.error(e);
  }
};

goToInitialPage();
