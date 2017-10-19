const Nightmare = require('nightmare');
const nightmare = Nightmare({show: true});

//works for google
//apple needs .wrapper_job_description in the return statement


const goToInitialPage = async () => {
  try {
    const iframeURL = await nightmare
      .goto('https://jobs.apple.com/us/search?#function&t=0&sb=req_open_dt&so=1&j=SFWEG&lo=0*USA&pN=0&openJobId=113138626')
      //.goto('https://careers.google.com/jobs#!t=jo&jid=/google/software-engineer-345-spear-st-san-francisco-ca-usa-2683110138&f=true&')
      .wait(10000)
      .evaluate(() => {
        return [...document.querySelectorAll('li')]
          .map(el => el.innerText);
      })
      .end();
    console.log(iframeURL);
    } catch (e) {
      console.error(e);
  }
};

goToInitialPage();
