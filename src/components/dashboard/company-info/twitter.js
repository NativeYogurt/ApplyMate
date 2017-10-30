import React from 'react';

const Twitter = (props) => (
  <div id="tweetsContainer">
    {!props.twitterData[0] ? (
      <p>This company has no tweets.</p>
    ) : (
      <div>
        Tweets from <a href={`http://${props.twitterData[0].url}`}> {props.twitterData[0].url.slice(16)}</a>
        {props.twitterData.map((tweet) => {
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

export default Twitter;