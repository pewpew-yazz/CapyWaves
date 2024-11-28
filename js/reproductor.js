// Lista de canciones
const songs = [
    { title: "Costa de susurros", artist: "Artista 1", src: "music/costa.mp3", cover: "covers/disco1.png", background: "covers/costa.jpg" },
    { title: "Noche entre Edificios", artist: "Artista 2", src: "music/edificios.mp3", cover: "covers/disco2.png", background: "covers/edificios.jpg" },
    { title: "Noche de Luna Llena", artist: "Artista 3", src: "music/luna.mp3", cover: "covers/disco3.png", background: "covers/luna.jpg" },
    { title: "Prado de Calma", artist: "Artista 4", src: "music/prado.mp3", cover: "covers/disco4.png", background: "covers/prado.jpg" },
    { title: "Fogata Bajo Estrellas", artist: "Artista 5", src: "music/fogata.mp3", cover: "covers/disco5.png", background: "covers/fogata.jpg" },
    { title: "Bosque de Luciérnagas", artist: "Artista 6", src: "music/luciernagas.mp3", cover: "covers/disco6.png", background: "covers/luciernagas.jpg" },
];

let currentSongIndex = 0;

// Leer el índice de la canción desde la URL
const urlParams = new URLSearchParams(window.location.search);
const songIndex = urlParams.get("song");
if (songIndex !== null && songIndex >= 0 && songIndex < songs.length) {
    currentSongIndex = parseInt(songIndex);
}

// Elementos DOM
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const favoriteButton = document.getElementById("favorite");
const audio = new Audio();
const title = document.getElementById("music-title");
const artist = document.getElementById("music-artist");
const cover = document.getElementById("music-cover");
const background = document.querySelector(".background");
const progress = document.getElementById("progress");
const playerProgress = document.getElementById("player-progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

// Favoritos
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Función para alternar favorito
function toggleFavorite() {
    const currentSong = songs[currentSongIndex].title;

    if (favorites.includes(currentSong)) {
        favorites = favorites.filter(song => song !== currentSong);
        favoriteButton.classList.remove("favorited");
    } else {
        favorites.push(currentSong);
        favoriteButton.classList.add("favorited");
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Actualizar ícono de favorito al cambiar canción
function updateFavoriteIcon() {
    const currentSong = songs[currentSongIndex].title;
    if (favorites.includes(currentSong)) {
        favoriteButton.classList.add("favorited");
    } else {
        favoriteButton.classList.remove("favorited");
    }
}

// Cargar canción
function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    audio.src = song.src;
    background.style.backgroundImage = `url('${song.background}')`;
    updateFavoriteIcon();
}

// Inicializar canción
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

// Eventos
playButton.addEventListener("click", playPause);
prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);
favoriteButton.addEventListener("click", toggleFavorite);
audio.addEventListener("timeupdate", updateProgress);
playerProgress.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);
