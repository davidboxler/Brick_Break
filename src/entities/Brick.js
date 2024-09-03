export class Brick extends Phaser.GameObjects.Graphics {
  constructor(
    scene,
    x,
    y,
    wall,
    createBallOnHit = false,
    createBombOnHit = false
  ) {
    super(scene);

    // Configuración inicial del ladrillo
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = 84;
    this.height = 36;
    this.radius = 10;

    this.touches = 0;
    this.maxTouches = Phaser.Math.Between(1, 3);
    this.createBallOnHit = createBallOnHit;
    this.createBombOnHit = createBombOnHit;

    // Guardar la referencia al grupo de ladrillos
    this.wall = wall;

    // Dibujar el ladrillo inicial
    this.drawBrick(0x800080);

    // Añadir el ladrillo a la escena y habilitar físicas
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Establecer el cuerpo físico
    this.body.setSize(this.width, this.height);
    this.body.immovable = true;
  }

  // Método para dibujar el ladrillo con un color dado
  drawBrick(color) {
    this.clear();
    this.fillStyle(color, 1);

    this.fillRoundedRect(0, 0, this.width, this.height, this.radius);

    this.fillStyle(0xffffff, 0.2);
    this.fillRoundedRect(0, 0, this.width, 10, {
      tl: this.radius,
      tr: this.radius,
      bl: 0,
      br: 0,
    });
  }

  hit() {
    this.touches++;
    if (this.touches === 1) {
      this.drawBrick(0xffa500);
    }
    if (this.touches === 2) {
      this.drawBrick(0xff0000);
    }
    if (this.touches >= this.maxTouches) {
      this.destroy();
      // Eliminar el ladrillo de la lista de ladrillos en el grupo de ladrillos
      const index = this.wall.bricks.indexOf(this);
      if (index > -1) {
        this.wall.bricks.splice(index, 1);
      }

      // Crear una nueva pelota si este ladrillo es un creador de pelota
      if (this.createBallOnHit) {
        this.scene.ballGroup.createBall(this.scene);
      }

      // Crear una nueva bomba si este ladrillo es un creador de bombas
      if (this.createBombOnHit) {
        this.scene.bombGroup.createBomb(this.x, this.y);
      }

      // Verificar si todos los ladrillos han sido eliminados
      this.wall.checkIfAllBricksDestroyed();
    }
  }
}
