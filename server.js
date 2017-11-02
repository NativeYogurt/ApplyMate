const env = require('dotenv').config();
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const webpackConfig = require('./webpack.config.js');
const path = require('path');
const CronJob = require('cron').CronJob;
const db = require('./backend/db/db');
const emailer = require('./backend/utilities/emailer');
const websiteChecker = require('./backend/utilities/websiteChecker');
const router = require('./backend/router/routes.js');
const User = require('./backend/models/User');
const SavedJobs = require('./backend/models/SavedJobs');
const Contacts = require('./backend/models/Contacts');
const Events = require('./backend/models/Events');
const Tasks = require('./backend/models/Tasks');

const Github = require('./backend/utilities/githubRepoCrawler');
const Emailer = require('./backend/utilities/emailer');
const Texter = require('./backend/utilities/twilio');

const app = express();

const compiler = webpack(webpackConfig);
app.use(bodyParser.json({ limit: '50mb' }));
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

const server = app.listen(process.env.PORT || 3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

new CronJob('30 03 * * *', function() {
  console.log('You will see this message every day at 4:30pm et');
  Github.cronGitHubUpdate();
  Emailer.sendInterviewReminder();
  websiteChecker.checkActivePosts();
  Texter.sendTextReminder();
}, null, true, 'America/New_York');
