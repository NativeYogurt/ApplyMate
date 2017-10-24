const axios = require('axios');
// expecting req.body.searchTerm
const request = require('request');
const Twitter = require('twitter');

exports.BBB = (req, res) => {
  axios.get('https://api.bbb.org/api/orgs/search', {
    params: { primaryOrganizationName: req.body.searchTerm },
    headers: { Authorization: `Bearer ${process.env.BBB_TOKEN}` },
  })
    .then(data => {
      res.send(data.data.SearchResults[0]);
    })
    .catch(err => {
      console.error(err);
      res.send(err);
    });
};
exports.getCompanyUrl = (req, res) => {
  axios.get('https://api.bbb.org/api/orgs/search', {
    params: { primaryOrganizationName: req.body.searchTerm },
    headers: { Authorization: `Bearer ${process.env.BBB_TOKEN}` },
  })
    .then(data => {
      res.send(data.data.SearchResults[0].BusinessURLs[0]);
    })
    .catch(err => {
      console.error(err);
      res.send(err);
    });
};
exports.Glassdoor = (req, res) => {
  axios.get('http://api.glassdoor.com/api/api.htm', {
    params: {
      v: 1,
      format: 'json',
      't.p': process.env.GLASSDOOR_ID,
      't.k': process.env.GLASSDOOR_KEY,
      userip: '144.121.106.166',
      useragent: 'Mozilla/%2F4',
      action: 'employers',
      q: req.body.searchTerm,
    },
  })
    .then(data => {
      res.send(data.data);
    })
    .catch(err => {
      console.error(err);
      res.send(err);
    });
};

exports.getStockSymb = (req, res) => {
  axios.get(`http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=${req.body.searchTerm}&lang=en`)
    .then(result => res.send(result.data.ResultSet.Result));
};

exports.EDGAR = (req, res) => {
  axios.get('http://edgaronline.api.mashery.com/v2/corefinancials/qtr', {
    params: {
      primarysymbols: req.body.searchTerm,
      appkey: process.env.EDGAR_KEY,
    }
  })
    .then(data => {
      const arr = [];
      const array = [];
      for (let i = 0; i < data.data.result.totalrows; i++) {
        arr.push(data.data.result.rows[i].values.filter((item, ind) => {
          if (item.field === 'totalrevenue' || item.field === 'researchdevelopmentexpense' || item.field === 'periodenddate' || item.field === 'incomebeforetaxes') {
            return item.value;
          }
        }));
      }
      for (let i = 0; i < arr.length; i++) {
        const temp = [];
        for (let j = 0; j < arr[i].length; j++) {
          temp.push(`${arr[i][j].field}: ${arr[i][j].value}`);
        }
        array.push(temp);
      }
      res.send(array);
    })
    .catch(err => {
      console.error(err);
      res.send(err);
    });
};
exports.fullContact = (req, res) => {
  axios({
    method: 'GET',
    url: 'https://api.fullcontact.com/v2/company/lookup.json',
    params: {
      domain: req.body.searchTerm,
      apiKey: process.env.FULLCONTACT_APIKEY,
    },
  })
    .then(data => {
      const obj = {};
      obj.name = data.data.organization.name;
      obj.employees = data.data.organization.approxEmployees;
      obj.founded = data.data.organization.founded;
      obj.twitter = data.data.socialProfiles.find((el) => { return el.typeId === 'twitter'; });
      obj.facebook = data.data.socialProfiles.find((el) => { return el.typeId === 'facebook'; });
      obj.linkedIn = data.data.socialProfiles.find((el) => { return el.typeId === 'linkedincompany'; });
      obj.angellist = data.data.socialProfiles.find((el) => { return el.typeId === 'angellist'; });
      res.send(obj);
    })
    .catch(err => alert(err));
};
exports.Twitter = (req, res) => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token_key: process.env.TWITTER_TOKEN,
    access_token_secret: process.env.TWITTER_TOKENSECRET,
  });
  const params = {
    screen_name: req.body.searchTerm,
    count: 7,
    exclude_replies: true,
  };
  client.get('statuses/user_timeline', params, (err, tweets, response) => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      const obj = {};
      obj.time = tweets[i].created_at;
      obj.text = tweets[i].text;
      obj.url = tweets[i].entities.urls[0].expanded_url;
      obj.retweet = tweets[i].retweet_count;
      obj.favorite = tweets[i].favorite_count;
      arr.push(obj);
    }
    res.send(arr);
  });
};
