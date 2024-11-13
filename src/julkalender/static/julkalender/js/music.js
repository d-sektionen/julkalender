// Christmas songs from youtube
var songs = [
  "q_F9Nrs7ODQ",
  "yXQViqx6GMY",
  "E8gmARGvPlI",
  "RTtc2pM1boE",
  "aBkTkxKDduc",
  "I-sH53vXP2A",
  "vOoWAmoA6B4",
  "IAQs7i8lVwU",
  "173uCQT4J9s",
  "0bWJciHHUQY",
  "CR4wkM2JYtY",
  "qvEIo72Fn78", // Dj Santana Feliz Super Freaky Christmas Girl Vidmix
  "h3vbvdesee8" // Let It Snow (Brainrot Edition) "Ohio, Ohio, Ohio" AI Parody cover (lyrics by notjewboi)
];

var randomSong = Math.floor(Math.random() * songs.length);

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  console.log("Started playing https://www.youtube.com/watch?v=" + songs[randomSong]);
  player = new YT.Player('player', {
    height: '0',
    width: '0',
    videoId: songs[randomSong],
    playerVars: {
      'playsinline': 1,
      'autoplay': 0,
      'loop': 1,
      'enablejsapi': 1,
      'controls': 0
    },
    events: {
      'onReady': onPlayerReady,
      'onAutoplayBlocked': onAutoplayBlocked
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  setTimeout(function() {
    event.target.playVideo();
  }, 1000);
}

function onAutoplayBlocked(event) {
  setTimeout(function() {
    event.target.playVideo();
  }, 1000);
}

// Old player
/*
ytplayer.width = 0
ytplayer.height = 0
ytplayer.style.display = 'none'
ytplayer.src = 'https://www.youtube.com/embed/' + songs[randomSong] + '?enablejsapi=1&autoplay=1'

// Make autoplay of music on chrome workaround
ytplayer.allow = "autoplay"
*/

/*
if (localStorage.getItem("hasCodeRunBefore") === null) {
        var chrome   = navigator.userAgent.indexOf('Chrome') > -1;
   	if (chrome) alert("Gooood Juuuul era jäklar");
	window.onload = function () {
        	localStorage.setItem("hasCodeRunBefore", true);
   	}
}
*/

/*
let testElement = document.getElementById("door-main");

if (testElement == 'undefined' || testElement == null)  {
	document.body.appendChild(player)
}
*/

// if mute-button clicked
function mute() {
  if (player.getPlayerState() == YT.PlayerState.PLAYING) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
}

function playMusic() {
  player.playVideo();
}

function pauseMusic() {
  setTimeout(function() {
    player.pauseVideo();
  }, 1000);
}