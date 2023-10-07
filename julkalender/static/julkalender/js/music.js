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
  "0bWJciHHUQY"
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
  player = new YT.Player('player', {
    height: '0',
    width: '0',
    videoId: songs[randomSong],
    playerVars: {
      'playsinline': 1,
      'autoplay': 1,
      'loop': 1,
      'enablejsapi': 0,
      'controls': 0
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
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

let testElement = document.getElementById("door-main");

if (testElement == 'undefined' || testElement == null)  {
	document.body.appendChild(player)
}

// if mute-button clicked
document.getElementById("mute-button").onclick = function () {
  player.remove();
}
