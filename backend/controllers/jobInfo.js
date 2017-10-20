const axios = require('axios');
// expecting req.body.searchTerm
var request = require("request");

exports.BBB = (req, res) => {
  axios({
    method: 'GET',
    url: `https://api.bbb.org/api/orgs/search?primaryOrganizationName=${req.body.searchTerm}`,
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


exports.Glassdoor = (req, res) => {
  
  const options = { method: 'GET',
    url: 'http://api.glassdoor.com/api/api.htm',
    qs: { 
      v: '1',
      format: 'json',
      't.p': process.env.GLASSDOOR_ID,
      't.k': process.env.GLASSDOOR_KEY,
      userip: '144.121.106.166',
      useragent: 'Mozilla//4',
      action: 'employers',
      q: req.body.searchTerm,
    },
  };
  request(options, (error, resp, body) => {
    if (error) throw new Error(error);
    //I can't break the body down for some reason.
    res.send(body);
  });

  // I don't know why axios won't work here, it gives weird data back.

  // axios.get('http://api.glassdoor.com/api/api.htm', {
  //   params: {
  //     v: 1,
  //     format: 'JSON',
  //     't.p': process.env.GLASSDOOR_ID,
  //     't.k': process.env.GLASSDOOR_KEY,
  //     userip: '144.121.106.166',
  //     useragent: 'Mozilla//4',
  //     action: 'employers',
  //     q: req.body.searchTerm,
  //   },
  // })
  //   .then(data => {
  //     res.send(data.data);
  //   })
  //   .catch(err => {
  //     console.error(err);
  //     res.send(err);
  //   });
};

// unfinished
// exports.findStockSymb = (req, res) => {
//   axios.get(`http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=${req.body.searchTerm}&lang=en`)
//   .then(res => res.send(res.))
// }