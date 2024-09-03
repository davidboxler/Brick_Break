import { Physics } from "phaser";
import { Bomb } from "./Bomb";

export class BombGroup extends Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    this.scene = scene;
  }

  createBomb(x, y) {
    const bomb = new Bomb(this.scene, x, y);
    this.add(bomb);
  }
}
