import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


class Twitter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.companyName,
      data: [],
      pic: '/imgs/TempHeader.jpg',
    };
    this.twitterApiCall = this.twitterApiCall.bind(this);
  }

  componentDidMount() {
    this.twitterApiCall();
  }

  twitterApiCall() {
    axios.post('/api/Twitter', { searchTerm: this.state.searchTerm })
      .then(data => {
        this.setState({
          data: data.data,
          pic: data.data[0].pic,
        });
      });
  }


  render() {
    return (
      <div id="TwitterComponent">
        <img id="twitterBanner" src={this.state.pic} style={{ maxWidth: '100%', maxHeight: '100%' }} alt="hello world" />
        {!this.state.data[0] ? (
          <div id="tweetsContainer">
            This company has no tweets.
          </div>
        ) : (
          <div id="tweetsContainer">
              Tweets from <a href={`http://${this.state.data[0].url}`}> {this.state.data[0].url.slice(16)}</a>
            <br /> <br />
            {this.state.data.map((tweet) => {
                return (
                  <div key={tweet.time}>
                    <img src="/imgs/tweetLogo.png" alt="tweet: " /> {' '}
                    {tweet.time.slice(0, 19)} {' '}
                    <img src="https://ton.twitter.com/hc_assets/1496970859_1377.png" alt="retweets: " /> {' '}
                    {tweet.retweet} {' '}
                    <img src="https://ton.twitter.com/hc_assets/1487281908_1244.png" alt="likes: " /> {' '}
                    {tweet.favorite}
                    <br />
                    {tweet.text}
                    <br />
                    <br />
                  </div>
                );
              })}
          </div>
         )}


      </div>
    );
  }
}

Twitter.propTypes = {
  companyName: PropTypes.string.isRequired,
};
export default Twitter;
