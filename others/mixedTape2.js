//https://www.googleapis.com/youtube/v3/playlists
//AIzaSyAmkH9BharZeRdnAgEawsvU3miif40CgJc
//https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyAJilIGstSZj3XljQMtpg5GhxoksVqPGkM&part=snippet,contentDetails,statistics,status
var mixedTapeApp = {}
mixedTapeApp.appData = {},
mixedTapeApp.apikey = 'AIzaSyAJilIGstSZj3XljQMtpg5GhxoksVqPGkM';


mixedTapeApp.init = function(playlistId){
		mixedTapeApp.getPlaylist(playlistId);
		mixedTapeApp.getPlaylistItems();	
		mixedTapeApp.loadAPI();
		
	},

mixedTapeApp.getPlaylist = function(playlistId){

	//Get playlist ID from user input
	// var playlistId = $('#playlistId').val(); this is not necessary when I use "playlistId" as a parameter
	var playlistUrl = "https://www.googleapis.com/youtube/v3/playlists?part=snippet,player&id=" + playlistId + "&key=" + mixedTapeApp.apikey;
 
	$.ajax({
			//url:'https://www.googleapis.com/youtube/v3/playlists?part=snippet,player&id=FLHJsepw-FGo__FuTphk2U_g&key=AIzaSyAJilIGstSZj3XljQMtpg5GhxoksVqPGkM',
			url: playlistUrl,
			type:'GET',
			key:mixedTapeApp.apikey,
			dataType: 'jsonp', 
			data:{
				controls:'0'
			},
			success: mixedTapeApp.parseDataPlaylist

		});

};

mixedTapeApp.parseDataPlaylist = function(response){
	//console.log(response.items[0]);
	var playlistInfo = response.items[0].snippet;
	//var playerInfo = response.items[0].player;
	//console.log(playlistInfo);
	//console.log(playerInfo);
	mixedTapeApp.appData.title = playlistInfo.title;
	mixedTapeApp.appData.date_time = playlistInfo.publishedAt;
	mixedTapeApp.appData.description = playlistInfo.description;
	//mixedTapeApp.appData.videosStream = playerInfo.embedHtml;
	mixedTapeApp.updateDom();
}

mixedTapeApp.updateDom = function(){
	//update data to HTML document
	$('#title').html(mixedTapeApp.appData.title);
	$('#date_time').html(mixedTapeApp.appData.date_time);
	$('#description').html(mixedTapeApp.appData.description);
	//$('#frame').html(mixedTapeApp.appData.videosStream);
};
//get playlist songs' thumbnails and titles

mixedTapeApp.getPlaylistItems = function(){

	$.ajax({
			//https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PL3_NLXp9puXWs19A9mdPXkoQ_WZ4IEBvp&key=AIzaSyAJilIGstSZj3XljQMtpg5GhxoksVqPGkM

			url: 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PL3_NLXp9puXWs19A9mdPXkoQ_WZ4IEBvp&key=AIzaSyAJilIGstSZj3XljQMtpg5GhxoksVqPGkM',
			type:'GET',
			key:mixedTapeApp.apikey,
			dataType: 'jsonp', 
			success: function(result){
				//mixedTapeApp.displayThumb(result.items)
				console.log(result.items);
			}

		});

};

// mixedTapeApp.displayThumb = function(data){
// 	$.each(data,function(i,thumb){
// 		var thumbTitle = $('<h3>').text(thumb.title);
// 		var thumbImage = $('<img>').attr('src',thumb.thumbnails.default.url);
// 		var thumbnail = $('<div>').addClass('thumb').append(thumbTitle, thumbImage);
// 		$('#thumbnails').append(thumbnail);
// 		console.log('hello');
// 	})
// };


///////////////////////////////////////////////
//mixedTapeApp.playerLoad = function(){
	//mixedTapeApp.loadAPI();
//};


// Load the IFrame Player API code asynchronously.
mixedTapeApp.loadAPI = function(){
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/player_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	console.log('API is loading');

  
};
  
// Replace the 'ytplayer' element with an <iframe> and
  // YouTube player after the API code downloads. 

var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
      height: '390',
      width: '640',
      playerVars:{
      	controls:0,
      	listType: 'playlist',
      	list: $('#playlistId')[0].value
      }

    });  
    console.log($('#playlistId')[0].value);
  }
  

  $('#bt_play').on('click', function(){
  	player.playVideo();
  });
  $('#bt_pause').on('click', function(){
  	player.pauseVideo();
  });
  $('#bt_stop').on('click', function(){
  	player.stopVideo();
  });



$(function(){
	//Initialize mixedTape app when user click the button to pass their playlist ID
	$('#submit').on('click',function(e){
		e.preventDefault();
		var playlistId = $('#playlistId').val();
		console.log(playlistId);
		mixedTapeApp.init(playlistId);
		
	});
});


