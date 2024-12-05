// Lista de canciones
const songs = [
    { 
        title: "Costa de susurros", 
        artist: "CapyWaves", 
        src: "http://localhost/Capywaves/music/ranas8d.mp3", 
        cover: "http://localhost/Capywaves/covers/disco1.png", 
        scene: "http://localhost/Capywaves/escenario/escenario1/juego.html"
    },
    { 
        title: "Noche entre Edificios", 
        artist: "CapyWaves", 
        src: "http://localhost/Capywaves/music/desierto8d.mp3", 
        cover: "http://localhost/Capywaves/covers/disco2.png", 
        scene: "http://localhost/Capywaves/escenario/escenario2/juego.html"
    },
    { 
        title: "Noche entre Edificios", 
        artist: "CapyWaves", 
        src: "http://localhost/Capywaves/music/cabaña8d.mp3", 
        cover: "http://localhost/Capywaves/covers/disco3.png", 
        scene: "http://localhost/Capywaves/escenario/escenario3/juego.html"
    },
    { 
        title: "Noche entre Edificios", 
        artist: "CapyWaves", 
        src: "http://localhost/Capywaves/music/cafe8d.mp3", 
        cover: "http://localhost/Capywaves/covers/disco4.png", 
        scene: "http://localhost/Capywaves/escenario/escenario4/juego.html"
    },
    { 
        title: "Noche entre Edificios", 
        artist: "CapyWaves", 
        src: "http://localhost/Capywaves/music/cuervo8d.mp3", 
        cover: "http://localhost/Capywaves/covers/disco5.png", 
        scene: "http://localhost/Capywaves/escenario/escenario5/juego.html"
    },
    { 
        title: "Noche entre Edificios", 
        artist: "CapyWaves", 
        src: "http://localhost/Capywaves/music/city8d.mp3", 
        cover: "http://localhost/Capywaves/covers/disco6.png", 
        scene: "http://localhost/Capywaves/escenario/escenario6/juego.html"
    },

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
            background.style.backgroundImage = `url('${song.cover}')`;
            updateFavoriteIcon();
        
            // Cambiar el escenario en el iframe
            const iframe = document.getElementById("game-iframe");
            iframe.src = song.scene;
        }
        

        // Inicializar canción
        loadSong(songs[currentSongIndex]);

        // Play & Pause
        function playPause() {
            if (audio.paused) {
                audio.play();
                playButton.classList.replace("fa-play", "fa-pause");
                cover.style.animationPlayState = "running";
            } else {
                audio.pause();
                playButton.classList.replace("fa-pause", "fa-play");
                cover.style.animationPlayState = "paused";
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

        // Control de canciones con las flechas del teclado
        document.addEventListener("keydown", function (e) {
            if (e.code === "Space") {
                e.preventDefault(); // Evita el scroll por defecto de la tecla espacio
                playPause(); // Llama a la función para reproducir o pausar
            } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                nextSong(); // Cambiar a la siguiente canción
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                prevSong(); // Cambiar a la canción anterior
            }
        });