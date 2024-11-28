// Lista de canciones
const songs = [
    {
        title: "Miau Miau",
        artist: "alexbtw",
        src: "music/wa wa.mp3",
        cover: "covers/capy.png",
        background: "covers/fogata.gif",
    },
    {
        title: "Liminal",
        artist: "alexbtw",
        src: "music/rain music.mp3",
        cover: "covers/capy.png",
        background: "covers/rain.jpg",
    },
    {
        title: "City",
        artist: "alexbtw",
        src: "music/city audio.mp3",
        cover: "covers/capy.png",
        background: "covers/city.jpg",
    },
    {
        title: "Crepúsculo en la Playa",
        artist: "Artista 4",
        src: "music/animacion.mp3",
        cover: "covers/capy.png",
        background: "covers/atardecer.gif",
    },
];

let currentSongIndex = 0;

// Elementos DOM
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const audio = new Audio();
const title = document.getElementById("music-title");
const artist = document.getElementById("music-artist");
const cover = document.getElementById("music-cover");
const background = document.querySelector(".background");
const progress = document.getElementById("progress");
const playerProgress = document.getElementById("player-progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

// Cargar canción
function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    audio.src = song.src;
    background.style.backgroundImage = `url('${song.background}')`;
}

// Cargar canción inicial
loadSong(songs[currentSongIndex]);

// Play & Pause
function playPause() {
    if (audio.paused) {
        audio.play();
        playButton.classList.replace("fa-play", "fa-pause");
    } else {
        audio.pause();
        playButton.classList.replace("fa-pause", "fa-play");
    }
}

// Cambiar canción
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
    playButton.classList.replace("fa-play", "fa-pause");
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
    playButton.classList.replace("fa-play", "fa-pause");
}

// Actualizar progreso
function updateProgress() {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Actualizar tiempos
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = duration ? formatTime(duration) : "0:00";
}

// Formatear tiempo
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

// Configurar progreso manualmente
function setProgress(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Eventos de botones
playButton.addEventListener("click", playPause);
prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
playerProgress.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);

// Eventos de teclado
document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
        playPause();
    } else if (e.code === "ArrowLeft") {
        prevSong();
    } else if (e.code === "ArrowRight") {
        nextSong();
    }
});