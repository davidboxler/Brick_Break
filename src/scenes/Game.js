import { Scene } from "phaser";

// import class entitities
import { BallGroup } from "../entities/BallGroup";
import { BombGroup } from "../entities/BombGroup";
import { Paddle } from "../entities/Paddle";
import { WallBrick } from "../entities/WallBrick";
export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    // Inicialización de la pala
    this.paddle = new Paddle(this, 400, 700);

    // Desactivar colisión con la parte inferior del mundo
    this.physics.world.checkCollision.down = false;

    // Inicialización del grupo de pelotas
    this.ballGroup = new BallGroup(this);
    this.ballGroup.createBall(this);

    // Inicialización del grupo de bombas
    this.bombGroup = new BombGroup(this);

    // Añadir las físicas y colisiones para las pelotas y la paleta
    this.physics.add.collider(this.ballGroup.getChildren(), this.paddle);

    // Añadir las físicas y colisiones para las pelotas y los ladrillos
    this.wall = new WallBrick(this);
    this.physics.add.collider(
        this.ballGroup.getChildren(), 
        this.wall.getChildren(), 
        (ball, brick) => {
            brick.hit();
        },
        null,
        this
    );

    // Añadir colisiones entre las bombas y la paleta
    this.physics.add.collider(
        this.bombGroup.getChildren(), 
        this.paddle, 
        () => {
            this.scene.start("GameOver"); 
        },
        null,
        this
    );

    // Escuchar la tecla de espacio para lanzar todas las pelotas
    this.input.keyboard.on("keydown-SPACE", () => {
        this.ballGroup.getChildren().forEach(ball => ball.launchBall());
    });
  }

  update() {
    this.paddle.update();
    this.ballGroup.getChildren().forEach(ball => {
        ball.update();
        if (ball.y > 750) {
            ball.destroy();
            if (this.ballGroup.getChildren().length === 0) {
                this.scene.start("GameOver");
                this.scene.pause();
            }
        }
    });
  }
}
