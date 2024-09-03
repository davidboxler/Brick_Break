import { Physics } from "phaser";

export class Bomb extends Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "bomb");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setVelocityY(200);
    this.setGravityY(300);
  }
}
