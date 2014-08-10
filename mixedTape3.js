//https://www.googleapis.com/youtube/v3/playlists
//AIzaSyAmkH9BharZeRdnAgEawsvU3miif40CgJc
//https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyAJilIGstSZj3XljQMtpg5GhxoksVqPGkM&part=snippet,contentDetails,statistics,status
var mixedTapeApp = {}
mixedTapeApp.appData = {},
mixedTapeApp.apikey = 'AIzaSyAJilIGstSZj3XljQMtpg5GhxoksVqPGkM';
var playlistId = $('#playlistId')[0].value;
//global function that loads the player
var player;
$('#bt_play').on('click', function(){
  	player.playVideo();
  });
  $('#bt_pause').on('click', function(){
  	player.pauseVideo();
  });
  $('#bt_stop').on('click', function(){
  	player.stopVideo();
  });



  


mixedTapeApp.init = function(playlistId){
	var playlistId = $('#playlistId').val();
		mixedTapeApp.getPlaylist(playlistId);
		mixedTapeApp.getPlaylistItems(playlistId);	
		mixedTapeApp.loadAPI(playlistId);
		mixedTapeApp.onYouTubePlayerAPIReady(playlistId);

	},

mixedTapeApp.getPlaylist = function(playlistId){

	//Get playlist ID from user input
	// var playlistId = $('#playlistId').val(); this is not necessary when I use "playlistId" as a parameter
	var playlistAPI = "https://www.googleapis.com/youtube/v3/playlists?part=snippet,player&id=" + playlistId + "&key=" + mixedTapeApp.apikey;
 
	$.ajax({
			//url:'https://www.googleapis.com/youtube/v3/playlists?part=snippet,player&id=FLHJsepw-FGo__FuTphk2U_g&key=AIzaSyAJilIGstSZj3XljQMtpg5GhxoksVqPGkM',
			url: playlistAPI,
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
mixedTapeApp.itemsDisplay={};
mixedTapeApp.itemsData = {};

mixedTapeApp.getPlaylistItems = function(){
	var playlistId = $('#playlistId').val();
	var playlistItemsAPI = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId='+playlistId+'&key='+mixedTapeApp.apikey;
	console.log(playlistItemsAPI);

	$.ajax({
			//https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PL3_NLXp9puXWs19A9mdPXkoQ_WZ4IEBvp&key=AIzaSyAJilIGstSZj3XljQMtpg5GhxoksVqPGkM

			url: playlistItemsAPI,
			type:'GET',
			key:mixedTapeApp.apikey,
			dataType: 'jsonp', 
			success: function(result){
				mixedTapeApp.displayThumb(result.items);
				console.log(result.items);
			}

		});
	mixedTapeApp.displayThumb = function(result){
	$.each(result,function(i, thumb){
		var title = $('<h2>').text(thumb.snippet.title);
		var image = $('<img>').attr('src', thumb.snippet.thumbnails.default.url);
		var thumbList = $('<div>').addClass('thumbnail').append(title, image);
		$('#thumbnails').append(thumbList);

	})
	
		
		
	
};

};





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
  function onYouTubePlayerAPIReady(playlistId) {
	var playlistId = $('#playlistId')[0].value;
    player = new YT.Player('ytplayer', {
      height: '390',
      width: '640',
      playerVars:{
      	controls:0,
      	listType: 'playlist',
      	list: playlistId
      }

    });  
    console.log(playlistId);
  };

  mixedTapeApp.onYouTubePlayerAPIReady = function(playlistId){
  	//var playlistId = $('#playlistId')[0].value;
  	onYouTubePlayerAPIReady(playlistId);
  	console.log('Player is ready!');

  };





$(function(){
	//Initialize mixedTape app when user click the button to pass their playlist ID
	$('#submit').on('click',function(e){
		e.preventDefault();
		var playlistId = $('#playlistId')[0].value;
		mixedTapeApp.init(playlistId);
		$('#thumbnails').empty();
	



		
	});
});


