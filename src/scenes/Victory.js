class Victory extends Phaser.Scene {
    constructor() {
        super("Victory"); 
        this.nombreJugador=0;
        
    }
    init(data){
        this.nombreJugador = data.nombreJugador; // Obtener nombre jugador
        this.puntaje = data.puntaje; //Recibir el puntaje
    }
    preload() {
        this.load.image('background', '/public/resources/img/background2.jpg');
        this.load.image('victory', '/public/resources/img/victory.png');
    }
    create() {
        this.background = this.add.tileSprite(663, 298, 1326, 596, 'background');
        this.victory = this.add.image(663, 300, 'victory').setOrigin(0.5);
        this.add.text(663, 500, 'Barra espaciadora para mostrar el Top', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.victory.setScale(0.6); 

        //Configura el parpadeo de la imagen
        this.time.addEvent({
            delay: 700, //Tiempo en milisegundos
            callback: this.blink,
            callbackScope: this,
            loop: true //Hacer que parpadee en bucle
        });
        this.sound.stopAll();
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('Top', {puntaje:this.puntaje,nombreJugador:this.nombreJugador}); //Reiniciar el juego
        });
    }
    update(){
        this.background.tilePositionX += 2; // Ajusta la velocidad de desplazamiento del fondo
    }

    blink() {
        //Alterna la visibilidad de la imagen
        this.victory.visible = !this.victory.visible;
    }
}

export default Victory; 