const axios = require('axios');
// expecting req.body.searchTerm
const request = require('request');
const Twit = require('twit');

// BBB in the end was just too inconsistent to use.
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
              if (arr[0].length === 4) {
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
              }
              if (arr[0].length === 3) {
                for (let i = 0; i < arr.length; i++) {
                  obj.period.push(arr[i][0].value);
                  obj.income.push(arr[i][1].value);
                  obj.rev.push(arr[i][2].value);
                }
                obj.period.reverse();
                obj.income.reverse();
                obj.rev.reverse();
                console.log(obj)
                return res.send(obj);
              }
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
  const format = (obj) => {
    const ret = {};
    ret.name = obj.organization.name;
    ret.employees = obj.organization.approxEmployees;
    ret.founded = obj.organization.founded;
    ret.overview = obj.organization.overview;
    ret.Klout = obj.socialProfiles.find((prof) => prof.typeName === 'Klout');
    ret.Owler = obj.socialProfiles.find((prof) => prof.typeId === 'owler');
    ret.Facebook = obj.socialProfiles.find((prof) => prof.typeName === 'Facebook');
    ret.AngelList = obj.socialProfiles.find((prof) => prof.typeName === 'AngelList');
    ret.CrunchBase = obj.socialProfiles.find((prof) => prof.typeId === 'crunchbasecompany');
    ret.GooglePlus = obj.socialProfiles.find((prof) => prof.typeName === 'GooglePlus');
    ret.LinkedIn = obj.socialProfiles.find((prof) => prof.typeName === 'LinkedIn');
    if (ret.LinkedIn) ret.LinkedIn = ret.LinkedIn.url;
    if (ret.Klout) ret.Klout = ret.Klout.url;
    if (ret.Owler) ret.Owler = ret.Owler.url;
    if (ret.Facebook) ret.Facebook = ret.Facebook.url;
    if (ret.AngelList) ret.AngelList = ret.AngelList.url;
    if (ret.CrunchBase) ret.CrunchBase = ret.CrunchBase.url;
    if (ret.GooglePlus) ret.GooglePlus = ret.GooglePlus.url;
    ret.usRanking = obj.traffic.ranking.find(rank => rank.locale === 'us');
    if (ret.usRanking) ret.usRanking = ret.usRanking.rank;
    ret.globalRanking = obj.traffic.ranking.find(rank => rank.locale === 'global');
    if (ret.globalRanking) ret.globalRanking = ret.globalRanking.rank;
    return ret;
  };
// DISABLE FOR LIVE
  // if (req.body.searchTerm === 'google.com') res.send(format(FCGoogle));
  // if (req.body.searchTerm === 'amazon.com') res.send(format(FCAmazon));
  // if (req.body.searchTerm === 'facebook.com') res.send(format(FCFacebook));
  // if (req.body.searchTerm === 'microsoft.com') res.send(format(FCMicrosoft));
  // if (req.body.searchTerm === 'apple.com') res.send(format(FCApple));
// DISABLE FOR TESTING, ONLY 100 API CALLS A MONTH
  axios({
    method: 'GET',
    url: 'https://api.fullcontact.com/v2/company/lookup.json',
    params: {
      domain: req.body.searchTerm,
      apiKey: process.env.FULLCONTACT_APIKEY,
    },
  })
    .then(data => {
      res.send(format(data.data));
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
    count: 7,
    exclude_replies: true,
  };
  T.get('statuses/user_timeline', params, (err, tweets, response) => {
    console.log(tweets[0].user.screen_name);
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
// This API got cut. It works tho.
exports.Tradier = (req, res) => {
  axios.get(`http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=${req.body.searchTerm}&lang=en`)
    .then(result => {
      const Symbols = result.data.ResultSet.Result;
      if (Symbols.length === 0) return res.send('This Company is not publically traded.');
      axios.get('https://sandbox.tradier.com/v1/markets/history', {
        params: {
          // maybe not so much this part. Need to make a recursive function like in the EDGAR file, instead of hard coding in [0]
          symbol: Symbols[0].symbol,
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
// Testing Data for Full Contact. 100 API calls a month blows.
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
const FCFacebook = {
  status: 200,
  requestId: '99477de5-5c08-45ee-bf2e-503de4a9c4be',
  category: [
    {
      code: 'EMAIL_PROVIDER',
      name: 'Email Provider',
    },
  ],
  logo: 'https://d2ojpxxtu63wzl.cloudfront.net/static/98db163bc7827ff7240c48eebbe69160_e8b5ebb0f47aa4dab90b3581ebbb377d1bb23dba459f3c35e108f5a8e727af77',
  website: 'http://www.facebook.com',
  languageLocale: 'en',
  onlineSince: '1997-03-29',
  industries: [
    {
      type: 'SIC',
      name: 'Computer Processing and Data Preparation and Processing Services',
      code: '7374',
    },
    {
      type: 'NAICS',
      name: 'Data Processing, Hosting, and Related Services',
      code: '518210',
    },
  ],
  organization: {
    name: 'Facebook',
    approxEmployees: 5000,
    founded: '1989',
    overview: 'Facebook’s mission is to give people the power to share and make the world more open and connected. People use Facebook to stay connected with friends and family, to discover what’s going on in the world, and to share and express what matters to them.',
    contactInfo: {
      phoneNumbers: [
        {
          number: '+44 7856 231761',
          label: 'other',
        },
        {
          number: '+48 5434801',
          label: 'fax',
        },
        {
          number: '+48 5434800',
          label: 'other',
        },
      ],
      addresses: [
        {
          addressLine1: '1 Hacker Way',
          locality: 'Menlo Park',
          region: {
            name: 'California',
            code: 'CA',
          },
          country: {
            name: 'United States',
            code: 'US',
          },
          postalCode: '94025',
          label: 'work',
        },
        {
          addressLine1: 'Ateńska 67',
          locality: 'Warsaw',
          country: {
            name: 'Poland',
            code: 'PL',
          },
          postalCode: '03-970',
          label: 'work',
        },
        {
          region: {
            name: 'Ca - Usa',
          },
          country: {
            name: 'United States',
            code: 'US',
          },
          postalCode: '94301-1605',
          label: 'work',
        },
      ],
    },
    links: [
      {
        url: 'http://blog.facebook.com',
        label: 'facebook',
      },
    ],
    images: [
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/7c0889b84eeef99cb26591a4cdaa3939_7ae2320d351a163f96deb5f392b047064599b91e082e4c4edd407842c6d484a9',
        label: 'logo',
      },
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/30bcaf45b1cbc1897bc075d1c3001b2f_e5a188a616cfb2d05ff3c010461dc873bfa3b20186a2724e46d9fe265a7307b1',
        label: 'logo',
      },
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/98db163bc7827ff7240c48eebbe69160_e8b5ebb0f47aa4dab90b3581ebbb377d1bb23dba459f3c35e108f5a8e727af77',
        label: 'other',
      },
    ],
    keywords: [
      'Communities',
      'Facebook',
      'Identity',
      'Internet',
      'Mark Zuckerberg',
      'Media & Internet',
      'Networking',
      'Search Engines & Internet Portals',
      'Social Media',
      'Technology',
    ],
  },
  socialProfiles: [
    {
      bio: "Facebook's mission is to give people the power to share and make the world more open and connected. Millions of people use Facebook everyday to keep up with friends, upload an unlimited number of photos, share links and videos, and learn more about the people they meet.",
      followers: 2994,
      typeId: 'angellist',
      typeName: 'AngelList',
      url: 'https://angel.co/facebook',
      username: 'facebook',
      id: '32167',
    },
    {
      bio: 'Facebook is an online social networking service that enables its users to connect with friends and family as well as make new connections.',
      typeId: 'crunchbasecompany',
      typeName: 'CrunchBase',
      url: 'http://www.crunchbase.com/organization/facebook',
      username: 'facebook',
    },
    {
      typeId: 'klout',
      typeName: 'Klout',
      url: 'http://klout.com/facebook',
      username: 'facebook',
      id: '34339951924133804',
    },
    {
      typeId: 'owler',
      typeName: 'Other',
      url: 'https://www.owler.com/iaApp/103053/facebook-company-profile',
      username: 'facebook',
      id: '103053',
    },
    {
      typeId: 'twitter',
      typeName: 'Twitter',
      url: 'https://twitter.com/facebook',
      username: 'facebook',
    },
    {
      typeId: 'facebook',
      typeName: 'Facebook',
      url: 'https://www.facebook.com/facebook',
      username: 'facebook',
    },
  ],
  traffic: {
    topCountryRanking: [
      {
        rank: 3,
        locale: 'us',
      },
      {
        rank: 4,
        locale: 'in',
      },
      {
        rank: 4,
        locale: 'gb',
      },
    ],
    ranking: [
      {
        rank: 3,
        locale: 'global',
      },
      {
        rank: 3,
        locale: 'us',
      },
    ],
  },
};
const FCApple = {
  status: 200,
  requestId: '01f22760-454c-4d8f-a2ba-0741eab3d8ab',
  category: [
    {
      code: 'OTHER',
      name: 'Other',
    },
  ],
  logo: 'https://d2ojpxxtu63wzl.cloudfront.net/static/eb7b8c43fe81e0023e1a76b83a4e3210_8e5d1664dfcb8f0e04b024c03681a22d41479f8aa3ebd656a5a1937baa882895',
  website: 'http://www.apple.com',
  languageLocale: 'en',
  industries: [
    {
      type: 'SIC',
      name: 'Electrical Appliances, Television and Radio',
      code: '5064',
    },
    {
      type: 'NAICS',
      name: 'Household Appliances, Electric Housewares, and Consumer Electronics Merchant Wholesalers',
      code: '423620',
    },
    {
      type: 'NAICS',
      name: 'Electronic Computer Manufacturing',
      code: '334111',
    },
    {
      type: 'NAICS',
      name: 'Radio and Television Broadcasting and Wireless Communications Equipment Manufacturing',
      code: '334220',
    },
    {
      type: 'NAICS',
      name: 'Computer Terminal Manufacturing',
      code: '334113',
    },
    {
      type: 'NAICS',
      name: 'Computer and Software Stores',
      code: '443120',
    },
    {
      type: 'SIC',
      name: 'Radio, Television, and Electronic Stores',
      code: '5731',
    },
    {
      type: 'SIC',
      name: 'Computer Terminals',
      code: '3575',
    },
    {
      type: 'SIC',
      name: 'Radio and T.v. Communications Equipment',
      code: '3663',
    },
    {
      type: 'SIC',
      name: 'Miscellaneous Retail',
      code: '59',
    },
    {
      type: 'SIC',
      name: 'Computer and Data Processing Services',
      code: '737',
    },
  ],
  organization: {
    name: 'Apple',
    approxEmployees: 20000,
    founded: '1976',
    overview: "Apple Inc (Apple) designs, manufactures and markets mobile communication and media devices, personal computers, and portable digital music players, and a variety of related software, services, peripherals, networking solutions, and third-party digital content and applications. The Company's products and services include iPhone, iPad, Mac, iPod, Apple TV, a portfolio of consumer and professional software applications, the iOS and OS X operating systems, iCloud, and a variety of accessory, service and support offerings.",
    contactInfo: {
      phoneNumbers: [
        {
          number: '+1 (408) 996-1010',
          label: 'other',
        },
      ],
      addresses: [
        {
          addressLine1: '1 Infinite Loop',
          locality: 'Cupertino',
          region: {
            name: 'California',
            code: 'CA',
          },
          country: {
            name: 'United States',
            code: 'US',
          },
          postalCode: '95014',
          label: 'work',
        },
      ],
    },
    links: [
      {
        url: 'https://www.facebook.com/india.apple/info/?entry_point=page_nav_about_item&tab=page_info',
        label: 'facebook',
      },
      {
        url: 'https://en-gb.facebook.com/armenapple/about',
        label: 'facebook',
      },
    ],
    images: [
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/41bdc5eb1f4ba0bb4ebbd630d84a294d_e2d3c13e82bee59c6e25d0b59b1dd7f2d11d4b406cc1395bd193ab2ecb41262d',
        label: 'other',
      },
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/2d5969eb76425cd71a7625e3611e28b3_92cfdf989fb12e91e6f7f22f798401565670a17e2328d62f2ee8d0b713422c47',
        label: 'other',
      },
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/fcf3bbd553766ca75f36fe3ae8424976_8771186ccbe7608785c8debbd1c625dc577a1b4276a19802068354299215b4ea',
        label: 'other',
      },
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/65ef7ab91b6df0b1f255ba4cca3c529f_74375a0a617b07ec7ddc905882b2c502289c4e8de023a2fb600cd31cbae0ce55',
        label: 'logo',
      },
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/eb7b8c43fe81e0023e1a76b83a4e3210_8e5d1664dfcb8f0e04b024c03681a22d41479f8aa3ebd656a5a1937baa882895',
        label: 'other',
      },
    ],
    keywords: [
      'Apple',
      'Computers',
      'Consumer Electronics',
      'Hardware + Software',
      'Product Support',
      'Software',
      'Technology',
      'iOS',
    ],
  },
  socialProfiles: [
    {
      bio: 'Apple designs Macs, the best personal computers in the world, along with OS X, iLife, iWork and professional software. Apple leads the digital music revolution with its iPods and iTunes online store. Apple has reinvented the mobile phone with its revolutionary iPhone and App Store, and is defining the future of mobile media and computing devices with iPad.',
      followers: 4503,
      typeId: 'angellist',
      typeName: 'AngelList',
      url: 'https://angel.co/apple',
      username: 'apple',
      id: '37595',
    },
    {
      bio: 'Apple is a multinational corporation that designs, manufactures, and markets consumer electronics, personal computers, and software.',
      typeId: 'crunchbasecompany',
      typeName: 'CrunchBase',
      url: 'http://www.crunchbase.com/organization/apple',
      username: 'apple',
    },
    {
      typeId: 'klout',
      typeName: 'Klout',
      url: 'http://klout.com/AppleSupport',
      username: 'AppleSupport',
      id: '171699763025671277',
    },
    {
      typeId: 'facebookpage',
      typeName: 'Facebook',
      url: 'https://www.facebook.com/pages/Apple-Inc/137947732957611',
      username: 'Apple-Inc',
      id: '137947732957611',
    },
    {
      typeId: 'twitter',
      typeName: 'Twitter',
      url: 'https://twitter.com/apple',
      username: 'apple',
    },
    {
      typeId: 'facebook',
      typeName: 'Facebook',
      url: 'https://www.facebook.com/apple',
      username: 'apple',
    },
  ],
  traffic: {
    topCountryRanking: [
      {
        rank: 34,
        locale: 'us',
      },
      {
        rank: 60,
        locale: 'cn',
      },
      {
        rank: 33,
        locale: 'jp',
      },
    ],
    ranking: [
      {
        rank: 66,
        locale: 'global',
      },
      {
        rank: 34,
        locale: 'us',
      },
    ],
  },
};
const FCMicrosoft = {
  status: 200,
  requestId: '1a3b3b65-9641-4caa-894b-939460c545ce',
  category: [
    {
      code: 'OTHER',
      name: 'Other',
    },
  ],
  logo: 'https://d2ojpxxtu63wzl.cloudfront.net/static/6a96d805306c5120fd2605a00f9e6d9f_e7b7283aef597b503ee54edbdc9425b0b85369efef69ce6d60713396ad1f5738',
  website: 'http://www.microsoft.com',
  languageLocale: 'en',
  onlineSince: '1991-05-02',
  industries: [
    {
      type: 'SIC',
      name: 'Computer and Software Stores',
      code: '5734',
    },
    {
      type: 'SIC',
      name: 'Computers, Peripherals, and Software',
      code: '5045',
    },
    {
      type: 'SIC',
      name: 'Prepackaged Software',
      code: '7372',
    },
  ],
  organization: {
    name: 'Microsoft Corporation',
    approxEmployees: 105000,
    founded: '1975',
    overview: "Microsoft Corporation is an American multinational technology company headquartered in Redmond, Washington, that develops, manufactures, licenses, supports and sells computer software, consumer electronics and personal computers and services. Its best known software products are the Microsoft Windows line of operating systems, Microsoft Office office suite, and Internet Explorer web browser. Its flagship hardware products are the Xbox game consoles and the Microsoft Surface tablet lineup. It is the world's largest software makermeasured by revenues. It is also one of the world's most valuable companies.",
    contactInfo: {
      phoneNumbers: [
        {
          number: '+1 (646) 225-4479',
          label: 'fax',
        },
        {
          number: '+1 (212) 484-1800',
          label: 'other',
        },
        {
          number: '425-882-8080',
          label: 'other',
        },
      ],
      addresses: [
        {
          addressLine1: '1 Microsoft Way',
          locality: 'Redmond',
          region: {
            name: 'Washington',
            code: 'WA',
          },
          country: {
            name: 'United States',
            code: 'US',
          },
          postalCode: '98052',
          label: 'work',
        },
        {
          region: {
            name: 'New York',
            code: 'NY',
          },
          country: {
            name: 'United States',
            code: 'US',
          },
          postalCode: '10036-6619',
          label: 'work',
        },
        {
          locality: 'Gurgaon',
          country: {
            name: 'India',
            code: 'IN',
          },
          label: 'work',
        },
      ],
    },
    links: [
      {
        url: 'https://en-gb.facebook.com/MicrosoftBusinessUK/about',
        label: 'facebook',
      },
      {
        url: 'https://www.microsoft.com/en-us',
        label: 'other',
      },
      {
        url: 'http://www.microsoft.com/india/about',
        label: 'other',
      },
      {
        url: 'http://www.microsoftstore.com',
        label: 'other',
      },
    ],
    images: [
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/20f62a02b3e025c6a3bf6ca703afacae_ac2617c44f7f50e8679f05109a863ff04129b44b297eb362b4e774b7a0be97a4',
        label: 'twitter',
      },
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/09b1ccb23ad8e3199162acb834f30de2_2968b6831c6d0c83b63facaea753268846707c8572ca041ab788b4185ec97664',
        label: 'other',
      },
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/b7bac2db28b961937be318629c50165b_4fb782da5cd861fcc90878c45a2f039f124d2f7130fe52b9f541a2693e0e89c4',
        label: 'logo',
      },
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/a11dd872b12bcc109b6a36b324f29a85_24153a4f3f3bf9b0348001c3b7d7b683e4a7ba638c5b20719cd1a6f336297f2a',
        label: 'logo',
      },
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/6a96d805306c5120fd2605a00f9e6d9f_e7b7283aef597b503ee54edbdc9425b0b85369efef69ce6d60713396ad1f5738',
        label: 'other',
      },
    ],
    keywords: [
      'Apps',
      'Computers',
      'Consumer Software',
      'Microsoft',
      'Microsoft Corporation',
      'Microsoft Windows',
      'Product Support',
      'Software',
      'Video Games',
    ],
  },
  socialProfiles: [
    {
      bio: 'As a company, and as individuals, we value integrity, honesty, openness, personal excellence, constructive self-criticism, continual self-improvement, and mutual respect. We are committed to our customers and partners and have a passion for technology. We take on big challenges, and pride ourselves on seeing them through. We hold ourselves accountable to our customers, shareholders, partners, and employees by honoring our commitments, providing results, and striving for the highest quality.',
      followers: 5288,
      typeId: 'angellist',
      typeName: 'AngelList',
      url: 'https://angel.co/microsoft',
      username: 'microsoft',
      id: '33135',
    },
    {
      bio: 'Microsoft, a software corporation that develops, manufactures, licenses, supports, and sells a range of software products and services.',
      typeId: 'crunchbasecompany',
      typeName: 'CrunchBase',
      url: 'http://www.crunchbase.com/organization/microsoft',
      username: 'microsoft',
    },
    {
      typeId: 'klout',
      typeName: 'Klout',
      url: 'http://klout.com/Microsoft',
      username: 'Microsoft',
      id: '576364',
    },
    {
      typeId: 'owler',
      typeName: 'Other',
      url: 'https://www.owler.com/iaApp/100978/microsoft-company-profile',
      username: 'microsoft',
      id: '100978',
    },
    {
      typeId: 'twitter',
      typeName: 'Twitter',
      url: 'https://twitter.com/microsoft',
      username: 'microsoft',
    },
    {
      typeId: 'facebook',
      typeName: 'Facebook',
      url: 'https://www.facebook.com/microsoft',
      username: 'microsoft',
    },
  ],
  traffic: {
    topCountryRanking: [
      {
        rank: 36,
        locale: 'us',
      },
      {
        rank: 69,
        locale: 'cn',
      },
      {
        rank: 33,
        locale: 'in',
      },
    ],
    ranking: [
      {
        rank: 49,
        locale: 'global',
      },
      {
        rank: 36,
        locale: 'us',
      },
    ],
  },
};
const FCAmazon = {
  status: 200,
  requestId: '77e064ca-e60b-47cf-9478-0b92abb5daef',
  category: [
    {
      code: 'OTHER',
      name: 'Other',
    },
  ],
  logo: 'https://d2ojpxxtu63wzl.cloudfront.net/static/1ebe6dee05c08d696a2ad3b13d9db878_38a16f8f9074d78efa7816db8fefd22e57ae35c7bea301d022c8280d17983da5',
  website: 'https://www.amazon.com',
  languageLocale: 'en',
  onlineSince: '0094-11-01',
  industries: [
    {
      type: 'SIC',
      name: 'Computer Processing and Data Preparation and Processing Services',
      code: '7374',
    },
    {
      type: 'NAICS',
      name: 'Data Processing, Hosting, and Related Services',
      code: '518210',
    },
    {
      type: 'NAICS',
      name: 'Computer and Software Stores',
      code: '443120',
    },
    {
      type: 'NAICS',
      name: 'Wired Telecommunications Carriers',
      code: '517110',
    },
    {
      type: 'SIC',
      name: 'Computer and Software Stores',
      code: '5734',
    },
    {
      type: 'SIC',
      name: 'Catalog and Mail-order Houses',
      code: '5961',
    },
    {
      type: 'SIC',
      name: 'Computers, Peripherals, and Software',
      code: '5045',
    },
    {
      type: 'SIC',
      name: 'Secretarial and Court Reporting',
      code: '7338',
    },
  ],
  organization: {
    name: 'Amazon.com, Inc.',
    approxEmployees: 160000,
    founded: '1999',
    overview: "Amazon.com, Inc. (Amazon.com) operates retail Websites and offers programs that enable third parties to sell products on its Websites. The Company's retail Websites include www.amazon.com, www.amazon.ca, www.amazon.de, www.amazon.fr, www.amazon.co.jp, www.amazon.co.uk, www.joyo.com, www.shopbop.com and www.endless.com. Amazon.com also provides services for third-party retailers, marketing and promotional services, and Web services for developers. In addition, the Company operates other Websites, including www.a9.com and www.alexa.com that enable search and navigation and www.imdb.com, a movie database. Amazon.com has organized its operations into two principal segments: North America and International. The North America segment includes www.amazon.com and www.amazon.ca. The International segment includes www.amazon.co.uk, www.amazon.de, www.amazon.fr, www.amazon.co.jp and www.joyo.com. In May 2007, Amazon.com acquired www.dpreview.com, a site for digital camera information and reviews.",
    contactInfo: {
      phoneNumbers: [
        {
          number: '+1 (206) 266-1000',
          label: 'other',
        },
        {
          number: '+1 (206) 740-4650',
          label: 'other',
        },
        {
          number: '+1 (206) 266-1821',
          label: 'fax',
        },
        {
          number: '(206) 346-2992',
          label: 'other',
        },
        {
          number: '(888) 280-3321',
          label: 'other',
        },
      ],
      addresses: [
        {
          locality: 'Seattle',
          region: {
            name: 'Washington',
            code: 'WA',
          },
          country: {
            name: 'United States',
            code: 'US',
          },
          label: 'work',
        },
        {
          addressLine1: 'Customer Service',
          addressLine2: 'PO Box 81226',
          locality: 'Seattle',
          region: {
          },
          postalCode: '98108-1226',
        },
      ],
    },
    links: [
      {
        url: 'https://en-gb.facebook.com/Amazon/about',
        label: 'facebook',
      },
      {
        url: 'http://www.amazon.com/author/brianshell',
        label: 'other',
      },
    ],
    images: [
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/a5cd7590cd10620f876c80685ab45e5f_da5e04e286110d1d6d5a26d1fe2c99110a4a7b8d877834ea26eff8dff15c29f7',
        label: 'twitter',
      },
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/a4b3f5e953120292f7d8919d69f544d8_df39309d9bf0b28df44da46db349da3247924eeef4dba7a359449dcd3cef4645',
        label: 'other',
      },
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/d5bfc13d7b926295cda5a10a733be179_3802890040199b9a372db555d3ba5da11ff495d2cbfc04a105621039fa12a200',
        label: 'logo',
      },
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/8b251d3e702187b85619892a899a0f44_c3f59bd332f06aa086ad5bc51d630837b21a82a40e416fbaf0529d5430d84283',
        label: 'other',
      },
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/12b2b7f914acb6c3aaae5af1d27b1b0c_49393569d1565a48efe16777c8a7843577883b1b8545374414ce2a40c0e46f8a',
        label: 'other',
      },
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/70fc163afc6b9adca37e7cf188aa4481_0d62653cceddab0fbc2fd95d27d4b729b3820353f4bb990b252074eddaf0f35c',
        label: 'logo',
      },
      {
        url: 'https://d2ojpxxtu63wzl.cloudfront.net/static/1ebe6dee05c08d696a2ad3b13d9db878_38a16f8f9074d78efa7816db8fefd22e57ae35c7bea301d022c8280d17983da5',
        label: 'other',
      },
    ],
    keywords: [
      'Accessories',
      'Amazon',
      'Amazon.com',
      'Apparel',
      'Automotive Parts',
      'Baby Products',
      'Beauty',
      'Bed & Bath',
      'Book Store',
      'Books',
      'Broadband',
      'Business',
      'CDs',
      'Cell Phones',
      'Computers',
      'Consumer Goods',
      'DSL',
      'DVDs',
      'E-Commerce',
      'EBooks',
      'Electronics',
      'Furniture',
      'Games',
      'Garden',
      'General Interest',
      'Hardware',
      'Health',
      'Home',
      'Internet',
      'Jewelry',
      'Magazine',
      'Miscellaneous Professional Services',
      'Music',
      'Non-store Retail',
      'Office Products',
      'Online Shopping',
      'Outdoor Living',
      'Personal Care',
      'Pet Supplies',
      'Retail Industry',
      'Shoes',
      'Sporting Goods',
      'Sports & Outdoors',
      'Subscription',
      'Tools',
      'Toys',
      'Vacuums',
      'Video Games',
      'Videos',
      'Watches',
    ],
  },
  socialProfiles: [
    {
      typeId: 'klout',
      typeName: 'Klout',
      url: 'http://klout.com/amazon',
      username: 'amazon',
      id: '36028801784216781',
    },
    {
      typeId: 'owler',
      typeName: 'Other',
      url: 'https://www.owler.com/iaApp/101412/amazon-company-profile',
      username: 'amazon',
      id: '101412',
    },
    {
      typeId: 'twitter',
      typeName: 'Twitter',
      url: 'https://twitter.com/amazon',
      username: 'amazon',
    },
    {
      typeId: 'facebook',
      typeName: 'Facebook',
      url: 'https://www.facebook.com/amazon',
      username: 'amazon',
    },
  ],
  traffic: {
    topCountryRanking: [
      {
        rank: 5,
        locale: 'us',
      },
      {
        rank: 22,
        locale: 'jp',
      },
      {
        rank: 52,
        locale: 'cn',
      },
    ],
    ranking: [
      {
        rank: 12,
        locale: 'global',
      },
      {
        rank: 5,
        locale: 'us',
      },
    ],
  },
};
