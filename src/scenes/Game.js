import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  init() {
    this.score = 0;
    this.ballSpeedMultiplier = 2;
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, false);

    this.scoreText = this.add.text(16, 16, "SCORE: 0", {
      fontSize: 20,
      fill: "#fff",
      fontFamily: "verdana, arial, sans-serif",
    });

    this.brickGroup = this.physics.add.staticGroup({
      key: ["brick_orange", "brick_red", "brick_purple"],
      frameQuantity: 8,
      gridAlign: {
        width: 8,
        height: 4,
        cellHeight: 55,
        cellWidth: 125,
        x: 20,
        y: 50,
      },
    });

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
  }

  brickImpact(ball, brick) {
    brick.disableBody(true, true);
    this.score = this.score + 10;
    this.scoreText.setText("SCORE: " + this.score);

    if (this.brickGroup.countActive(true) === 0) {
      this.levelCompleted();
    }
  }

  platformImpact(ball, platform) {
    this.ball.setVelocity(10, -1000);
    let impact = ball.x - platform.x;
    if (impact < 0.1 && impact > -0.1) {
      ball.setVelocityX(Phaser.Math.Between(-10, 10));
    } else {
      ball.setVelocityX(3 * impact);
    }
  }

  levelCompleted() {
    this.ballSpeedMultiplier *= 2.2;

    this.scene.restart({
      score: this.score,
      ballSpeedMultiplier: this.ballSpeedMultiplier,
    });
  }

  update() {
    let pointer = this.input.activePointer;
    this.platform.x = pointer.x;

    if (this.ball.getData("glue")) {
      this.ball.x = this.platform.x;
    }

    if (pointer.isDown && this.ball.getData("glue")) {
      this.ball.setVelocity(
        -75 * this.ballSpeedMultiplier,
        -300 * this.ballSpeedMultiplier
      );
      this.ball.setData("glue", false);
    }

    if (this.ball.y > 750) {
      this.scene.start("GameOver");
      this.scene.pause();
    }
  }
}
