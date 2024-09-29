import Escena1 from "./scenes/Escena1.js"
import GameOver from "./scenes/GameOver.js"

const config= {
    type:Phaser.AUTO,
    width:1326,
    height:595,
    physics:{
        default:'arcade',
        arcade:{
            gravity: {y:0},
            debug:false
        }
    },
    scene: [Escena1, GameOver],
};
let game=new Phaser.Game(config);