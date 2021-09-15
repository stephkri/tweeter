/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const createTweetElement = function(tweet) {
    const $tweet = $(`
    <article class="tweet">
    <header>
      <div class="header-left">
        <img src="${tweet.user.avatars}">
        <h4 class="username">${tweet.user.name}</h4>
      </div>
      <div class="header-right">
        ${tweet.user.handle}
      </div>
    </header>
    <div class="tweet-proper">
      <p>${tweet.content.text}</p>
    </div>
    <footer>
      <div><p>${tweet['created_at']}</p></div>
      <div class="icons">
        <i class="fas fapad fa-flag"></i>
        <i class="fas fapad fa-retweet"></i>
        <i class="fas fapad fa-heart"></i>
      </div>
    </footer>
  </article>
    `);
    return $tweet;
  };
  
  // Test/driver code
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $('#tweets-container').append(createTweetElement(tweet));
    }
  };
  
  // // Test / driver code (temporary)
  renderTweets(data);

  $(this).submit(function(event) {
    console.log(event);
    const tweetText = document.getElementById('tweet-text');
    const rawText = tweetText.value;
    event.preventDefault();
    $.post("/tweets",
    {
      text: rawText
    },
    function(data, status){
      alert("Data: " + data + "\nStatus: " + status);
      $.get('/tweets', function(data, status) {
        renderTweets(data);
      });
    });
  });

  // console.log(data);
  // const dataString = JSON.stringify(data);
  // const serialData = $(dataString).serialize();
  // console.log('serial data:', serialData);

});