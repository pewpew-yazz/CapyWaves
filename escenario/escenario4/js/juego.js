const config = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 1920,
      height: 1080,
    },
    backgroundColor: '#f4f4f9',
    parent: 'game-container',
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };
  
  const game = new Phaser.Game(config);
  
  function preload() {
    this.load.image('background', '../fotos/fondoR.png');
    this.load.spritesheet('character1', '../fotos/alex1R.png', {
      frameWidth: 1000,
      frameHeight: 1000,
    });
    this.load.spritesheet('character2', '../fotos/max1RC.png', {
      frameWidth: 1000,
      frameHeight: 641,
    });
    this.load.spritesheet('character3', '../fotos/perla1R.png', {
      frameWidth: 1000,
      frameHeight: 1000,
    });
    this.load.spritesheet('character4', '../fotos/marino1R.png', {
      frameWidth: 1000,
      frameHeight: 1000,
    });
    this.load.spritesheet('character5', '../fotos/yaz1R.png', {
      frameWidth: 1000,
      frameHeight: 1000,
    });
    this.load.audio('sound', '../fotos/talk.mp3');
    console.log('Recursos cargados correctamente');
  }
  
  let characters = [];
  let dialogBubbles = [];
  let sound;
  
  // Diálogos para cada personaje
  const dialogs = [
    [
      "Soy Alex.",
      "Recuerda que mantener una rutina para dormir te ayudará a descansar mejor.",
      "Antes de dormir, evita el uso de pantallas. La luz azul afecta tu sueño.",
      "Tomar un baño caliente puede relajar tus músculos y ayudarte a dormir.",
      "Si te cuesta dormir, intenta leer un libro relajante antes de acostarte.",
      "Practica ejercicios de respiración profunda para calmar tu mente antes de dormir.",
      "Usa música relajante o sonidos de la naturaleza para mejorar tu descanso.",
      "Mantén tu habitación fresca, oscura y silenciosa para un sueño reparador.",
      "Limita la cafeína por la tarde para no afectar tu sueño."
    ],
    [
      "Soy Max.",
      "Dedica tiempo a estirarte al final del día para liberar tensiones acumuladas.",
      "Practica la técnica de la relajación progresiva para reducir el estrés.",
      "Desconecta tus dispositivos y concéntrate en el momento presente.",
      "Salir a caminar al aire libre puede ser una excelente forma de desestresarte.",
      "Escuchar música tranquila puede ayudarte a despejar la mente.",
      "Prueba escribir tus pensamientos en un diario para liberar preocupaciones.",
      "Meditar unos minutos al día puede reducir significativamente tu ansiedad.",
      "Haz una pausa para respirar profundamente y enfocarte en ti mismo."
    ],
    [
      "Soy Perla.",
      "Mantén una actitud positiva, incluso en días difíciles.",
      "Recuerda que está bien pedir ayuda cuando te sientes abrumado.",
      "Tómate un tiempo para ti: una taza de té puede hacer maravillas.",
      "Haz una lista de agradecimientos para centrarte en lo positivo.",
      "Dibujar o hacer actividades creativas puede aliviar la ansiedad.",
      "Un masaje en las manos o los pies puede ayudarte a relajarte.",
      "Evita sobrecargarte de tareas y establece prioridades claras.",
      "Recuerda que el descanso es tan importante como el esfuerzo."
    ],
    [
      "Soy Marino.",
      "Dormir bien comienza con una cena ligera y saludable.",
      "Prueba un té de hierbas como manzanilla o lavanda antes de dormir.",
      "Evita pensar demasiado en tus problemas justo antes de acostarte.",
      "Haz un pequeño ritual para señalar a tu cuerpo que es hora de descansar.",
      "Un entorno ordenado puede ayudarte a sentirte más tranquilo.",
      "Pon tu teléfono en modo avión por la noche para evitar distracciones.",
      "Crea una lista de pendientes para el día siguiente y despeja tu mente.",
      "Recuerda que descansar no es perder el tiempo, sino recargar energía."
    ],
    [
      "Soy Yazmín.",
      "La gratitud puede ayudarte a ver lo bueno en tu día y descansar mejor.",
      "Escucha un podcast relajante para distraerte de pensamientos ansiosos.",
      "Prueba la técnica de contar hacia atrás desde 100 para relajar tu mente.",
      "Si no puedes dormir, levántate y haz algo relajante antes de volver a la cama.",
      "Colocar unas gotas de lavanda en tu almohada puede ayudarte a dormir mejor.",
      "Asegúrate de beber suficiente agua durante el día para sentirte equilibrado.",
      "Reduce la carga emocional practicando afirmaciones positivas por la noche.",
      "Agradece a tu cuerpo por todo lo que ha hecho hoy y dale el descanso que merece."
    ]
  ];
  
  function create() {
    const background = this.add.image(2300, 700, 'background');
    const scaleX = this.scale.width / background.width;
    const scaleY = this.scale.height / background.height;
    const scale = Math.min(scaleX, scaleY);
    background.setScale(scale * 1.1);
    background.setOrigin(1.491, 0.91);
  
    const positions = [
      { x: 160, y: 424 },
      { x: 800, y: 290 },
      { x: 470, y: 440 },
      { x: 1400, y: 570 },
      { x: 1130, y: 570 },
    ];
  
    sound = this.sound.add('sound');
  
    for (let i = 1; i <= 5; i++) {
      this.anims.create({
        key: `character${i}Anim`,
        frames: this.anims.generateFrameNumbers(`character${i}`, { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1,
      });
    }
  
    positions.forEach((pos, index) => {
      const character = this.add.sprite(pos.x, pos.y, `character${index + 1}`).setInteractive();
      character.setScale(0.44);
      character.play(`character${index + 1}Anim`);
      characters.push(character);
  
      // Crear burbuja de diálogo sobre cada personaje (inicialmente oculta)
      const bubble = this.add.graphics();
      const bubbleWidth = 250;
      const bubbleHeight = 100;
      const bubbleX = pos.x - bubbleWidth / 2;
      const bubbleY = pos.y - 150; // Posición encima del personaje
      bubble.fillStyle(0xffffff, 0.9);
      bubble.fillRoundedRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 10);
      bubble.setVisible(false);
  
      const bubbleText = this.add.text(bubbleX + 10, bubbleY + 10, '', {
        font: '18px Arial',
        color: '#000',
        wordWrap: { width: bubbleWidth - 20 },
      });
      bubbleText.setVisible(false);
  
      dialogBubbles.push({ bubble, bubbleText });
  
      character.on('pointerdown', () => {
        console.log(`Personaje ${index + 1} clicado`);
        showDialog(index);
        playSound();
      });
    });
  }
  
  function update() {}
  
  function showDialog(index) {
    if (!dialogs[index]) {
      console.error(`No hay diálogos para el índice ${index}`);
      return;
    }
  
    const { bubble, bubbleText } = dialogBubbles[index];
  
    // Mostrar la presentación primero, luego un consejo aleatorio
    const randomPhrase = Phaser.Utils.Array.GetRandom(dialogs[index].slice(1)); // Omitir presentación
    const phraseToShow = bubbleText.text ? randomPhrase : dialogs[index][0]; // Mostrar presentación primero
  
    bubble.setVisible(true);
    bubbleText.setVisible(true);
    bubbleText.setText(phraseToShow);
  
    setTimeout(() => {
      bubble.setVisible(false);
      bubbleText.setVisible(false);
    }, 4000);
  }
  
  function playSound() {
    console.log('Reproduciendo sonido');
    if (!sound.isPlaying) {
      sound.play();
    }
  }
  