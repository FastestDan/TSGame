import {CST} from "../CST";
import {Bullet} from "@/game/bullet";
import {Blast} from "@/game/blast";
import {AssetManager} from "@/game/managers/assetManager";
import {EnemyBullet} from "@/game/enbullet";
import {RaiderManager} from "@/game/managers/raiderManager";
import {Anims} from "@/game/anims";
import {Raider1} from "@/game/raider1";
import {Raider2} from "@/game/raider2";
import {Raider3} from "@/game/raider3";

export class PlayScene extends Phaser.Scene{
    assman: AssetManager
    raidman: RaiderManager
    animer: Anims
    firingTimer = 0;
    bulletTime = 0;
    keyboard: {[index: string]: Phaser.Input.Keyboard.Key};
    player!: Phaser.Physics.Arcade.Sprite;
    // wall1!: Phaser.Physics.Arcade.Sprite;
    // wall2!: Phaser.Physics.Arcade.Sprite;
    // wall3!: Phaser.Physics.Arcade.Sprite;
    // pattack!: Phaser.Physics.Arcade.Group;
    patblast!: Phaser.Physics.Arcade.Group;
    // raiders!: Phaser.Physics.Arcade.Group;
    fire!: Phaser.Input.Keyboard.Key;


    constructor(){
        super({
            key: CST.SCENES.PLAY});
    }
    preload(){
        this.anims.create({
            key: "playerdead",
            frameRate: 15,
            repeat: 3,
            frames: this.anims.generateFrameNumbers(CST.SPRITES32x16.PLAYER, {
                frames: [1, 2]
            })
        });

        this.anims.create({
            key: "patblast",
            frameRate: 5,
            repeat: 0,
            frames: this.anims.generateFrameNumbers("patblast", {
                frames: [0, 1]
            })

        });

        this.anims.create({
            key: "r3move",
            frameRate: 1,
            repeat: -1,
            frames: this.anims.generateFrameNumbers(CST.SPRITES32x16.RAIDER3, {
                frames: [0, 1]
            })
        });

        this.anims.create({
            key: "r2move",
            frameRate: 1,
            repeat: -1,
            frames: this.anims.generateFrameNumbers(CST.SPRITES32x16.RAIDER2, {
                frames: [0, 1]
            })
        });

        this.anims.create({
            key: "r1move",
            frameRate: 1,
            repeat: -1,
            frames: this.anims.generateFrameNumbers(CST.SPRITES32x16.RAIDER1, {
                frames: [0, 1]
            })
        });
    }
    create(){
        this.assman= new AssetManager(this);
        this.raidman = new RaiderManager(this);
        this.animer = new Anims(this)
        this.add.image(this.game.renderer.width / 2 - 225, this.game.renderer.height / 2 - 350, CST.IMAGE.SCORE).setScale(0.30);

        this.player = this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, CST.SPRITES32x16.PLAYER).setOrigin(0, 0).setScale(1.5);

        // this.raiders = this.physics.add.group({
        //     maxSize: 40,
        //     runChildUpdate: true
        // });
        //
        // this.raiders.setOrigin(0, 0);
        // this.sortRaiders();
        this.keyboard = this.input.keyboard.createCursorKeys();
        this.fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // this.physics.add.collider(this.player, this.wall2);
        // this.physics.add.collider(this.wall3, this.player);
        // this.physics.add.collider(this.wall2, this.raiders);
        // this.physics.add.collider(this.wall3, this.raiders);

        this.player.setCollideWorldBounds(true);
        // this.al2.play("r2move");
    }

    update(time: number, delta: number){
        // this.physics.add.sprite(, CST.SPRITES.PATTACK).setOrigin(0, 0)

        if (this.time.now > this.firingTimer) {
            this.enshoot();
        }

        if(this.keyboard.left.isDown){
            this.player.setVelocityX(-200)
            // this.pattack.setVelocityX(-200)
        }

        else if(this.keyboard.right.isDown){
            this.player.setVelocityX(200)
            // this.pattack.setVelocityX(200)
        }

        else if(this.keyboard.down.isDown){
            this.assman.bullets.setVelocityY(0)
            // this.pattack.setVelocityX(200)
        }

        else {
            this.player.setVelocityX(0)
            // this.pattack.setVelocityX(0)
        }

        if (this.fire.isDown){
            this.pshoot();
        }

        this.physics.overlap(
            this.assman.bullets,
            this.raidman.raiders,
            this.hitRaider,
            null,
            this
        );
        // this.physics.overlap(
        //     this.assman.enemyBullets,
        //     this.player,
        //     this._enemyBulletHitPlayer,
        //     null,
        //     this
        // );
    }

    // private sortRaiders(){
    //     let or_x = this.game.renderer.width / 2 - 240;
    //     let or_y = this.game.renderer.height / 2 - 200;
    //     this.raiders.clear(true, true);
    //     for (let y = 0; y < 5; y++){
    //         for (let x = 0; x < 11; x++){
    //             if (y < 1){
    //                 let raider = this.physics.add.sprite(or_x + x * 48, or_y + y * 50, CST.SPRITES32x16.RAIDER3).setOrigin(0.5, 0.5).setScale(1.5)
    //                 raider.play("r3move")
    //             }
    //             else if (y < 3){
    //                 let raider = this.physics.add.sprite(or_x + x * 48, or_y + y * 50, CST.SPRITES32x16.RAIDER2).setOrigin(0.5, 0.5).setScale(1.5)
    //                 raider.play("r2move")
    //             }
    //             else{
    //                 let raider = this.physics.add.sprite(or_x + x * 48, or_y + y * 50, CST.SPRITES32x16.RAIDER1).setOrigin(0.5, 0.5).setScale(1.5)
    //                 raider.play("r1move")
    //             }
    //         }
    //     }
    // }

    // private patWall(bullet: Bullet){
    //     bullet.setVelocityY(0);
    //     console.log("До стены долетела, и...");
    //     let boom: Blast = this.assman.explosions.get();
    //     boom.setPosition(bullet.x, bullet.y + 7);
    //     bullet.destroy();
    //     boom.play("patblast");
    //     this.plazer = false;
    // }

    private pshoot(){
        if (!this.player.active) {
            return;
        }

        if (this.time.now > this.bulletTime){
            let lazer: Bullet = this.assman.bullets.get().setScale(0.60)
            if(lazer){
                lazer.shoot(this.player.x + 24.2, this.player.y + 5);
                this.bulletTime = this.time.now + 1000;
            }
        }
    }

    private enshoot(){
        if (!this.player.active) {
            return;
        }
        let enBullet: EnemyBullet = this.assman.enemyBullets.get();
        let randomEnemy = this.raidman.getRandomAliveEnemy();
        if (enBullet && randomEnemy) {
            enBullet.setPosition(randomEnemy.x, randomEnemy.y);
            enBullet.setVelocityY(200)
            this.firingTimer = this.time.now + 2750;
        }
    }

    private hitRaider(bullet: Bullet, alien: Raider2){
        let explosion: Blast = this.assman.explosions.get();
        bullet.kill()
        alien.kill(explosion);
    }
}