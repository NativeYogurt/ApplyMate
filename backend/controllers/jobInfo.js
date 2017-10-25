const axios = require('axios');
// expecting req.body.searchTerm
const request = require('request');
const Twit = require('twit');

exports.BBB = (req, res) => {
  axios.get('https://api.bbb.org/api/orgs/search', {
    params: { primaryOrganizationName: req.body.searchTerm },
    headers: { Authorization: `Bearer ${process.env.BBB_TOKEN}` },
  })
    .then(data => {
      if (data.data.SearchResults.find(el => {
        return el.OrganizationName === req.body.searchTerm;
      }) !== undefined) {
        res.send(data.data.SearchResults.find(el => {
          return el.OrganizationName === req.body.searchTerm;
        }));
      } else {
        res.send(data.data.SearchResults[0]);
      }
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
      if (data.data.SearchResults.find(el => {
        return el.OrganizationName === req.body.searchTerm;
      }) !== undefined) {
        res.send(data.data.SearchResults.find(el => {
          return el.OrganizationName === req.body.searchTerm.BusinessURLs[0];
        }));
      } else {
        res.send(data.data.SearchResults[0]);
      }
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
exports.EDGAR = (req, res) => {
  axios.get(`http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=${req.body.searchTerm}&lang=en`)
    .then(result => {
      const Symbols = result.data.ResultSet.Result;
      console.log('length', Symbols.length)
      if (Symbols.length === 0) return res.send('This Company is not publically traded');

      function edgarCall(i) {
        console.log('i', i);
        axios.get('http://edgaronline.api.mashery.com/v2/corefinancials/qtr', {
          params: {
            primarysymbols: Symbols[i].symbol,
            appkey: process.env.EDGAR_KEY,
          },
        })
          .then(data => {
            if (data.data.result.totalrows !== 0) {
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
              return res.send(array);
            } else if (++i <= Symbols.length) {
              setTimeout(() =>{
                edgarCall(i);
              }, 500)
            }
          })
          .catch(err => {
            console.error(err);
            return res.send(err);
          });
      }
      edgarCall(0)
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
  const T = new Twit({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token: process.env.TWITTER_TOKEN,
    access_token_secret: process.env.TWITTER_TOKENSECRET,
  });
  const params = {
    screen_name: req.body.searchTerm,
    count: 5,
    exclude_replies: true,
  };
  T.get('statuses/user_timeline', params, (err, tweets, response) => {
    const arr = [];
    for (let i = 0; i < tweets.length; i++) {
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
