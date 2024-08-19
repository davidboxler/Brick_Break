import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  init() {}

  create() {
    this.physics.world.setBoundsCollision(true, true, true, false);

    this.brickGroup = this.physics.add.staticGroup();
    this.brickGroup.create(300, 315, "brick");

    this.platform = this.physics.add.image(400, 700, "pala").setImmovable();
    this.platform.setCollideWorldBounds(true);
    this.platform.body.allowGravity = false;

    this.ball = this.physics.add.image(400, 650, "ball");
    this.ball.setData("glue", true);
    this.ball.setCollideWorldBounds(true);

    this.physics.add.collider(
      this.ball,
      this.platform,
      this.platformImpact,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.brickGroup,
      this.brickImpact,
      null,
      this
    );

    this.ball.setBounce(1);

    // this.cursors = this.input.keyboard.createCursorKeys();
  }

  brickImpact(ball, brick) {
    brick.disableBody(true, true);
  }

  platformImpact(ball, platform) {
    this.ball.setVelocity(10, -1000);
    let impact = ball.x - platform.x;
    if (impact < 0.1 && impact > -0.1) {
      ball.setVelocityX(Phaser.Math.Between(-10, 10));
    } else {
      ball.setVelocityX(5 * impact);
    }
  }

  update() {
    let pointer = this.input.activePointer;
    this.platform.x = pointer.x;

    if (this.ball.getData("glue")) {
      this.ball.x = this.platform.x;
    }

    if (pointer.isDown && this.ball.getData("glue")) {
      this.ball.setVelocity(-75, -300);
      this.ball.setData("glue", false);
    }

    if (this.ball.y > 750) {
      this.scene.start("GameOver");
      this.scene.pause();
    }
  }
}
