<p align="center"> 
<img width="378" alt="login_logo" src="https://user-images.githubusercontent.com/6298501/32675916-9a38f66a-c626-11e7-92a2-6dbda21fcc47.png">
</p>

You're a new software developer looking to break into the field or a seasoned vet looking for a new gig.

Wouldn't it be nice if there was one place to find jobs, highlight the skills you need to get them, and get study material to level up?

.apply(me) is a job application tracker that replaces your spreadsheet or note-taking app with an elegant and intuitive web-based solution.  Main features include:
- Recognize your missing skills required by the job and get recommended tutorials
- Save job applications and update statuses
- Prioritize jobs based on status, location or company and see a complete picture of your job search
- Add contacts at target companies and keep notes of your interactions
- Visualize your job application status and preferrred language via Github
- Receive reminders at every stage of the process to keep you engaged and proactive

![app_screenshots](https://user-images.githubusercontent.com/6298501/32752089-e376c052-c895-11e7-8634-2298ad445d78.png)

## Table of Contents

1. [Team](#team)
1. [Usage](#usage)
1. [Getting Started](#getting-started)
1. [Built With](#built-with)
1. [License](#license)

## Team

.apply(me) is being developed by four full-stack engineers.

* **Alexander Lukens** - [alexanderlukens](https://github.com/alexanderlukens)
* **Bryan Wang** - [bryangxyz](https://github.com/bryangxyz)
* **Kenneth Tso** - [iamkennytso](https://github.com/iamkennytso)
* **Paul Jaffre** - [jaffrepaul](https://github.com/jaffrepaul)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites & Installing

1. Fork the repo and clone it to your development environment of choice.

2. To install .apply(me) dependencies, run the following command from the cloned repo's directory:

```npm install```

### Configuration

You will need several API Keys to run your own build of apply(me). We use the NPM package [dotenv](https://github.com/motdotla/dotenv) for our local environment variables. You should make a .env file, placed in your clone's root directory, that looks like this:

```
DB_HOST=(Your mysql db host)
DB_USER=(Your mysql db username)
DB_PASS=(Your mysql db password)
DB_NAME=(Your mysql db name)
REACT_APP_YOUTUBE_KEY=(Youtube Data API Key) // Available from [Google](https://console.developers.google.com)
REACT_APP_GOOGLE_CX=(Google Custom search engine ID) // Available from [Google](https://developers.google.com/custom-search/json-api/v1/overview)
REACT_APP_GOOGLE_KEY=(Google Custom Search API Key) // Available from [Google](https://developers.google.com/custom-search/json-api/v1/overview)
CLOUDINARY_URL=(Cloudinary API Key) // Available from [Cloudinary](https://cloudinary.com/documentation/admin_api)
CLOUD_CONVERT_API=(Cloudinary API Key) // Available from [Cloudinary](https://cloudinary.com/documentation/admin_api)
GITHUB_CLIENT_ID=(Github Job API ID) // Available from [Github](https://jobs.github.com/api)
GITHUB_CLIENT_SECRET=(Github Job API Key) // Available from [Github](https://jobs.github.com/api)
FULLCONTACT_APIKEY=(FullContact API Key) // Available from [FullContact](https://www.fullcontact.com/developer/docs/)
TWITTER_KEY=(Twitter API Key) // Available from [Twitter](https://developer.twitter.com/en/docs/basics/getting-started)
TWITTER_SECRET=(Twitter API Key) // Available from [Twitter](https://developer.twitter.com/en/docs/basics/getting-started)
TWITTER_TOKEN=(Twitter API Key) // Available from [Twitter](https://developer.twitter.com/en/docs/basics/getting-started)
TWITTER_TOKENSECRET=(Twitter API Key) // Available from [Twitter](https://developer.twitter.com/en/docs/basics/getting-started)
GLASSDOOR_ID=(Glassdoor API ID) // Available from [Glassdoor](https://www.glassdoor.com/developer/index.htm)
GLASSDOOR_KEY=(Glassdoor API Key) // Available from [Glassdoor](https://www.glassdoor.com/developer/index.htm)
TWILIO_TOKEN=(Twilio API Token) // Available from [Twilio](https://www.twilio.com/docs/api/rest/keys)
TWILIO_FROM=(Twilio API Token) // Available from [Twilio](https://www.twilio.com/docs/api/rest/keys)
TWILIO_SID=(Twilio API SID) // Available from [Twilio](https://www.twilio.com/docs/api/rest/keys)
TRADIER_TOKEN=(Tradier API Key) // Available from [Tradier](https://developer.tradier.com/documentation/oauth/access-token)
EDGAR_KEY=(Edgar API Key) // Available from [Edgar](http://developer.edgar-online.com/)
```

### Login

.apply(me) needs to track your profile in order to learn about you, so start by signing up or logging in using Github.

Contact us if you have any questions!

## Built With
![app_stack](https://user-images.githubusercontent.com/6298501/32752828-ab066652-c898-11e7-914a-87acab719bd1.png)

* [React](https://facebook.github.io/react/) - Facebook's powerful JavaScript framework
* [Node.js](https://nodejs.org) - JavaScript runtime
* [Express](https://expressjs.com/)- Fantastic Node.js web server framework
* [Firebase Authentication](https://firebase.google.com/docs/auth/)
* [PostgreSQL](https://www.postgresql.org/) - Object-relational database
* [Sequelize](https://www.sequelizejs.com) - Powerful ORM tool for SQL databases
* [React Materialize](https://react-materialize.github.io/#/) - Material design for react
* [Materialize](http://materializecss.com/) - A modern responsive front-end framework based on Material Design
* [Webpack](https://webpack.github.io/) - Module bundler
* [Nightmare.js](http://www.nightmarejs.org/) - A high-level browser automation library


### TODO
- Add additional styling
- Optimize pageload speed


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
