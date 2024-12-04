const config = {
  type: Phaser.AUTO,
  parent: 'game-container', // Vincula el canvas al contenedor
  scale: {
    mode: Phaser.Scale.RESIZE, // Ajusta automáticamente el tamaño del canvas
    autoCenter: Phaser.Scale.CENTER_BOTH, // Centra el canvas
  },
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

let cuervo;
let cursors;
let cawButton;
let base;
let flySound, cawSound, fallSound;
let respawnTimer;

function preload() {
  // Carga de imágenes y sprites
  this.load.image('background', 'fotos/fondoR.png');
  this.load.image('base', 'fotos/base.png');
  this.load.spritesheet('cuervo', 'fotos/crowR.png', { frameWidth: 250, frameHeight: 250 });

  // Carga de sonidos
  this.load.audio('fly', 'fotos/fly.mp3');
  this.load.audio('caw', 'fotos/craw.mp3');
  this.load.audio('fall', 'fotos/fall.mp3');
}

function create() {
  // Respaldo para color de fondo si no se carga la imagen
  this.cameras.main.setBackgroundColor('#1d1d1d');

  // Fondo
  const background = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'background');
  background.setOrigin(0.5, 0.5);
  background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

  // Base (techo del edificio)
  base = this.physics.add.staticImage(750, 590, 'base').setDisplaySize(1100, 400);

  // Ajusta el área de colisión de la base
  base.setSize(2000, 100); // Define el ancho y alto del cuerpo físico
  base.setOffset(270, 200); // Opcional: Desplaza el área de colisión
  base.refreshBody(); // Asegura que los cambios al cuerpo de colisión se apliquen

  // Animaciones del cuervo
  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('cuervo', { start: 0, end: 3 }),
    frameRate: 5,
    repeat: -1
  });
  this.anims.create({
    key: 'fly',
    frames: this.anims.generateFrameNumbers('cuervo', { start: 9, end: 14 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'caw',
    frames: this.anims.generateFrameNumbers('cuervo', { start: 4, end: 7 }),
    frameRate: 8,
    repeat: 0
  });

  // Cuervo
  cuervo = this.physics.add.sprite(200, 50, 'cuervo').setScale(1);
  cuervo.setCollideWorldBounds(true);

  // Ajusta el área de colisión del cuervo
  cuervo.setSize(120, 120); // Cambia el ancho y alto del cuerpo de colisión
  cuervo.setOffset(70, 50); // Ajusta la posición del cuerpo dentro del sprite

  // Colisiones
  this.physics.add.collider(cuervo, base);

  // Controles
  cursors = this.input.keyboard.createCursorKeys();

  // Sonidos
  flySound = this.sound.add('fly');
  fallSound = this.sound.add('fall');
  cawSound = this.sound.add('caw');

  // Botón mejorado para el caw
  const button = this.add.rectangle(100, 100, 120, 50, 0xff5733, 1) // Botón rectangular azul
    .setInteractive({ useHandCursor: true }) // Cambia el cursor al pasar sobre el botón
    .on('pointerdown', () => { // Al hacer clic
      cuervo.play('caw');
      cawSound.play();
      button.setFillStyle(0x2980b9); // Cambia el color al presionar
    })
    .on('pointerup', () => { // Al soltar el clic
      button.setFillStyle(0x3498db); // Regresa al color original
    })
    .on('pointerover', () => { // Efecto al pasar el mouse
      button.setScale(1.1); // Aumenta ligeramente el tamaño
    })
    .on('pointerout', () => { // Al salir del mouse
      button.setScale(1); // Regresa al tamaño original
    });

  const buttonText = this.add.text(100, 100, 'Caw', { fontSize: '18px', color: '#fff' })
    .setOrigin(0.5);

  // Agrupa el botón y el texto
  this.add.container(0, 0, [button, buttonText]);
  
  // Reanudar contexto de audio después de una interacción
  this.input.once('pointerdown', () => {
    this.sound.context.resume().then(() => {
      console.log('Audio context resumed');
    });
  });
}



function update() {
  if (cursors.left.isDown) {
    cuervo.setVelocityX(-200);
    cuervo.flipX = true;
    if (cursors.up.isDown) {
      cuervo.play('fly', true);
      flySound.play();
    } else {
      cuervo.play('idle', true);
    }
  } else if (cursors.right.isDown) {
    cuervo.setVelocityX(200);
    cuervo.flipX = false;
    if (cursors.up.isDown) {
      cuervo.play('fly', true);
      flySound.play();
    } else {
      cuervo.play('idle', true);
    }
  } else {
    cuervo.setVelocityX(0);
    cuervo.play('idle', true);
  }

  if (cursors.up.isDown) {
    cuervo.setVelocityY(-200);
    cuervo.play('fly', true);
    flySound.play();
  }

  if (cuervo.y > 600) {
    // Cuando el cuervo cae fuera de la pantalla
    if (!respawnTimer) {
      fallSound.play();
      cuervo.setVisible(false);
      respawnTimer = this.time.delayedCall(2000, () => {
        cuervo.setPosition(400, 300);
        cuervo.setVisible(true);
        cuervo.setVelocity(0);
        respawnTimer = null;
      });
    }
  }
}
