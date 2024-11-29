
var config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 700,
    parent: 'game-conteiner',
    physics: {
        default: 'arcade', // Activamos físicas
        arcade: {
            gravity: { y: 0 }, // Sin gravedad (movimiento lateral)
            debug: false      // Desactivar el modo debug
        }
    },
    scene: {
        key:'mainScene',
        preload: preload,
        create: create,
        update: update,
        endGame: function() {
            console.log("se ejecutó endGame");
            gameOver = true;
            this.add.text(centerX, centerY - 30, 'GAME OVER', { fontSize: '68px', fill: '#ff0000' }).setOrigin(0.5);
            this.add.text(centerX, centerY + 40, 'Puntaje final: ' + score, { fontSize: '32px', fill: '#ff0000' }).setOrigin(0.5);

             // Guardar el puntaje en la tabla de puntajes altos
    saveHighScore(score);
    
            this.physics.pause();
            this.input.keyboard.enabled = false;

             // Mostrar puntajes más altos
            displayHighScores();
            
             // Mostrar botón de reinicio
    const restartBtn = document.getElementById('restart-btn');
    restartBtn.style.display = 'block';
    restartBtn.addEventListener('click', restartGame);
        }
    }
};

var game = new Phaser.Game(config);
var score = 0;
var lives = 3;
var ganchoMoving = false;
var ganchoBusy =false;
var livesText;
var gameOver = false; // Estado del juego



function preload(){
    this.load.image('fondo', 'assets/fondo2.png' );
    this.load.spritesheet('cap', 'assets/capyreposoR.png', {frameWidth: 1000, frameHeight: 500});
    this.load.image('fish', 'assets/pez2.2.png');
    this.load.image('fish2', 'assets/pez2.1.png');
    this.load.image('naranja', 'assets/naranja.png');
    this.load.image('gancho', 'assets/cañaR.png');
    this.load.image('shark', 'assets/shark2.png');
}
function create(){
    this.add.image(540, 350,'fondo');

        // Reactivar controles
        this.input.keyboard.enabled = true;

      // Crear al jugador con físicas
    player = this.physics.add.sprite(config.width / 2, 50, 'cap');
      player.setCollideWorldBounds(true); // Evitar que salga de los límites
    player.setScale(0.4);

    // Ajustar el hitbox
    player.setBodySize(600, 500); // Redimensionar hitbox
    player.setOffset(400, 100);     // Desplazar hitbox


    // Crear animaciones para el movimiento
    this.anims.create({
        key: 'moveLeft',
        frames: this.anims.generateFrameNumbers('cap', { start: 0, end: 3 }), // Cambia según tu spritesheet
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'moveRight',
        frames: this.anims.generateFrameNumbers('cap', { start: 3, end: 5 }), // Cambia según tu spritesheet
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'idle',
        frames: [{ key: 'cap', frame: 0 }], // Cuadro para reposo
        frameRate: 1
    });

    
     // Crear el gancho como un sprite adicional
    gancho = this.physics.add.sprite(player.x, player.y -30, 'gancho');
     gancho.setScale(0.1); // Escala del gancho

    // Crear grupo de peces
    fishGroup = this.physics.add.group({
        key: 'fish',
        repeat: 3, // Número de peces adicionales (5 + 1 inicial)
        setScale: { x: 0.1, y: 0.1 }, // Escala de los peces
        setXY: {
            x: 10, // Primera posición x
            y: 450, // Altura aleatoria en la zona del jugador
            stepX: 120 // Separación horizontal entre los peces
        }
        
    });
    
    

    // Configurar el movimiento lateral para cada pez
    fishGroup.children.iterate(function (fish) {
        fish.setVelocityX(Phaser.Math.Between(40, 100)); // Velocidad aleatoria
        fish.setCollideWorldBounds(true);
        fish.setBounce(1); // Rebote al tocar los bordes
                // Cambiar orientación según la dirección
                fish.body.onWorldBounds = true;
                fish.scene.physics.world.on('worldbounds', function (body) {
                    if (body.gameObject === fish) {
                        fish.setFlipX(fish.body.velocity.x < 0); // Voltear a la izquierda si la velocidad es negativa
                    }
                });
        // Ajustar hitbox para cada pez
    fish.setBodySize(800, 500); // Dimensiones de la hitbox (ancho, alto)
    fish.setOffset(30, 200); // Desplazamiento de la hitbox dentro del sprite
    });
    

        // Crear grupo de peces
        fishGroup2 = this.physics.add.group({
            key: 'fish',
            repeat: 4, // Número de peces adicionales (5 + 1 inicial)
            setScale: { x: 0.1, y: 0.1 }, // Escala de los peces
            setXY: {
                x: 600, // Primera posición x
                y: 300, // Altura aleatoria en la zona del jugador
                stepX: 120 // Separación horizontal entre los peces
            }
        });
        
    
        // Configurar el movimiento lateral para cada pez
        fishGroup2.children.iterate(function (fish) {
            fish.setVelocityX(Phaser.Math.Between(40, 100)); // Velocidad aleatoria
            fish.setCollideWorldBounds(true);
            fish.setBounce(1); // Rebote al tocar los bordes
                    // Cambiar orientación según la dirección
        fish.body.onWorldBounds = true;
        fish.scene.physics.world.on('worldbounds', function (body) {
            if (body.gameObject === fish) {
                fish.setFlipX(fish.body.velocity.x < 0); // Voltear a la izquierda si la velocidad es negativa
            }
        });
            fish.setBodySize(800, 500); // Dimensiones de la hitbox (ancho, alto)
    fish.setOffset(30, 200); // Desplazamiento de la hitbox dentro del sprite
        });
        // Crear grupo de peces
    fishGroup3 = this.physics.add.group({
        key: 'fish',
        repeat: 3, // Número de peces adicionales (5 + 1 inicial)
        setScale: { x: 0.1, y: 0.1 }, // Escala de los peces
        setXY: {
            x: 10, // Primera posición x
            y: 350, // Altura aleatoria en la zona del jugador
            stepX: 120 // Separación horizontal entre los peces
        }
    });

     // Configurar el movimiento lateral para cada pez
    fishGroup3.children.iterate(function (fish) {
        fish.setVelocityX(Phaser.Math.Between(40, 100)); // Velocidad aleatoria
        fish.setCollideWorldBounds(true);
        fish.setBounce(1); // Rebote al tocar los bordes
                // Cambiar orientación según la dirección
                fish.body.onWorldBounds = true;
                fish.scene.physics.world.on('worldbounds', function (body) {
                    if (body.gameObject === fish) {
                        fish.setFlipX(fish.body.velocity.x < 0); // Voltear a la izquierda si la velocidad es negativa
                    }
                });
        fish.setBodySize(800, 500); // Dimensiones de la hitbox (ancho, alto)
    fish.setOffset(30, 200); // Desplazamiento de la hitbox dentro del sprite
    });
     // Crear grupo de peces
    fishGroup4 = this.physics.add.group({
        key: 'fish',
        repeat: 4, // Número de peces adicionales (5 + 1 inicial)
        setScale: { x: 0.1, y: 0.1 }, // Escala de los peces
        setXY: {
            x: 250, // Primera posición x
            y: 550, // Altura aleatoria en la zona del jugador
            stepX: 120 // Separación horizontal entre los peces
        }
    });
    

    // Configurar el movimiento lateral para cada pez
    fishGroup4.children.iterate(function (fish) {
        fish.setVelocityX(Phaser.Math.Between(40, 100)); // Velocidad aleatoria
        fish.setCollideWorldBounds(true);
        fish.setBounce(1); // Rebote al tocar los bordes
                // Cambiar orientación según la dirección
                fish.body.onWorldBounds = true;
                fish.scene.physics.world.on('worldbounds', function (body) {
                    if (body.gameObject === fish) {
                        fish.setFlipX(fish.body.velocity.x < 0); // Voltear a la izquierda si la velocidad es negativa
                    }
                });
        fish.setBodySize(800, 500); // Dimensiones de la hitbox (ancho, alto)
    fish.setOffset(30, 200); // Desplazamiento de la hitbox dentro del sprite
    });

         // Crear grupo de peces
        fishGroup5 = this.physics.add.group({
            key: 'fish',
            repeat: 4, // Número de peces adicionales (5 + 1 inicial)
            setScale: { x: 0.1, y: 0.1 }, // Escala de los peces
            setXY: {
                x: 400, // Primera posición x
                y: 470, // Altura aleatoria en la zona del jugador
                stepX: 120 // Separación horizontal entre los peces
            }
        });
        
    
        // Configurar el movimiento lateral para cada pez
        fishGroup5.children.iterate(function (fish) {
            fish.setVelocityX(Phaser.Math.Between(40, 100)); // Velocidad aleatoria
            fish.setCollideWorldBounds(true);
            fish.setBounce(1); // Rebote al tocar los bordes
                    // Cambiar orientación según la dirección
        fish.body.onWorldBounds = true;
        fish.scene.physics.world.on('worldbounds', function (body) {
            if (body.gameObject === fish) {
                fish.setFlipX(fish.body.velocity.x < 0); // Voltear a la izquierda si la velocidad es negativa
            }
        });
            fish.setBodySize(800, 500); // Dimensiones de la hitbox (ancho, alto)
    fish.setOffset(30, 200); // Desplazamiento de la hitbox dentro del sprite
        });
    
      // Crear la naranja con físicas
    naranja = this.physics.add.sprite(config.width / 3, 650, 'naranja').setScale(0.2);
      naranja.setVelocityX(40); // Velocidad horizontal más lenta
      naranja.setCollideWorldBounds(true); // Evitar que salga de los límites
      naranja.setBounce(1); // Rebote al tocar los bordes

    // Función para actualizar la dirección de rotación de la naranja al chocar con un borde
naranja.body.onWorldBounds = true; // Detectar colisiones con los bordes del mundo
this.physics.world.on('worldbounds', function(body) {
    if (body.gameObject === naranja) {
        // Detectar si choca con el borde derecho
        if (naranja.body.velocity.x > 0) {
            // Girar hacia la izquierda
            naranja.angle = 90; // Ajustar el ángulo a una rotación visual hacia la izquierda
        }
        // Detectar si choca con el borde izquierdo
        else if (naranja.body.velocity.x < 0) {
            // Girar hacia la derecha
            naranja.angle = -90; // Ajustar el ángulo a una rotación visual hacia la derecha
        }
    }
});

       // Crear la piraña con movimiento rápido
    shark = this.physics.add.sprite(1000, 340, 'shark').setScale(0.2);
    shark.setVelocityX(Phaser.Math.Between(90, 250)); // Velocidad más rápida
    shark.setCollideWorldBounds(true);
    shark.setBounce(1);
    // Cambiar orientación según la dirección
shark.body.onWorldBounds = true; // Detectar colisiones con bordes del mundo
this.physics.world.on('worldbounds', function (body) {
    if (body.gameObject === shark) {
        shark.setFlipX(shark.body.velocity.x < 0); // Voltear a la izquierda si la velocidad es negativa
    }
});

    // Ajustar el tamaño y la posición de la hitbox
shark.setBodySize(800, 300); // Dimensiones de la hitbox (ancho, alto)
shark.setOffset(80, 400); // Desplazamiento de la hitbox desde la esquina superior izquierda



          // Crear la piraña con movimiento rápido
        shark2 = this.physics.add.sprite(800, 550, 'shark').setScale(0.2);
        shark2.setVelocityX(Phaser.Math.Between(100, 250)); // Velocidad más rápida
        shark2.setCollideWorldBounds(true);
        shark2.setBounce(1);
            // Cambiar orientación según la dirección
shark2.body.onWorldBounds = true; // Detectar colisiones con bordes del mundo
this.physics.world.on('worldbounds', function (body) {
    if (body.gameObject === shark2) {
        shark2.setFlipX(shark2.body.velocity.x < 0); // Voltear a la izquierda si la velocidad es negativa
    }
});
            // Ajustar el tamaño y la posición de la hitbox
shark2.setBodySize(800, 300); // Dimensiones de la hitbox (ancho, alto)
shark2.setOffset(80, 400); // Desplazamiento de la hitbox desde la esquina superior izquierda


   // Crear la piraña con movimiento rápido
shark3 = this.physics.add.sprite(100, 400, 'shark').setScale(0.2);
   shark3.setVelocityX(Phaser.Math.Between(90, 250)); // Velocidad más rápida
shark3.setCollideWorldBounds(true);
shark3.setBounce(1);
    // Cambiar orientación según la dirección
    shark3.body.onWorldBounds = true; // Detectar colisiones con bordes del mundo
    this.physics.world.on('worldbounds', function (body) {
        if (body.gameObject === shark3) {
            shark3.setFlipX(shark3.body.velocity.x < 0); // Voltear a la izquierda si la velocidad es negativa
        }
    });

   // Ajustar el tamaño y la posición de la hitbox
shark3.setBodySize(800, 300); // Dimensiones de la hitbox (ancho, alto)
shark3.setOffset(80, 400); // Desplazamiento de la hitbox desde la esquina superior izquierda

     // Configurar texto de puntuación
    scoreText = this.add.text(10, 10, 'Puntos: 0', { fontSize: '32px', fill: '#000' });
    livesText = this.add.text(10, 50, 'Vidas: 3', { fontSize: '32px', fill: '#000' });


     // Configurar teclas
    cursors = this.input.keyboard.createCursorKeys();
    spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

     // Colisiones entre el gancho y los objetos
    this.physics.add.overlap(gancho, fishGroup, collectFish, null, this);
    this.physics.add.overlap(gancho, fishGroup2, collectFish, null, this);
    this.physics.add.overlap(gancho, fishGroup3, collectFish, null, this);
    this.physics.add.overlap(gancho, fishGroup4, collectFish, null, this);
    this.physics.add.overlap(gancho, fishGroup5, collectFish, null, this);
    this.physics.add.overlap(gancho, naranja, collectNaranja, null, this);
    this.physics.add.overlap(gancho, shark, touchshark, null, this);
    this.physics.add.overlap(gancho, shark2, touchshark, null, this);
    this.physics.add.overlap(gancho, shark3, touchshark, null, this);

    
    
}
function update(){
      // Movimiento de la naranja: rotación constante
      naranja.angle += 1; // Incrementar el ángulo para que gire
    
        // Reiniciar velocidad del jugador
        player.setVelocityX(1);

        // Movimiento hacia la izquierda
        if (cursors.left.isDown) {
            player.setVelocityX(-200);
            player.anims.play('moveLeft', true);
        }
        // Movimiento hacia la derecha
        else if (cursors.right.isDown) {
            player.setVelocityX(200);
            player.anims.play('moveRight', true);
        }
        // Sin movimiento, mostrar animación en reposo
    else {
        player.anims.play('idle');
    }
         // Movimiento del gancho
    if (!ganchoMoving) {
        gancho.x = player.x + 40; // Ajustar posición del gancho
        gancho.y = player.y + 70;
    }

    if (Phaser.Input.Keyboard.JustDown(spaceKey) && !ganchoMoving) {
        ganchoMoving = true;
        gancho.setVelocityY(200); // Mover hacia abajo
    }

    // Detener el gancho si sale de los límites inferiores
    if (gancho.y > config.height) {
        resetGancho();
    }
}

function resetGancho() {
    gancho.setVelocityY(0);
    gancho.y = player.y -40;
    ganchoBusy = false;
    ganchoMoving = false;
    
}

function collectFish(gancho, fish) {
    if(ganchoBusy) return;
    ganchoBusy = true;
    score += 25;
    scoreText.setText('Puntos: ' + score);
    // Destruir el pez temporalmente y reactivarlo después de 5 segundos
    fish.disableBody(true, true); // Desactiva el objeto en lugar de destruirlo
    this.time.delayedCall(5000, () => {
        fish.enableBody(true, Phaser.Math.Between(50, config.width - 50), Phaser.Math.Between(200, config.height - 200), true, true);
        fish.setVelocityX(Phaser.Math.Between(40, 100)); // Reaparecer con nueva velocidad
    });
    resetGancho();
}

function collectNaranja(gancho, naranja) {
    if(ganchoBusy) return;
    ganchoBusy = true;
    score += 10000;
    scoreText.setText('Puntos: ' + score);
        // Destruir la naranja temporalmente y reactivarla después de 5 segundos
        naranja.disableBody(true, true); // Desactiva el objeto en lugar de destruirlo
        this.time.delayedCall(5000, () => {
            naranja.enableBody(true, Phaser.Math.Between(50, config.width - 50), Phaser.Math.Between(200, config.height - 200), true, true);
            naranja.setVelocityX(40); // Reaparecer con velocidad original
        });
    resetGancho();
}
function touchshark(gancho, shark) {
    if(ganchoBusy) return;
    ganchoBusy = true;
    lives--;
    console.log("vidas restantes: " + lives);
    livesText.setText('vidas: ' + lives);
    
    if (lives <= 0) {
        endGame.bind(this)(); // Forzar el contexto correcto
    } else {
        resetGancho();
    }
}

function endGame() {
    console.log("se ejecutó endGame");
    gameOver = true;

    // Calcular posición central
    const centerX = config.width / 2;
    const centerY = config.height / 2;

    // Mostrar mensaje de fin de juego
    this.add.text(centerX, centerY - 50, 'GAME OVER', {
        fontFamily: 'Arial Black',
        fontSize: '68px',
        fill: '#fc2828'
    }).setOrigin(0.5);

    this.add.text(centerX, centerY + 50, 'Puntaje final: ' + score, {
        fontFamily: 'Arial Black',
        fontSize: '32px',
        fill: '#ffffff'
    }).setOrigin(0.5);

    // Guardar el puntaje
    saveScore(score);

    // Detener físicas y controles
    this.input.keyboard.enabled = false;

    // Mostrar botón de reinicio
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.style.display = 'block';
        restartBtn.style.position = 'absolute';
        restartBtn.style.left = `${centerX - restartBtn.offsetWidth / 2}px`;
        restartBtn.style.top = `${centerY + 150}px`;

        restartBtn.removeEventListener('click', restartGame); // Elimina eventos previos
        restartBtn.addEventListener('click', restartGame);   // Agrega evento para reiniciar
    }
    // Mostrar botón para ver puntajes
    const viewScoresBtn = document.getElementById('view-scores-btn');
    if (viewScoresBtn) {
        viewScoresBtn.style.display = 'block';
        viewScoresBtn.style.position = 'absolute';
        viewScoresBtn.style.left = `${centerX - viewScoresBtn.offsetWidth / 2}px`;
        viewScoresBtn.style.top = `${centerY + 210}px`;

        viewScoresBtn.removeEventListener('click', redirectToScores); // Elimina eventos previos
        viewScoresBtn.addEventListener('click', redirectToScores);   // Agrega evento para redirigir
    }
}
// Función para redirigir a scores.html
function redirectToScores() {
    window.location.href = 'scores.html';
}

const scoreTable = document.getElementById('scoreTable').querySelector('tbody');
const clearScoresButton = document.getElementById('clearScores');

// Función para cargar puntajes (los mejores 3 del jugador)
function loadScores() {
    const scores = JSON.parse(localStorage.getItem('playerScores')) || [];
    scoreTable.innerHTML = ''; // Limpia la tabla
    scores.forEach((score, index) => {
        addRow(index + 1, score); // Agrega cada puntaje a la tabla
    });
}
// Función para agregar una fila
function addRow(position, score) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${position}</td>
        <td>${score}</td>
    `;
    scoreTable.appendChild(row);
}
// Función para guardar puntajes (solo si están en el top 3)
function saveScore(finalScore) {
    let scores = JSON.parse(localStorage.getItem('playerScores')) || [];
    if (scores.length < 3 || finalScore > Math.min(...scores)) {
        scores.push(finalScore); // Agrega el nuevo puntaje
        scores.sort((a, b) => b - a); // Ordena de mayor a menor
        scores = scores.slice(0, 3); // Mantén solo los 3 mejores puntajes
        localStorage.setItem('playerScores', JSON.stringify(scores)); // Guarda en localStorage
        loadScores(); // Actualiza la tabla
        console.log(`Nuevo puntaje registrado: ${finalScore}`);
    } else {
        console.log(`Puntaje ${finalScore} no es lo suficientemente alto para el top 3.`);
    }
}
// Limpiar todos los puntajes
clearScoresButton.addEventListener('click', () => {
    localStorage.removeItem('playerScores'); // Limpia el almacenamiento
    loadScores(); // Actualiza la tabla
});

// Función para registrar puntaje tras una partida
function registerPlayerScore(finalScore) {
    saveScore(finalScore); // Guarda el puntaje generado por el jugador
}

// Inicializar
loadScores();
setInterval(simulateGameEnd, 5000); // Prueba automática

function finalizarPartida() {
    const puntuacionFinal = calcularPuntaje(); // Supongamos que esta función calcula el puntaje
    // Aquí conectamos con el código de la tabla
    saveScore(puntuacionFinal);
}

// Función para reiniciar el juego
function restartGame() {
    // Ocultar el botón de reinicio
    const restartBtn = document.getElementById('restart-btn');
    restartBtn.style.display = 'none';

    // Ocultar el botón de ver puntajes
    const viewScoresBtn = document.getElementById('view-scores-btn');
    if (viewScoresBtn) {
        viewScoresBtn.style.display = 'none';
    }

    // Reiniciar variables globales
    score = 0;
    lives = 3;
    gameOver = false;
    ganchoMoving = false;
    ganchoBusy = false;

       // Reiniciar texto en pantalla
    scoreText.setText('Puntos: 0');
    livesText.setText('Vidas: 3');

       // Limpiar tabla de puntajes
    const tableBody = document.getElementById('scores-table-body');
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    // Recargar la escena actual
    game.scene.keys.mainScene.scene.restart();
}