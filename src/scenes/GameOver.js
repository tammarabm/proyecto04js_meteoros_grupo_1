class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    init(data) {
        this.puntaje = data.puntaje; //Recibir el puntaje
    }

    create() {
        this.add.text(663, 200, 'Game Over', { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(663, 300, 'Puntaje: ' + this.puntaje, { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(663, 400, 'Barra espaciadora para volver a jugar', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('Escena1'); //Reiniciar el juego
        });
    }
}

export default GameOver; 