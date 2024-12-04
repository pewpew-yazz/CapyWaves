const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    backgroundColor: "#1d313b",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
};

const game = new Phaser.Game(config);

let ranas = []; // Array para manejar las ranas.
let sonidoCroak; // Sonido del croak
let hongos = []; // Array para manejar los hongos.
let hongosApagados = true; // Estado inicial de los hongos.


function preload() {
    // Cargar los spritesheet de las ranas (reposo y croak).
    this.load.spritesheet("ranaAmarilla", "http://localhost/Capywaves/escenario/escenario1/fotos/ranaaafk.png", { frameWidth: 375, frameHeight: 375 });
    this.load.spritesheet("ranaMorada", "http://localhost/Capywaves/escenario/escenario1/fotos/ranamafk.png", { frameWidth: 375, frameHeight: 375 });
    this.load.spritesheet("ranaVerde", "http://localhost/Capywaves/escenario/escenario1/fotos/ranavafk.png", { frameWidth: 375, frameHeight: 375 });
    this.load.spritesheet("ranaAmarillaCroak", "http://localhost/Capywaves/escenario/escenario1/fotos/ranaacroak.png", { frameWidth: 374.6, frameHeight: 374});
    this.load.spritesheet("ranaMoradaCroak", "http://localhost/Capywaves/escenario/escenario1/fotos/ranamcroak.png", { frameWidth: 374.6, frameHeight: 374 });
    this.load.spritesheet("ranaVerdeCroak", "http://localhost/Capywaves/escenario/escenario1/fotos/ranavcroak.png", { frameWidth: 374.6, frameHeight: 374 });

    // Cargar sonido
    this.load.audio("sonidoCroak", "http://localhost/Capywaves/escenario/escenario1/fotos/croak.mp3");

    // Cargar hongos
    this.load.image('hongoPrendido', 'http://localhost/Capywaves/escenario/escenario1/fotos/base1-1R.png');
    this.load.image('hongoApagado', 'http://localhost/Capywaves/escenario/escenario1/fotos/base1-2R.png');
}

function create() {
    // Crear animaciones para las ranas
    this.anims.create({
        key: 'reposoAmarillo',
        frames: this.anims.generateFrameNames('ranaAmarilla', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'reposoMorado',
        frames: this.anims.generateFrameNames('ranaMorada', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'reposoVerde',
        frames: this.anims.generateFrameNames('ranaVerde', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'croakAmarillo',
        frames: this.anims.generateFrameNames('ranaAmarillaCroak', { start: 0, end: 10 }),
        frameRate: 10,
        repeat: 0
    });
    this.anims.create({
        key: 'croakMorado',
        frames: this.anims.generateFrameNames('ranaMoradaCroak', { start: 0, end: 10 }),
        frameRate: 10,
        repeat: 0
    });
    this.anims.create({
        key: 'croakVerde',
        frames: this.anims.generateFrameNames('ranaVerdeCroak', { start: 0, end: 10 }),
        frameRate: 10,
        repeat: 0
    });

    // Verificar que el sonido esté correctamente cargado
    sonidoCroak = this.sound.add("sonidoCroak");

    // Posiciones iniciales de las ranas (ajustadas para no solaparse)
    const posiciones = [
        { x: 500, y: 380, keyReposo: "ranaAmarilla", keyCroak: "ranaAmarillaCroak", animReposo: 'reposoAmarillo', animCroak: 'croakAmarillo' },
        { x: 800, y: 300, keyReposo: "ranaMorada", keyCroak: "ranaMoradaCroak", animReposo: 'reposoMorado', animCroak: 'croakMorado' },
        { x: 1000, y: 440, keyReposo: "ranaVerde", keyCroak: "ranaVerdeCroak", animReposo: 'reposoVerde', animCroak: 'croakVerde' },
    ];

    // Crear cada rana con su animación de reposo por defecto
    // Crear cada rana con su animación de reposo por defecto
posiciones.forEach((pos) => {
    let rana = this.add.sprite(pos.x, pos.y, pos.keyReposo).setInteractive();
    rana.setDisplaySize(70, 70); // Redimensionar si es necesario
    ranas.push({ rana, keyReposo: pos.keyReposo, keyCroak: pos.keyCroak });

    // Asegurarse de que la rana inicie con la animación de reposo
    rana.anims.play(pos.animReposo, true); // Iniciar la animación de reposo desde el principio

    // Al hacer clic en la rana, cambiar a la animación de croak.
    rana.on("pointerdown", () => {
        console.log("Rana clickeada: ", pos.keyReposo);
        sonidoCroak.play();
        rana.anims.play(pos.animCroak, true); // Activar la animación de croak

        // Volver a la animación de reposo después de 1.5 segundos
        this.time.delayedCall(1500, () => {
            rana.anims.play(pos.animReposo, true); // Volver a la animación de reposo
        });
    });

    // Asegurarse de que las ranas estén encima de los hongos
    rana.setDepth(1);
});


    // Crear el fondo de hongos
    let hongo = this.add.sprite(0, 0, 'hongoPrendido');
    hongo.setOrigin(0.5, 0.5); // Centrar la imagen
    hongo.setDisplaySize(1000, 500); // Escalar la imagen para ocupar toda la pantalla
    hongo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2); // Centrar la imagen
    hongos.push(hongo);

    // Crear más hongos
    for (let i = 0; i < 4; i++) {
        let hongo = this.add.sprite(50 + (i * 250), 550, 'hongoApagado');
        hongo.setOrigin(0.5, 0.5);
        hongo.setDisplaySize(1000, 500);
        hongo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2); // Centrar
        hongos.push(hongo);
        hongo.setDepth(0); // Asegurarse de que los hongos estén debajo de las ranas
    }

    // Agregar el evento al botón
    const botonHongos = document.getElementById('botonHongos');
    if (botonHongos) {
        botonHongos.addEventListener('click', () => {
            console.log('Botón de hongos clickeado');
            toggleHongos();
        });
    }
}


// Función que activa o desactiva los hongos
function toggleHongos() {
    console.log('Estado de hongos: ', hongosApagados);
    if (hongosApagados) {
        // Cambia a los hongos encendidos
        hongos.forEach((hongo) => hongo.setTexture('hongoPrendido'));
        hongosApagados = false;
    } else {
        // Cambia a los hongos apagados
        hongos.forEach((hongo) => hongo.setTexture('hongoApagado'));
        hongosApagados = true;
    }
}

function update() {
    // Lógica adicional (si es necesaria).
}
