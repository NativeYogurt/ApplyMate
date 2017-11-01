import React from 'react';

const Twitter = (props) => (
  <div id="tweetsContainer">
    {!props.twitterData[0] ? (
      <div className="centerText"> This company has no tweets. </div>
    ) : (
      <div>
        <div className="centerText">
          Tweets from &nbsp; <a href={`http://${props.twitterData[0].url}`}> {props.twitterData[0].url.slice(16)}</a>
        </div>
        {props.twitterData.map((tweet) => {
            return (
              <div key={tweet.time}>
                <img src="/imgs/tweetLogo.png" alt="tweet: " /> &nbsp;
                {tweet.time.slice(0, 19)} &nbsp;&nbsp;
                <img src="/imgs/twitterRetweet.png" alt="retweets: " /> &nbsp;
                {tweet.retweet} &nbsp;&nbsp;
                <img src="/imgs/twitterHeart.png" alt="likes: " /> &nbsp;
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