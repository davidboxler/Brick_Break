import { Ball } from "./Ball";

export class BallGroup extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    // Crear y añadir la primera pelota
    this.createBall(scene);
  }

  createBall(scene) {
    const ball = new Ball(scene, scene.paddle);
    this.add(ball);
  }

  addBall(ball) {
    this.add(ball);
  }

  update() {
    // Actualiza cada pelota si es necesario
    this.children.iterate((ball) => {
      ball.update();
    });
  }
}