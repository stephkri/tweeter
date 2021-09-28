$(document).ready(function() {

  $("#tweet-text").keyup(function() {
    let val = $(this).val();
    let valLen = val.length;
    let count = 140 - valLen;
    const counter = $(this).parent()['0']['2'];
    counter.innerText = count;
    const counterObj = $(counter);
    if (count >= 0) {
      counterObj.css("color", "#545149");
    }
    if (count < 0) {
      counterObj.css("color", "red");
    }
  });

  $(this).submit(function() {
    let val = $('#tweet-text').val();
    let valLen = val.length;
    if (!valLen) {
      const counter = $('#tweet-text').parent()['0']['2'];
      counter.innerText = '140';
    }
  });

});