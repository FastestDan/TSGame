import { CST } from "../CST";
import CRFont from "@/assets/main.css"

export class ScoreManager {
    scoreText: Phaser.GameObjects.Text;
    highscoreText: Phaser.GameObjects.Text;
    line1Text: Phaser.GameObjects.Text;
    line2Text: Phaser.GameObjects.Text;
    text3: Phaser.GameObjects.Text;
    lives: Phaser.Physics.Arcade.Group;

    get noMoreLives() {
        return this.lives.countActive(true) === 0;
    }

    highScore = 0;
    score = 0;

    constructor(private _scene: Phaser.Scene) {
        this._init();
        this.print();
    }

    private _init() {
        const {width: SIZE_X, height: SIZE_Y} = this._scene.game.canvas;
        const textConfig = {
            fontFamily: 'CRfont',
            fill: "#ffffff",
        };
        const normalTextConfig = {
            ...textConfig,
            fontSize: "17px",
        };

        const bigTextConfig = {
            ...textConfig,
            fontSize: "25px",
        };
        this.scoreText = this._scene.add.text(80, 60, "", normalTextConfig);
        this.highscoreText = this._scene.add.text(325, 60, "", normalTextConfig);
        this.line1Text = this._scene.add
            .text(SIZE_X / 2, 320, "", bigTextConfig)
            .setOrigin(0.5);

        this.line2Text = this._scene.add
            .text(SIZE_X / 2, 400, "", bigTextConfig)
            .setOrigin(0.5);

        this.text3 = this._scene.add.text(SIZE_X / 2 - 40, 25, 'HI-SCORE', textConfig);

        this._setLivesText(SIZE_X, normalTextConfig);
    }

    private _setLivesText(
        SIZE_X: number,
        textConfig: { fontSize: string; fontFamily: string; fill: string }
    ) {
        this._scene.add.text(SIZE_X - 100, 16, `LIVES`, textConfig);
        this.lives = this._scene.physics.add.group({
            maxSize: 3,
            runChildUpdate: true,
        });
        this.resetLives();
    }

    resetLives() {
        let SIZE_X = this._scene.game.canvas.width;
        this.lives.clear(true, true)
        for (let i = 0; i < 3; i++) {
            let ship: Phaser.GameObjects.Sprite = this.lives.create(
                SIZE_X - 100 + 30 * i,
                60,
                CST.SPRITES32x16.PLAYER
            );
            ship.setOrigin(0.5, 0.5);
            ship.setAngle(90);
            ship.setAlpha(0.6);
        }
    }

    resetScore(){
        this.score = 0;
        this.print();
    }

    setWinText() {
        this._setBigText("YOU WON!", "PRESS SPACE FOR NEW GAME");
    }
    setGameOverText() {
        this._setBigText("GAME OVER", "PRESS SPACE FOR NEW GAME");
    }

    hideText() {
        this._setBigText("", "")
    }

    private _setBigText(line1: string, line2: string) {
        this.line1Text.setText(line1);
        this.line2Text.setText(line2);
    }

    setHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
        }
        this.resetScore();
    }

    print() {
        this.scoreText.setText(`${this.padding(this.score)}`);
        this.highscoreText.setText(`${this.padding(this.highScore)}`);
    }

    increaseScore(step = 20) {
        this.score += step;
        this.print();
    }

    padding(num: number) {
        return `${num}`.padStart(4, "0");
    }
}