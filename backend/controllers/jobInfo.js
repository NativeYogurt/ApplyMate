const axios = require('axios');

// expecting req.body.companyName
exports.BBB = (req, res) => {
  axios({
    method: 'GET',
    url: `https://api.bbb.org/api/orgs/search?primaryOrganizationName=${req.body.searchTerm}`,
    headers: { Authorization: `Bearer ${process.env.BBB_TOKEN}` },
  })
    .then(data => {
      res.send(data.data.SearchResults[0])
    })
    .catch(err => {
      console.error(err)
      res.send(err)
    })
};
