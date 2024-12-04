// Configuración principal
const config = {  
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container', // ID del contenedor en HTML
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false, // Cambiar a false para ocultar las colisiones
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

const game = new Phaser.Game(config);

let player;
let buildings = [];
let cursors;
let escamaButton;
let jumpSound;
let scareSound;

// Variables de animación
let idleAnimation, jumpAnimation, scaredAnimation;

function preload() {
    // Fondo y elementos del escenario
    this.load.image('background', 'fotos/fondoRR.png'); // Fondo de la ciudad

    // Edificios
    this.load.image('building1', 'fotos/e1R.png'); // Edificio 1
    this.load.image('building2', 'fotos/e2R.png'); // Edificio 2
    this.load.image('building3', 'fotos/e3R.png'); // Edificio 3
    this.load.image('building4', 'fotos/e4R.png'); // Edificio 4
    this.load.image('building5', 'fotos/e5R.png'); // Edificio 5
    this.load.image('building6', 'fotos/e6R.png'); // Edificio 6
    this.load.image('building7', 'fotos/e7R.png'); // Edificio 7

    // Spritesheets para las animaciones del gato
    this.load.spritesheet('catIdle', 'fotos/reposoR.png', { frameWidth: 500, frameHeight: 500 }); // Animación de inactividad
    this.load.spritesheet('catJump', 'fotos/saltoR.png', { frameWidth: 392.857, frameHeight: 500 }); // Animación de salto
    this.load.spritesheet('catScared', 'fotos/escamasR.png', { frameWidth: 392.857, frameHeight: 500 }); // Animación de susto

    // Sonidos
    this.load.audio('jumpSound', ['fotos/salto.mp3', 'fotos/salto.ogg']); // Sonido de salto
    this.load.audio('scareSound', ['fotos/miau2.mp3', 'fotos/miau.ogg']); // Sonido de susto
}

let currentState = 'idle'; // Estado inicial del gato

function create() {
    // Desbloquear el AudioContext al primer clic o interacción
    this.input.once('pointerdown', () => {
        if (this.sound.context.state === 'suspended') {
            this.sound.context.resume().then(() => {
                console.log('AudioContext desbloqueado');
            }).catch(err => {
                console.error('Error desbloqueando AudioContext:', err);
            });
        }
    });

    // Fondo centrado y escalado para llenar el lienzo
    const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    background.setDisplaySize(config.width, config.height); // Ajusta el tamaño al canvas

    // Crear edificios individuales
    const buildingData = [
        { x: 150, y: 700, key: 'building1' },
        { x: 1400, y: 750, key: 'building2' },
        { x: 100, y: 700, key: 'building3' },
        { x: 1050, y: 700, key: 'building4' },
        { x: 400, y: 700, key: 'building5' },
        { x: 615, y: 700, key: 'building6' },
        { x: 494, y: 700, key: 'building7' },
    ];

    buildingData.forEach(data => {
        const building = this.physics.add.staticImage(data.x, data.y, data.key).setOrigin(0.5, 1);
        building.body.setSize(building.width, building.height); // Ajustar colisiones al tamaño del edificio
        building.body.setOffset(0, -250); // Ajustar offset de colisiones si es necesario
        buildings.push(building);
    });

    // Gato
    player = this.physics.add.sprite(50, 450, 'catIdle').setScale(0.35);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setSize(player.width * 0.4, player.height * 0.2);
    player.body.setOffset(player.width * 0.3, player.height * 0.5);

    const initialBuilding = buildings[0];
    player.setPosition(initialBuilding.x, initialBuilding.body.position.y - player.body.height / 1);

    // Configuración de colisiones individuales para cada edificio
    buildings.forEach(building => {
        this.physics.add.collider(player, building);
    });

    // Crear animaciones
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('catIdle', { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1,
    });

    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('catJump', { start: 0, end: 3 }),
        frameRate: 10,
    });

    this.anims.create({
        key: 'scared',
        frames: this.anims.generateFrameNumbers('catScared', { start: 0, end: 3 }),
        frameRate: 5,
    });

    // Controles
    cursors = this.input.keyboard.createCursorKeys();

    // Crear botón centrado con color rojo
    const buttonX = config.width / 2;
    const buttonY = config.height / 2 + 200;

    const buttonBackground = this.add.rectangle(buttonX, buttonY, 150, 50, 0xff0000, 1)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            if (currentState !== 'scared') {
                currentState = 'scared';
                if (scareSound) scareSound.play();
                console.log('Reproduciendo sonido de susto');
                player.anims.play('scared', true);

                // Volver a la animación de reposo después de maullar
                player.on('animationcomplete-scared', () => {
                    currentState = 'idle';
                    player.anims.play('idle', true);
                });
            }
        });

    this.add.text(buttonX, buttonY, '¡Asustar!', { fontSize: '20px', fill: '#ffffff', fontStyle: 'bold' })
        .setOrigin(0.5); // Centrar el texto dentro del botón

    // Cargar sonidos
    scareSound = this.sound.add('scareSound', { volume: 1 });
    jumpSound = this.sound.add('jumpSound', { volume: 1 });

    // Iniciar animación de reposo
    player.anims.play('idle');
}

function update() {
    if (currentState === 'jumping' || currentState === 'scared') return;

    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.flipX = true;
        currentState = 'walking';
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.flipX = false;
        currentState = 'walking';
    } else {
        player.setVelocityX(0);
        if (currentState !== 'idle') {
            currentState = 'idle';
            player.anims.play('idle', true);
        }
    }

    if (cursors.up.isDown && player.body.touching.down) {
        currentState = 'jumping';
        player.setVelocityY(-330);
        if (jumpSound) jumpSound.play();
        player.anims.play('jump', true);

        // Volver a la animación de reposo después del salto
        player.on('animationcomplete-jump', () => {
            currentState = 'idle';
            player.anims.play('idle', true);
        });
    }
}



function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.flipX = true;
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.flipX = false;
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
        jumpSound.play();
        player.anims.play('jump', true);
    }

    if (player.body.velocity.y === 0 && !cursors.up.isDown) {
        player.anims.play('idle', true);
    }
}
