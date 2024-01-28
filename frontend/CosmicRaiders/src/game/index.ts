import Phaser from 'phaser'
import {LoadScene} from "./scenes/LoadScene"
import {MenuScene} from "./scenes/MenuScene"
import {PlayScene} from "./scenes/PlayScene"

export const getGame = () =>
  new Phaser.Game({
    title: 'Cosmic Raiders',
    type: Phaser.AUTO,
    width: 672,
    height: 768,
    // backgroundColor: 'white',
    physics: {
      default: 'arcade',
      arcade: {
        // debug: true,
        gravity: { y: 0 }
      }
    },
    render: {
      pixelArt: true
    },
    // autoFocus: true,
    scale: {
      parent: 'app'
    },
    // scene: [new VueScene()]
      scene: [LoadScene, MenuScene, PlayScene]
  })

// export class VueScene extends Phaser.Scene {
//   private logo?: Phaser.GameObjects.Image
//   private text?: Phaser.GameObjects.Text
//
//   constructor() {
//     super({ key: 'default' })
//   }
//
//   preload() {
//     this.load.image('meme', meme)
//   }
//
//   create() {
//     this.text = this.add.text(100, this.cameras.main.height / 2 - 100, 'Заебало')
//
//     this.logo = this.add.image(-100, this.cameras.main.height / 2 + 60, 'meme')
//     this.logo.scale = 0.25
//       this.player = this.physics.add.sprite(300, 300, 'meme')
//       this.player.scale = 0.25
//       this.cursors = this.input.keyboard.createCursorKeys();
//
//
//     NuxtPhaser.eventEmitter?.addListener('pause', this.pauseGame, this)
//   }
//
//   update(): void {
//     if (!this.logo) return
//
//     const limitScreen = this.cameras.main.width * 1.5
//
//     this.logo.x += 2
//
//     if (this.logo.x > limitScreen) {
//       this.logo.x = 0
//     }
//       if (this.player.x > limitScreen) {
//           this.player.x = 0
//       }
//       if (this.player.y > limitScreen) {
//           this.player.y = 0
//       }
//       if (this.player.x < 0) {
//           this.player.x = 800
//       }
//       if (this.player.y < -25) {
//           this.player.y = 800
//       }
//     if (this.cursors.left.isDown) {
//         this.player.setVelocityX(-200)
//     }else if (this.cursors.right.isDown){
//         this.player.setVelocityX(200)
//     }else this.player.setVelocityX(0)
//
//       if (this.cursors.up.isDown) {
//           this.player.setVelocityY(-200)
//       }else if (this.cursors.down.isDown){
//           this.player.setVelocityY(200)
//       }else this.player.setVelocityY(0)
//   }
//
//   pauseGame() {
//       this.text.setText('Как же я устал')
//     if (this.game.isPaused)
//         this.game.resume()
//     else this.game.pause()
//   }
// }
