// Configuración del juego
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let pyramids = [];
let pyramidTips = [];
let spaceship;
let cursors;
let wasdKeys; // Contendrá las teclas A, W, S, D
let moveSound;
let isMoving = false;
let spaceshipActive = false; // Controla si la nave está activa

// Precarga de recursos
function preload() {
    this.load.image('pyramid', 'http://localhost/Capywaves/escenario/escenario2/fotos/fondoR.png');
    this.load.image('pyramidTip', 'http://localhost/Capywaves/escenario/escenario2/fotos/piramideR.png');
    this.load.image('spaceship', 'http://localhost/Capywaves/escenario/escenario2/fotos//naveR.png');
    this.load.image('cactus_static', 'http://localhost/Capywaves/escenario/escenario2/fotos/cactus1.2R.png');
    this.load.spritesheet('cactus_animated', 'http://localhost/Capywaves/escenario/escenario2/fotos/cactuspriteR.png', {
        frameWidth: 500,
        frameHeight: 500
    });
    this.load.audio('move_sound', 'fotos/navesonido.mp3'); // Asegúrate de usar la ruta correcta
}

// Creación de la escena
function create() {
    const scaleX = config.width / 1920;
    const scaleY = config.height / 1050;
    const scale = Math.min(scaleX, scaleY);

    // Crear pirámides con puntas
    for (let i = 0; i < 3; i++) {
        let pyramid = this.add.sprite((200 + i * 300) * scaleX, (config.height - 200) * scaleY, 'pyramid');
        pyramid.setScale(scaleX * 1.1, scaleY * 1.2);

        let pyramidTip = this.add.sprite((200 + i * 300) * scaleX, (config.height - 200) * scaleY, 'pyramidTip');
        pyramidTip.setScale(scaleX * 1.1, scaleY * 1.2);
        pyramidTip.setInteractive();

        pyramidTips.push(pyramidTip);

        // Interacción con la punta de la pirámide
        pyramidTip.on('pointerdown', function () {
            if (!spaceshipActive) { // Solo permite un clic si la nave no está activa
                this.tweens.add({
                    targets: pyramidTip,
                    y: pyramidTip.y - (50 * scaleY), // Subir al clic
                    duration: 1000,
                    ease: 'Sine.easeOut',
                    onComplete: () => {
                        // Aparecer nave justo en la punta
                        spaceship.setPosition(pyramidTip.x + 230, pyramidTip.y - 60);
                        spaceship.setActive(true).setVisible(true); // Hacer visible la nave
                        spaceshipActive = true; // Activar movimiento de la nave
                        moveSound.play();
                        pyramidTip.disableInteractive(); // Desactiva la interactividad de la punta

                        // Animación de flotación continua
                        this.tweens.add({
                            targets: pyramidTip,
                            y: pyramidTip.y + (20 * scaleY), // Flotación suave
                            yoyo: true,
                            repeat: -1,
                            duration: 1000,
                            ease: 'Sine.easeInOut'
                        });
                    }
                });
            }
        }, this);
    }

    // Crear nave espacial (invisible al inicio)
    spaceship = this.physics.add.sprite(-100, -100, 'spaceship'); // Fuera del canvas
    spaceship.setCollideWorldBounds(true);
    spaceship.setScale(scaleX * 0.2, scaleY * 0.2);
    spaceship.setActive(false).setVisible(false); // Ocultar al inicio

    // Crear múltiples cactus en diferentes posiciones horizontales, en el mismo eje Y
    let cactusPositionsX = [160, 600, 1200, 1650, 1800]; // Posiciones X de los cactus
    let cactusPositionsY = [140, 120, 140, 140, 120]; // Diferencias en el eje Y de cada cactus

    cactusPositionsX.forEach((xPos, index) => {
        // Usamos cactusPositionsY para definir la altura en Y
        let cactusY = (config.height + cactusPositionsY[index]) * scaleY;

        let cactus = this.add.sprite(xPos * scaleX, cactusY, 'cactus_static'); // Eje X y Y personalizados
        cactus.setScale(0.3); // Escala de los cactus
        cactus.setInteractive();

        cactus.on('pointerdown', () => {
            cactus.play('cactusAnimation'); // Reproducir animación
            cactus.once('animationcomplete', () => {
                cactus.setTexture('cactus_animated', 11); // Mantén el último frame
            });
        });
    });

    // Animaciones del cactus
    this.anims.create({
        key: 'cactusAnimation',
        frames: this.anims.generateFrameNumbers('cactus_animated', { start: 0, end: 11 }),
        frameRate: 14,
        repeat: 0
    });

    // Controles del teclado
    cursors = this.input.keyboard.createCursorKeys();
    wasdKeys = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
    });

    // Sonido de movimiento
    moveSound = this.sound.add('move_sound');
}

// Actualización de la escena
function update() {
    if (!spaceshipActive) return; // La nave no se mueve si no está activa

    isMoving = false;

    // Movimiento horizontal
    if (cursors.left.isDown || wasdKeys.left.isDown) {
        spaceship.setVelocityX(-200);
        isMoving = true;
    } else if (cursors.right.isDown || wasdKeys.right.isDown) {
        spaceship.setVelocityX(200);
        isMoving = true;
    } else {
        spaceship.setVelocityX(0);
    }

    // Movimiento vertical
    if (cursors.up.isDown || wasdKeys.up.isDown) {
        spaceship.setVelocityY(-200);
        isMoving = true;
    } else if (cursors.down.isDown || wasdKeys.down.isDown) {
        spaceship.setVelocityY(200);
        isMoving = true;
    } else if (!isMoving) {
        spaceship.setVelocityY(100);
    }

    // Reproducir sonido si la nave se mueve
    if (isMoving && !moveSound.isPlaying) {
        moveSound.play();
    } else if (!isMoving) {
        moveSound.stop();
    }
}
