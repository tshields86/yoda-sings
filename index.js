document.addEventListener("DOMContentLoaded", function(event){



$('#submit-btn').on('click', function() {
var artist = document.getElementById('artist-search').value;
if (artist === ''){
  alert("Please provide an artist.");
  return;
}
var song = document.getElementById('song-search').value;
if (song === ''){
  alert("Please provide a song.");
  return;
}

var songQuery = 'http://api.musixmatch.com/ws/1.1/track.search?format=jsonp&q_track=' + song + '&q_artist=' + artist + '&f_has_lyrics=1&apikey=' + musixMatchKey;

$.ajax({
  url: songQuery,
  dataType: 'jsonp',
  jsonpCallback: "callback"
}).done(function(data) {
    // console.log("This is the full data: ",data);
  // console.log(data.message.body.track_list[0]);
  info.trackId = data.message.body.track_list[0].track.track_id;
  info.artistName = data.message.body.track_list[0].track.artist_name;
  info.albumName = data.message.body.track_list[0].track.album_name;
  info.trackName = data.message.body.track_list[0].track.track_name;
  info.albumCover = data.message.body.track_list[0].track.album_coverart_350x350;
  // console.log("Info: ",info);

  var  lyricQuery = 'http://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&track_id=' + info.trackId + '&apikey=' + musixMatchKey;
  // console.log(lyricQuery);
  $.ajax({
    url: lyricQuery,
    dataType: 'jsonp',
    jsonpCallback: "callback"
  }).done(function(data) {
    // console.log("Lyrics search data : ",data);
    info.trackLyrics = data.message.body.lyrics.lyrics_body;
    console.log(info);
    // console.log(info.trackLyrics);
    // console.log(typeof info.trackLyrics);
    info.trackLyrics = info.trackLyrics.slice(0, -58)
    console.log(info.trackLyrics);
    var yodaQuery = "https://yoda.p.mashape.com/yoda?sentence=";
        // example = "You will learn how to speak like me someday";

    $.ajax({
      url: yodaQuery + info.trackLyrics,
      success: function(data) {
        console.log(data);
      },
      error: function(err) {
        console.log("error");
      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", yodaKey);
      }
      // used beforeSend to input the X-Mashape-Authorization key
    });//end of yoda ajax
  });//end of lyricQuery ajax






});//end of songQuery ajax


});//end of submit click function

var info = {
  trackId: undefined,
  artistName: undefined,
  albumName: undefined,
  trackName: undefined,
  albumCover: undefined,
  trackLyrics: undefined
};



});//end of dom content loaded
