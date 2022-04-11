//Declaring variables and assigning values from html elements using querySelector 

let song_art = document.querySelector(".song-art");
let currentSong = document.querySelector(".nowPlaying");
let song_artist = document.querySelector(".song-artist");
let song_name = document.querySelector(".songName");

let playpause_btn = document.querySelector(".pausesong");
let prev_btn = document.querySelector(".prevsong");
let next_btn = document.querySelector(".nextsong");

let volumeslider = document.querySelector(".volumeslider");
let seekslider = document.querySelector(".seekslider");
let now_time = document.querySelector(".now-time");
let total_time = document.querySelector(".total-time");
let timeUpdate;
let songIndex = 0; isPlaying = false;

// Creating new audio element
let current_song = document.createElement('audio');

// Defining  the tracks that are to be played, array of objects with keys and value pairs.
let song_list = [
  {
    name: "Ukulele",
    artist: "Benjamin Tissot",
    image:"images/ukulele.jpg" ,
    path:"audio/ukulele.mp3"
    },
  {
    name: "Better Days",
    artist: "Benjamin Tissot",
    image:"images/betterdays.jpg",
    path: "audio/betterdays.mp3"
  },
  {
    name: "Sunny",
    artist: "Benjamin Tissot",
    image: "images/sunny.jpg" ,
    path: "audio/sunny.mp3",
  },
];

//function to load songs  with song index as parameter.

function loadSong(songIndex) {
  //Calling function which resets the slider and timer values .
  resetValues();
  current_song.src = song_list[songIndex].path;
  current_song.load();
//assigning song name , artist , position of song in list and background image.
  song_art.style.backgroundImage = "url(" + song_list[songIndex].image + ")";
  song_name.textContent = song_list[songIndex].name;
  song_artist.textContent = song_list[songIndex].artist;
  currentSong.textContent = "PLAYING " + (songIndex + 1) + " OF " + song_list.length;

  timeUpdate = setInterval(seekUpdate, 2000);
  current_song.addEventListener("ended", nextSong);
   
}

// Load the first song  in the list by calling loadSong() function..
loadSong(songIndex);

//defining function to play song
function playSong() {
  current_song.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function ppauseSong() {
  if (!isPlaying) playSong();
  else pauseSong();
}
//defining function to pausing song
function pauseSong() {
  current_song.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}


//defining function to previous play song
function previousSong() {
  if (songIndex > 0)
    songIndex -= 1;
  else songIndex = song_list.length;
  loadSong(songIndex);
  playSong();
}

//defining function to play next song
function nextSong() {
  if (songIndex < song_list.length - 1)
    songIndex += 1;
  else songIndex = 0;
  loadSong(songIndex);
  playSong();
}
//defining function to changing the current song slider 
function seekingTo() {
  let seekingto = current_song.duration * (seekslider.value / 100);
  current_song.currentTime = seekingto;
}

//defining function to changing the current time for song 
function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(current_song.duration)) {
    seekPosition = current_song.currentTime * (100 / current_song.duration);

    seekslider.value = seekPosition;

    let durationMinutes = Math.floor(current_song.duration / 60);
    let durationSeconds = Math.floor(current_song.duration - durationMinutes * 60);
    let currentMinutes = Math.floor(current_song.currentTime / 60);
    let currentSeconds = Math.floor(current_song.currentTime - currentMinutes * 60);
    
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }

    now_time.textContent = currentMinutes + ":" + currentSeconds;
    total_time.textContent = durationMinutes + ":" + durationSeconds;
  }
}


//function to reset the slider and time values ..
function resetValues() {
  now_time.textContent = "00:00";
  total_time.textContent = "00:00";
  seekslider.value = 0;
}

//defining function to changing the current song volume slider 
function setVolume() {
  current_song.volume = volumeslider.value / 100;
}
