//Escena Horizontal
class Escena4 extends Phaser.Scene{
    constructor(){
        super("Escena4");
        this.grupoNaves=null;
        this.puntaje = 0;
        this.puntajeMaximo=0;
        this.textoPuntaje = 0;
    }
    
    preload(){
        this.load.image('background', '/public/resources/img/background2.jpg'); //Fondo del juego
        this.load.image('naveEnemiga', '/public/resources/img/naveEnemy.png');
    }

    init(data) {
        this.puntaje = data.puntaje; //Recibe el puntaje
        this.puntajeMaximo= data.puntajeMaximo || 0;
    }
    create(){
        this.background = this.add.tileSprite(663, 298, 1326, 596, 'background'); // creo el fondo con tilesprite para que funcion el desplazamiento 

        this.grupoNaves= this.physics.add.group(); //Creando el grupo de naves
        this.time.addEvent({ delay: 1000, callback: this.generarNaves, callbackScope: this, loop: true });
        // Muestra un mensaje
        this.mensaje = this.add.text(663, 150, 'Nivel 4', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        // Eliminar el mensaje después de 2 segundos
        this.time.delayedCall(2000, () => {
            this.mensaje.destroy(); // Elimina el mensaje
        });
        this.textoPuntaje = this.add.text(18, 18, 'Puntaje: 0', { fontSize: '32px', fill: '#fff' });
    }

    generarNaves() {
        const y = Phaser.Math.Between(50, 550); //posicion aleatoria en el eje x
        const naveEnemy = this.grupoNaves.create(1480, y, 'naveEnemiga'); //Crear una nave
        naveEnemy.setScale(0.2); //escalar tamaño de la imagen
        naveEnemy.setVelocityX(-120); //Velocidad vertical hacia abajo
    }

    update() {
        this.background.tilePositionX+= 2; // Ajusta la velocidad de desplazamiento del fondo
        this.puntaje += 1;
        this.textoPuntaje.setText('Puntaje: ' + this.puntaje);
    }
    gameOver(jugador) {
        this.physics.pause(); //Pausar el juego
        jugador.setTint(0xff0000);//Cambiar color para indicar impacto
        console.log('GameOver');
        if (this.puntaje > this.puntajeMaximo) {
            this.puntajeMaximo = this.puntaje;
        }
        this.scene.start('GameOver', { puntaje: this.puntaje, puntajeMaximo: this.puntajeMaximo}); 
        //Escena GameOver y mostrar puntaje

    }
} export default Escena4;