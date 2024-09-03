import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {}

  preload() {
    // Load the assets for the game
    this.load.setPath("assets");

    this.load.image("logo", "logo.png");
  }

  create() {
    this.scene.start("Game");
  }
}
