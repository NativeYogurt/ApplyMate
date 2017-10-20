const Nightmare = require('nightmare');

const nightmare = Nightmare({ show: true });

const big5Scraper = async (url) => {
  try {
    let selector = 'li';
    if (url.match('apple')) {
      selector = '.wrapper_job_description li';
    }
    if (url.match('amazon') || url.match('microsoft')) {
      selector = 'p';
    }
    const scraperData = await nightmare
      .goto(url)
      .wait(10000)
      .evaluate((querySelector) => {
        return [...document.querySelectorAll(querySelector)]
          .map(el => el.innerText);
      }, selector)
      .end();
    return scraperData;
  } catch (e) {
    console.error(e);
  }
};

exports.big5Scraper = big5Scraper;
