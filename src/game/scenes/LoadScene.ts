import {CST} from "../CST"
import player from '@/assets/player.png'
import meme from '@/assets/meme.png'
import raider1 from '@/assets/raider1.png'
import raider2 from '@/assets/raider2.png'
import raider3 from '@/assets/raider3.png'
import logo from '@/assets/crlogo.png'
import pt1 from '@/assets/1pt.png'
import pt2 from '@/assets/2pt.png'
import pt3 from '@/assets/3pt.png'
import play from '@/assets/play.png'

export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }
    init(){

    }
    preload(){
        this.load.image("meme", meme)

        this.load.spritesheet("player", player, {
            frameHeight: 32,
            frameWidth: 64
        })

        this.load.spritesheet("raider1", raider1, {
            frameHeight: 16,
            frameWidth: 32
        })

        this.load.spritesheet("raider2", raider2, {
            frameHeight: 16,
            frameWidth: 32
        })

        this.load.spritesheet("raider3", raider3, {
            frameHeight: 16,
            frameWidth: 32
        })

        this.load.image("logo", logo)
        this.load.image("1pt", pt1)
        this.load.image("2pt", pt2)
        this.load.image("3pt", pt3)
        this.load.image("play", play)

        let loadingBar = this.add.graphics({
            fillStyle:{
                color: 0xffffff
            }
        })

        // for(let i = 0; i < 100; i++){
        //     this.load.spritesheet("player" + i, player, {
        //         frameHeight: 32,
        //         frameWidth: 64
        //     })
        // }

        this.load.on("progress", (percent)=>{
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            console.log(percent);
        })

        this.load.on("complete", ()=>{
            this.scene.start(CST.SCENES.MENU, "Hi, hello! Didja get it?");
        })
    }
    create(){
    }
}