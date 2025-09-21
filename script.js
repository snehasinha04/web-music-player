console.log("Welcome To Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3'); 
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = document.getElementsByClassName('songItem');

let songs = [
    {songName: "Dil Ibaadat", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Mere Bina",   filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Haan Tu Hain", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Khuda Jane", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Kya Mujhe Pyaar Hai ", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Tu Hi Meri Sab Hai", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Tu Jo Mila", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Tujhe Sochta Hoon", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Zara Sa", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
];

Array.from(songItems).forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener('click', ()=> {
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});


audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=> {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = ()=> {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
   element.addEventListener('click', (e) => {
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-circle-play');
    e.target.classList.add('fa-circle-pause');
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    });
});

document.getElementById('next').addEventListener('click', () => {
    if(songIndex >= songs.length - 1){
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', () => {
    if(songIndex <= 0){
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})
