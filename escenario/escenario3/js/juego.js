const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1800,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let reno, cursors, snowman, chimney, hasTriggeredMessage = false;
let lightsOn = false; // Estado de las luces
let background; // Fondo dinámico
const phrases = [
    "¡Hace frío aquí en el Polo Norte!",
    "¿Has visto a Santa? Lo estoy buscando.",
    "¡El taller de juguetes está muy cerca!",
    "Rudolph siempre lidera el trineo, ¡pero yo también soy importante!",
    "Santa estará listo el 25. ¡No te preocupes!"
];

function preload() {
    // Cargar imágenes y sprites
    this.load.image('backgroundOff', 'fotos/fondoR.png'); // Fondo con luces apagadas
    this.load.image('backgroundOn', 'fotos/fondoPR.png'); // Fondo con luces encendidas
    this.load.spritesheet('snowman', 'fotos/mno.png', { frameWidth: 400, frameHeight: 230 });
    this.load.spritesheet('snowmanClick', 'fotos/msee.png', { frameWidth: 400, frameHeight: 230 });
    this.load.spritesheet('chimney', 'fotos/humoR.png', { frameWidth: 500, frameHeight: 400 });
    this.load.spritesheet('reno', 'fotos/renoR.png', { frameWidth: 245.3, frameHeight: 250 });
    this.load.image('snowflake', 'fotos/copo.png');
    this.load.glsl('vividColors', 'vividColors.glsl');

    // Cargar sonidos
    this.load.audio('snowmanClick', '../fotos/talk.mp3');
    this.load.audio('snowmanNear', '../fotos/scream.mp3');
    this.load.audio('renoSteps', '../fotos/pasos.mp3');
}

function create() {
    // Fondo inicial con luces apagadas
    background = this.add.image(0, 0, 'backgroundOff').setOrigin(0, 0);
    background.setDisplaySize(this.scale.width, this.scale.height);

    // Botón de switch para las luces
    const switchButton = this.add.text(50, 50, "Luces: OFF", {
        fontSize: "32px",
        fill: "#ffffff",
        backgroundColor: "#000000",
        padding: { x: 10, y: 5 }
    }).setInteractive();

    switchButton.on('pointerdown', () => {
        lightsOn = !lightsOn; // Alternar estado de las luces
        background.setTexture(lightsOn ? 'backgroundOn' : 'backgroundOff'); // Cambiar fondo
        switchButton.setText(`Luces: ${lightsOn ? "ON" : "OFF"}`); // Actualizar texto del botón
    });

    // Establecer los límites del mundo
    this.physics.world.setBounds(300, 300, 1200, 400);

    // Crear el reno
    reno = this.physics.add.sprite(2000, 500, 'reno').setCollideWorldBounds(true);

    // Animaciones del reno
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('reno', { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('reno', { start: 6, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('reno', { start: 9, end: 11 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('reno', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });

    // Crear el muñeco de nieve
    snowman = this.physics.add.sprite(200, 500, 'snowman').setInteractive();
    snowman.setScale(1.8);

    // Animaciones del muñeco de nieve
    this.anims.create({
        key: 'idleSnowman',
        frames: this.anims.generateFrameNumbers('snowman', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: 'clickSnowman',
        frames: this.anims.generateFrameNumbers('snowmanClick', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: 0 // Reproducir una vez
    });

    snowman.play('idleSnowman');

    // Mostrar frases aleatorias y animación al hacer clic en el muñeco de nieve
    snowman.on('pointerdown', () => {
        const randomPhrase = Phaser.Utils.Array.GetRandom(phrases); // Obtener una frase aleatoria
        const phraseText = this.add.text(
            snowman.x - 100,
            snowman.y - 100,
            randomPhrase,
            {
                fontSize: '24px',
                fill: '#ffffff',
                backgroundColor: '#000000',
                padding: { x: 10, y: 5 }
            }
        );

        // Cambiar a la animación de clic
        snowman.play('clickSnowman');

        // Reproducir sonido
        const clickSound = this.sound.add('snowmanClick');
        clickSound.play();

        // Limitar duración del sonido a 3 segundos
        this.time.addEvent({
            delay: 3000,
            callback: () => {
                if (clickSound.isPlaying) clickSound.stop();
            }
        });

        // Volver a la animación inicial después de 3 segundos
        this.time.addEvent({
            delay: 3000,
            callback: () => {
                snowman.play('idleSnowman');
            }
        });

        // Eliminar el texto después de 2 segundos
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                phraseText.destroy();
            }
        });
    });

    this.physics.add.overlap(reno, snowman, handleSnowmanOverlap, null, this);

    // Crear la chimenea
    chimney = this.physics.add.sprite(950, 210, 'chimney');
    chimney.setScale(0.5); // Aumenta el tamaño un 50% en ambas dimensiones

    this.anims.create({
        key: 'smoke',
        frames: this.anims.generateFrameNumbers('chimney', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
    });
    chimney.play('smoke');

    cursors = this.input.keyboard.createCursorKeys();

    reno.stepSound = this.sound.add('renoSteps', { loop: true });
}

function handleSnowmanOverlap() {
    if (!hasTriggeredMessage) {
        hasTriggeredMessage = true;
        const messageText = this.add.text(
            snowman.x - 100, 
            snowman.y - 150, 
            "¡No me quites mi nariz!", 
            {
                fontSize: '24px',
                fill: '#ffffff',
                backgroundColor: '#000000',
                padding: { x: 10, y: 5 }
            }
        );

        const sound = this.sound.add('snowmanNear');
        sound.play();

        // Eliminar el mensaje después de 2 segundos
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                messageText.destroy();
                hasTriggeredMessage = false;
            }
        });
    }
}


function update() {
    reno.body.setVelocity(0);

    let isWalking = false;

    if (cursors.left.isDown) {
        reno.body.setVelocityX(-200);
        reno.play('left', true);
        isWalking = true;
    } else if (cursors.right.isDown) {
        reno.body.setVelocityX(200);
        reno.play('right', true);
        isWalking = true;
    } else if (cursors.up.isDown) {
        reno.body.setVelocityY(-200);
        reno.play('up', true);
        isWalking = true;
    } else if (cursors.down.isDown) {
        reno.body.setVelocityY(200);
        reno.play('down', true);
        isWalking = true;
    } else {
        reno.anims.stop();
    }

    if (isWalking && !reno.stepSound.isPlaying) {
        reno.stepSound.play();
    } else if (!isWalking && reno.stepSound.isPlaying) {
        reno.stepSound.stop();
    }
}
