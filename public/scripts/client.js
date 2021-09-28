/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const escape = function(str) {
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
      <div><p>${timeago.format(tweet['created_at'])}</p></div>
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
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  };

  const loadTweets = function() {
    $.get('/tweets', function(data) {
      renderTweets(data);
    });
  };

  const isTooLong = function(str) {
    if (str.length > 140) {
      return true;
    }
    return false;
  };

  loadTweets();

  $(this).submit(function(event) {
    event.preventDefault();
    const tweetText = document.getElementById('tweet-text');
    const rawText = tweetText.value;
    const tweetTooLong = document.getElementById('tweet-too-long');
    const tweetEmpty = document.getElementById('tweet-empty');
    console.log(tweetText);
    console.log($(tweetText));
    
    $(tweetTooLong).css("display", "none");
    $(tweetEmpty).css("display", "none");

    if (isTooLong(rawText)) {
      $(tweetTooLong).css("display", "inline");
      return;
    }

    if (!rawText) {
      $(tweetEmpty).css("display", "inline");
      return;
    }

    $("#tweets-container").empty();

    $.post("/tweets",
      {
        text: rawText
      },
      function(data, status) {
        loadTweets();
      });

      $(tweetText).val('');

  });


});