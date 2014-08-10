// Load the IFrame Player API code asynchronously.
  function loadAPI(){
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  console.log('Player API is loading');
  };

// Replace the 'ytplayer' element with an <iframe> and
  // YouTube player after the API code downloads.   
  var player;
  window.onYouTubePlayerAPIReady = function() {
    console.log("API Ready!");
  var playlistId = $('#playlistId')[0].value;
    player = new YT.Player('ytplayer', {
      height: '156',
      width: '250',
      playerVars:{
        controls:0,
        listType: 'playlist',
        list: playlistId
      },
    });  
    console.log(playlistId);
  };

  
//customized control buttons
  $('#bt_play').on('click', function(){
    player.playVideo();
  });
  $('#bt_pause').on('click', function(){
    player.pauseVideo();
  });
  $('#bt_stop').on('click', function(){
    player.stopVideo();
  });

  $('#toggle').on('click', function(e){
      e.preventDefault();
    $('#thumbnails').slideToggle('slow')
    if ($("#thumbnails").is(':visible')) {
     $("html, body").animate({scrollTop: $("#thumbnails").offset().top});
        }
    });

    

$(function(){
  $('#submit').on('click',function(e){
    e.preventDefault();
    loadAPI();
    // onYouTubePlayerAPIReady();


  });
    
  });


  

