const Nightmare = require('nightmare');

let nightmare;

const goToInitialPage = async (url) => {
  try {
    const iframeURL = await nightmare
      .goto(url)
      .wait(5000)
      .evaluate(() => {
        return [...document.querySelectorAll('iframe')]
          .map(el => el.src);
      });
    return iframeURL[0];
  } catch (e) {
    console.error(e);
  }
};

const scrapeIframe = async (url) => {
  try {
    nightmare = Nightmare();
    const secondUrl = await goToInitialPage(url);
    if (!secondUrl) {
      console.log('no url');
      await nightmare
        .end();
      return [];
    }
    const data = await nightmare
      .goto(secondUrl)
      .wait()
      .evaluate(() => {
        return [...document.querySelectorAll('li')]
          .map(el => el.innerText);
      })
      .end();
    return data;
  } catch (e) {
    console.error(e);
  }
};

exports.scrapeIframe = scrapeIframe;
