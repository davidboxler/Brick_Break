import { Brick } from "./Brick";

export class WallBrick extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.scene = scene;
    this.bricks = [];
    this.createWall();
  }

  createWall() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 5; j++) {
        // let createBallOnHit = (i === 0 && j === 0);
        let brick = new Brick(this.scene, 60 + i * 92, 60 + j * 50, this);
        this.add(brick);
        this.bricks.push(brick);
      }
    }
  }

  // Método para verificar si todos los ladrillos han sido eliminados
  checkIfAllBricksDestroyed() {
    if (this.bricks.length === 0) {
      this.scene.scene.restart('Game');
      // this.scene.ballGroup.getChildren().forEach(ball => ball.increaseSpeed(10));
    }
  }
}
