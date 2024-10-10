class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
        this.nombreJugador = 0;
    }

    init(data) {
        this.puntaje = data.puntaje; //Recibir el puntaje
        this.puntajeMaximo = data.puntajeMaximo; //Recibe el puntaje maximo
        this.nombreJugador = data.nombreJugador; //Recibe el nombre del jugador
    }


    preload(){
        this.load.image('backgroundGameOver', '/public/resources/img/backgroundGameOver.png');
    }
    

    create() {
        this.background = this.add.tileSprite(663, 298, 1326, 596, 'backgroundGameOver');
        this.add.text(663, 200, 'Game Over', { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(663, 300, 'Puntaje: ' + this.puntaje, { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(663,500, 'Puntaje Máximo:'+ this.puntajeMaximo, { fontSize: '32px', fill: '#fff'}).setOrigin(0.5);
        this.add.text(663, 400, 'Barra espaciadora para volver a jugar', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        let topJugadores = JSON.parse(localStorage.getItem('topJugadores')) || [];

        topJugadores.push({ nombre: this.nombreJugador, puntaje: this.puntaje });

        topJugadores.sort((a, b) => b.puntaje - a.puntaje);
        topJugadores = topJugadores.slice(0, 5);

        localStorage.setItem('topJugadores', JSON.stringify(topJugadores));

        this.add.text(100, 100, 'Top 5 Jugadores :', { fontSize: '20px', fill: '#fff' });
        topJugadores.forEach((entry, index) => {
            this.add.text(100, 150 + (index * 30), `${index + 1}. ${entry.nombre}: ${entry.puntaje}`, { fontSize: '18px', fill: '#fff' });
        });

        this.sound.stopAll();

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('Escena1', {puntajeMaximo: this.puntajeMaximo}); //Reiniciar el juego
        });
    }
}

export default GameOver; 