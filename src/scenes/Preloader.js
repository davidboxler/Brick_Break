import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {}

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath("assets");

    this.load.image("logo", "logo.png");
    this.load.image("ball", "particles/ball.png");
    this.load.image("pala", "particles/pala.png");
    this.load.image("brick", "particles/brick1.png");
  }

  create() {
    this.scene.start("MainMenu");
  }
}
