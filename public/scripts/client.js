/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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
      <p>${escape(tweet.content.text)}</p>
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

  const isTooLong = function(tweet) {
    if (tweet.length > 140) {
      return true;
    }
    return false;
  }

  $(this).submit(function(event) {
    event.preventDefault();
    console.log(event);
    const tweetText = document.getElementById('tweet-text');
    const rawText = tweetText.value;
    if (isTooLong(rawText)) {
      alert('Your tweet is too long! Please limit your tweet to 140 characters.');
      return;
    }

    if (!rawText) {
      alert('Tweet empty. Please enter at least one character.');
      return;
    }

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