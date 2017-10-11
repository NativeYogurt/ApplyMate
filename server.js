const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const webpackConfig = require('./webpack.config.js');
const path = require('path');
const env = require('dotenv').config();
const db = require('./backend/db/db.js');
const User = require('./backend/models/User');
const SavedJobs = require('./backend/models/SavedJobs');

const router = require('./backend/router/routes.js');

const app = express();

const compiler = webpack(webpackConfig);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/api', router);

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
