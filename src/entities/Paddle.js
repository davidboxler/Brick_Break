export class Paddle extends Phaser.GameObjects.Graphics {
  constructor(scene, x, y) {
    super(scene);

    this.scene = scene;
    this.setPosition(x, y);

    // Dibujar la paleta
    this.fillStyle(0xff0000, 1);
    this.fillRect(0, 0, 40, 40);

    this.fillStyle(0x808080, 1);
    this.fillRect(40, 0, 150, 40);

    this.fillStyle(0xff0000, 1);
    this.fillRect(190, 0, 40, 40);

    // Añadir detalles de sombra
    this.fillStyle(0x000000, 0.2);
    this.fillRect(0, 30, 230, 10);

    // Añadir detalles de luz
    this.fillStyle(0xffffff, 0.2);
    this.fillRect(0, 0, 230, 10);

    // Añadir la paleta a la escena y habilitar físicas
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Ajustar el tamaño del cuerpo de colisión
    this.body.setSize(230, 40);
    this.body.immovable = true;
    this.body.setCollideWorldBounds(true);

    // Definir las teclas de control
    this.cursor = scene.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursor.left.isDown) {
      this.body.setVelocityX(-300);
    } else if (this.cursor.right.isDown) {
      this.body.setVelocityX(300);
    } else {
      this.body.setVelocityX(0);
    }
  }
}
