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
    this.load.image("brick_orange", "particles/brick1.png");
    this.load.image("brick_red", "particles/brick3.png");
    this.load.image("brick_purple", "particles/brick2.png");
  }

  create() {
    this.scene.start("MainMenu");
  }
}
