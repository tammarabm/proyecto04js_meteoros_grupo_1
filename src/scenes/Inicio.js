class Inicio extends Phaser.Scene {
    constructor() {
        super("Inicio");
    }

    preload() {
        this.load.image('background', '/public/resources/img/background2.jpg');
        this.load.image('pressStart', '/public/resources/img/pressStart.png');
    }

    create() {
        this.background = this.add.tileSprite(663, 298, 1326, 596, 'background');
        this.pressStart = this.add.image(663, 300, 'pressStart').setOrigin(0.5);

        this.pressStart.setScale(0.5); //Escala de la imagen

        //Configura el parpadeo de la imagen
        this.time.addEvent({
            delay: 1000, //Tiempo en milisegundos
            callback: this.blink,
            callbackScope: this,
            loop: true //Hacer que parpadee en bucle
        });

        const startButton = document.getElementById('botonStart');
        startButton.addEventListener('click', () => {
            const nombreJugador = document.getElementById('nombreJugador').value.trim();
            if (nombreJugador === "") {
                alert("Ingrese un nombre");
            }else{
            this.registry.set('nombreJugador', nombreJugador); 
            document.getElementById('nombreForm').style.display = 'none'; 
            this.scene.start('Escena1'); 
            }

        
        });
    }
    update(){
        this.background.tilePositionY -= 2; // Ajusta la velocidad de desplazamiento del fondo
    }

    showTopPlayers(players) {
        // Muestra el Top 5 en pantalla
        this.add.text(50, 50, 'Top 5 Players:', { fontSize: '20px', fill: '#fff' });
        players.forEach((player, index) => {
            this.add.text(50, 80 + index * 30, `${index + 1}. ${player.name}: ${player.score}`, { fontSize: '18px', fill: '#fff' });
        });
    }

    blink() {
        //Alterna la visibilidad de la imagen
        this.pressStart.visible = !this.pressStart.visible;
    }
}

export default Inicio; 