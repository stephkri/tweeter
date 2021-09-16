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

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $('#tweets-container').append(createTweetElement(tweet));
    }
  };

  const loadTweets = function() {
    $.get('/tweets', function(data) {
      renderTweets(data);
    });
  };

  loadTweets();

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
      //alert("Data: " + data + "\nStatus: " + status);
      loadTweets();
    });
  });

});