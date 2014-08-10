//https://www.googleapis.com/youtube/v3/playlists
//AIzaSyAmkH9BharZeRdnAgEawsvU3miif40CgJc
//https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyAJilIGstSZj3XljQMtpg5GhxoksVqPGkM&part=snippet,contentDetails,statistics,status
var mixedTapeApp = {}
mixedTapeApp.appData = {},
mixedTapeApp.apikey = 'AIzaSyAJilIGstSZj3XljQMtpg5GhxoksVqPGkM';


mixedTapeApp.init = function(playlistId){
		mixedTapeApp.getPlaylist(playlistId);	
		
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
			success: mixedTapeApp.parseData

		});

};

mixedTapeApp.parseData = function(response){
	//console.log(response.items[0]);

	var playlistInfo = response.items[0].snippet;
	var playerInfo = response.items[0].player;
	//console.log(playlistInfo);
	//console.log(playerInfo);
	mixedTapeApp.appData.title = playlistInfo.title;
	mixedTapeApp.appData.date_time = playlistInfo.publishedAt;
	mixedTapeApp.appData.description = playlistInfo.description;
	mixedTapeApp.appData.videosStream = playerInfo.embedHtml;
	mixedTapeApp.updateDom();
}

mixedTapeApp.updateDom = function(){
	//update data to HTML document
	$('#title').html(mixedTapeApp.appData.title);
	$('#date_time').html(mixedTapeApp.appData.date_time);
	$('#description').html(mixedTapeApp.appData.description);
	//$('#frame').html(mixedTapeApp.appData.videosStream);
	$('#frame').html(mixedTapeApp.appData.videosStream);

};




 	
	

$(function(){
	//Initialize mixedTape app when user click the button to pass their playlist ID
	$('#submit').on('click',function(e){
		e.preventDefault();
		var playlistId = $('#playlistId').val();
		console.log(playlistId);
		mixedTapeApp.init(playlistId);
		
	});
});
