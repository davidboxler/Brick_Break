export class Ball extends Phaser.GameObjects.Graphics {
  constructor(scene, paddle) {
    super(scene);

    this.scene = scene;
    this.paddle = paddle;
    this.radius = 17.5;

    this.initialVelocity = 200; // Velocidad inicial
    this.speedMultiplier = 1;

    // Estado inicial: pegado a la paleta
    this.isLaunched = false;

    // Dibujar la bola
    this.drawBall();

    // Añadir la bola a la escena y habilitar físicas
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Ajustar las propiedades físicas
    this.body.setCircle(this.radius);
    this.body.setCollideWorldBounds(true);
    this.body.setBounce(1, 1);

    // Escuchar la entrada del teclado
    scene.input.keyboard.on("keydown-SPACE", this.launchBall, this);
  }

  drawBall() {
    this.clear();

    // Dibujar la bola principal
    this.fillStyle(0xff0000, 1);
    this.fillCircle(this.radius, this.radius, this.radius);

    this.fillStyle(0x000000, 0.2);
    this.fillCircle(this.radius, this.radius + 5, this.radius - 2);

    // Dibujar el detalle de luz en la parte superior
    this.fillStyle(0xffffff, 0.3);
    this.fillCircle(this.radius - 7, this.radius - 7, this.radius / 3);
  }

  launchBall() {
    if (!this.isLaunched) {
      this.isLaunched = true;
      this.body.setVelocity(
        this.initialVelocity * this.speedMultiplier,
        -this.initialVelocity * this.speedMultiplier
      ); // Velocidad inicial de la bola
    }
  }

  // Método para aumentar la velocidad de la bola
  increaseSpeed(percent) {
    this.speedMultiplier += percent / 100;
    if (this.isLaunched) {
      this.body.setVelocity(
        this.initialVelocity * this.speedMultiplier,
        -this.initialVelocity * this.speedMultiplier
      );
    }
  }

  update() {
    if (!this.isLaunched) {
      this.x = this.paddle.x + 100;
      this.y = this.paddle.y - 36;
    }
  }
}
