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
exports.yahoo = (req, res) => {
  axios.get(`http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=${req.body.searchTerm}&lang=en`)
    .then(result => {
      const Symbols = result.data.ResultSet.Result;
      if (Symbols.length === 0) {
        return res.send('This Company is not publically traded.');
      } res.send(Symbols);
    });
};

exports.EDGAR = (req, res) => {
  axios.get(`http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=${req.body.searchTerm}&lang=en`)
    .then(result => {
      const Symbols = result.data.ResultSet.Result;
      if (Symbols.length === 0) return res.send('This Company is not publically traded.');

      function edgarCall(i) {
        axios.get('http://edgaronline.api.mashery.com/v2/corefinancials/qtr', {
          params: {
            primarysymbols: Symbols[i].symbol,
            appkey: process.env.EDGAR_KEY,
          },
        })
          .then(data => {
            const obj = {
              period: [],
              income: [],
              RD: [],
              rev: [],
            };
            if (data.data.result.totalrows !== 0) {
              const arr = [];
              const array = [];
              for (let i = 0; i < data.data.result.totalrows; i++) {

                arr.push(data.data.result.rows[i].values.filter(item => {
                  if (!obj.symb) {
                    if (item.field === 'primarysymbol') obj.symb = item.value;
                  }
                  if (!obj.companyName) {
                    if (item.field === 'companyname') obj.companyName = item.value;
                  }
                  if (item.field === 'totalrevenue' || item.field === 'researchdevelopmentexpense' || item.field === 'periodenddate' || item.field === 'incomebeforetaxes') {
                    return item.value;
                  }
                }));
              }
              for (let i = 0; i < arr.length; i++) {
                obj.period.push(arr[i][0].value);
                obj.income.push(arr[i][1].value);
                obj.RD.push(arr[i][2].value);
                obj.rev.push(arr[i][3].value);
              }
              obj.period.reverse();
              obj.income.reverse();
              obj.RD.reverse();
              obj.rev.reverse();
              return res.send(obj);
            } else if (++i <= Symbols.length) {
              setTimeout(() => {
                edgarCall(i);
              }, 500);
            }
          })
          .catch(err => {
            console.error(err);
            return res.send(err);
          });
      }
      edgarCall(0);
    })
    .catch(err => {
      console.error(err);
      res.send(err);
    });
};
exports.fullContact = (req, res) => {
  // TEST DATA BELOW
  if (req.body.searchTerm === 'google.com') res.send(FCGoogle);

//   axios({
//     method: 'GET',
//     url: 'https://api.fullcontact.com/v2/company/lookup.json',
//     params: {
//       domain: req.body.searchTerm,
//       apiKey: process.env.FULLCONTACT_APIKEY,
//     },
//   })
//     .then(data => {
//       const obj = {};
//       obj.name = data.data.organization.name;
//       obj.employees = data.data.organization.approxEmployees;
//       obj.founded = data.data.organization.founded;
//       obj.twitter = data.data.socialProfiles.find((el) => { return el.typeId === 'twitter'; });
//       obj.facebook = data.data.socialProfiles.find((el) => { return el.typeId === 'facebook'; });
//       obj.linkedIn = data.data.socialProfiles.find((el) => { return el.typeId === 'linkedincompany'; });
//       obj.angellist = data.data.socialProfiles.find((el) => { return el.typeId === 'angellist'; });
//       res.send(obj);
//     })
//     .catch(err => alert(err));
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
    if (tweets[0]) {
      for (let i = 0; i < tweets.length; i++) {
        const obj = {};
        obj.time = tweets[i].created_at;
        obj.retweet = tweets[i].retweet_count;
        obj.favorite = tweets[i].favorite_count;
        // there was an attempt...
        // if (tweets[i].text.slice(0, tweets[i].text.lastIndexOf('http') !== -1)) {
        //   obj.text = tweets[i].text.slice(0, tweets[i].text.lastIndexOf('http'));
        //   obj.url = tweets[i].text.slice(tweets[i].text.lastIndexOf('http'));
        // } else {
        //   obj.text = tweets[i].text;
        //   obj.url = `twitter.com/${req.body.searchTerm}`
        // }
        obj.text = tweets[i].text;
        arr.push(obj);
      }
      arr[0].url = `www.twitter.com/${tweets[0].user.screen_name}`;
      arr[0].pic = tweets[0].user.profile_banner_url;
      res.send(arr);
    }
  });
};

exports.Tradier = (req, res) => {
  axios.get(`http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=${req.body.searchTerm}&lang=en`)
    .then(result => {
      const Symbols = result.data.ResultSet.Result;
      if (Symbols.length === 0) return res.send('This Company is not publically traded.');
      axios.get('https://sandbox.tradier.com/v1/markets/history', {
        params: {
          symbol: Symbols[1].symbol,
          interval: 'weekly',
        },
        headers: {
          authorization: 'Bearer Eg1eYOgU1Kk7aGcyAYt4Cip57K2f',
          accept: 'application/json',
        },
      })
        .then(response => res.send(response.data))
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
};

const FCGoogle = {
  status: 200,
  requestId: 'a93ca84c-9b59-4c8b-84d7-fd3c1274cef1',
  category: [
    {
      code: 'OTHER',
      name: 'Other',
    },
  ],
  logo: 'https://d2ojpxxtu63wzl.cloudfront.net/static/b560062037213e5dd697ef328cecdd3c_9c5671e1cd34db87e3d8bbfb230555c37b4572c9769d40c5eb04b6233b0e2a57',
  website: 'http://www.google.com',
  languageLocale: 'en',
  onlineSince: '1997-09-15',
  industries: [
    {
      type: 'NAICS',
      name: 'Wired Telecommunications Carriers',
      code: '517110',
    },
    {
      type: 'NAICS',
      name: 'Offices Of Other Holding Companies',
      code: '551112',
    },
    {
      type: 'SIC',
      name: 'Holding Companies, Nec',
      code: '6719',
    },
    {
      type: 'SIC',
      name: 'Communication Services, Nec',
      code: '4899',
    },
    {
      type: 'SIC',
      name: 'Computers, Peripherals, and Software',
      code: '5045',
    },
    {
      type: 'SIC',
      name: 'Computer Integrated Systems Design',
      code: '7373',
    },
  ],
  organization: {
    name: 'Google Inc.',
    approxEmployees: 54604,
    founded: '1998',
    overview: 'Google’s mission is to organize the world’s information and make it universally accessible and useful.',
    contactInfo: {
      phoneNumbers: [
        {
          number: '650-253-0000',
          label: 'other',
        },
      ],
      addresses: [
        {
          addressLine1: '1600 Amphitheatre Parkway',
          locality: 'Mountain View',
          region: {
            name: 'California',
          },
          country: {
            name: 'United States',
          },
          postalCode: '94043',
          label: 'work',
        },
      ],
    },
    links: [
      {
        url: 'https://en-gb.facebook.com/googlechrome/about',
        label: 'facebook',
      },
      {
        url: 'http://www.google.com',
        label: 'other',
      },
      {
        url: 'http://www.crunchbase.com/organization/',
        label: 'crunchbasecompany',
      },
    ],
    images: [
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/0c679961448ebd7a306a46fc146ddde9_be5ddde7b929b237e67e61a2d0ec2d9ae81fbaef8855b017b9fc484a8c67137d',
        label: 'facebook',
      },
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/49feaccd430ad2f7a0936af2113bbeee_c0b8803dbed799f866c5bb1b85d72a982f56612388542671e22ea246ee02da0f',
        label: 'twitter',
      },
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/083b72cc2d980493f79f4fc597712599_e08a882b04254ab7646a54dd15818d304896b2f97950eec6ce828979f418f177',
        label: 'favicon',
      },
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/b820c6d0ce48130e293f6d0d4f0d5985_b204cad399f14f275bae3d2d783c326e3b05e8a066f84fa92a292dc9df85f5d5',
        label: 'other',
      },
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/8d6ba63f40ceca896a7f7f46d569ed24_a0ff0032b9bbf080f0e62f3e19e7765e6fba8f11099dfac4514f3ce1ba735ef3',
        label: 'other',
      },
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/2a5560c1fccd36bdf4d9b3e8b99d971b_38711e0ad5effbd08b5e06e56fbe8faf9f87389f68929b671bd7b2a7d837b58f',
        label: 'other',
      },
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/bcdf9d5a32fc4ef4205c9e7061e42ded_61782b0d1be18d8d26b0d0558959154035515268259e34ba142709a49e32a19a',
        label: 'logo',
      },
    ],
    keywords: [
      'Email',
      'Internet',
      'Maps',
      'Mountain View',
      'Search',
      'Software',
    ],
  },
  socialProfiles: [
    {
      typeId: 'facebook',
      typeName: 'Facebook',
      url: 'https://www.facebook.com/Google',
    },
    {
      bio: 'News and updates from Google',
      followers: 12181689,
      following: 447,
      typeId: 'twitter',
      typeName: 'Twitter',
      url: 'https://twitter.com/google',
      username: 'google',
      id: '20536157',
    },
    {
      bio: 'Google’s mission is to organize the world’s information and make it universally accessible and useful.',
      followers: 8946,
      typeId: 'angellist',
      typeName: 'AngelList',
      url: 'https://angel.co/google',
      username: 'google',
      id: '32203',
    },
    {
      bio: 'Google is a multinational corporation that is specialized in internet-related services and products.',
      typeId: 'crunchbasecompany',
      typeName: 'CrunchBase',
      url: 'http://www.crunchbase.com/organization/google',
      username: 'google',
    },
    {
      typeId: 'google',
      typeName: 'GooglePlus',
      url: 'https://plus.google.com/+google',
      username: 'google',
    },
    {
      typeId: 'linkedincompany',
      typeName: 'LinkedIn',
      url: 'https://www.linkedin.com/company/google',
      username: 'google',
    },
    {
      typeId: 'owler',
      typeName: 'Other',
      url: 'https://www.owler.com/iaApp/100651/google-company-profile',
      username: 'google',
      id: '100651',
    },
  ],
  traffic: {
    topCountryRanking: [
      {
        rank: 1,
        locale: 'us',
      },
      {
        rank: 3,
        locale: 'in',
      },
      {
        rank: 10,
        locale: 'cn',
      },
    ],
    ranking: [
      {
        rank: 1,
        locale: 'global',
      },
      {
        rank: 1,
        locale: 'us',
      },
    ],
  },
};
