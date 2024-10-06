//Escena Horizontal
class Escena4 extends Phaser.Scene {
    constructor() {
        super("Escena4");
        this.jugador = null;
        this.grupoNaves = null;
        this.cursors = null;
        this.puntaje = 0;
        this.puntajeMaximo = 0;
        this.textoPuntaje = 0;
    }

    preload() {
        this.load.image('background', '/public/resources/img/background2.jpg'); //Fondo del juego
        this.load.image('naveEnemiga', '/public/resources/img/naveEnemy.png');
        this.load.spritesheet('supernave', '/public/resources/img/supernave.png', { frameWidth: 90, frameHeight: 215 });
    }

    init(data) {
        this.puntaje = data.puntaje; //Recibe el puntaje
        this.puntajeMaximo = data.puntajeMaximo || 0;
        this.posicionNave = data.posicionNave; // Obtener posición de la nave
    }

    create() {
        this.background = this.add.tileSprite(663, 298, 1326, 596, 'background'); // creo el fondo con tilesprite para que funcion el desplazamiento 
        this.jugador = this.physics.add.sprite(this.posicionNave.x, this.posicionNave.y, 'supernave');

        this.jugador.angle = 90; //Rotar al jugador para que este en posición horizontal

        //Animacion Supernave
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('supernave', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: 0
        })
        this.anims.create({
            key: 'derecha',
            frames: this.anims.generateFrameNumbers('supernave', { start: 1, end: 3 }),
            frameRate: 10,
            repeat: 0
        })
        this.anims.create({
            key: 'izquierda',
            frames: this.anims.generateFrameNumbers('supernave', { start: 5, end: 7 }),
            frameRate: 10,
            repeat: 0
        })

        this.jugador.setCollideWorldBounds(true); //Evita que salga de la pantalla

        this.grupoNaves = this.physics.add.group(); //Creando el grupo de naves
        this.time.addEvent({ delay: 1000, callback: this.generarNaves, callbackScope: this, loop: true });

        this.cursors = this.input.keyboard.createCursorKeys();//Controles

        this.physics.add.collider(this.jugador, this.grupoNaves, this.gameOver, null, this);//Colisiones

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
        this.background.tilePositionX += 2; //Ajusta la velocidad de desplazamiento del fondo
        this.jugador.setVelocityX(0); //Detiene la nave de manera Horizontal
        this.jugador.setVelocityY(0); //Detiene la nave de manera Vertical

        if (this.cursors.left.isDown || this.input.keyboard.checkDown(this.input.keyboard.addKey('a'))) {
            this.jugador.setVelocityX(-300); //Mover a la izquierda
            this.jugador.anims.play('izquierda', true)
        } else if (this.cursors.right.isDown || this.input.keyboard.checkDown(this.input.keyboard.addKey('d'))) {
            this.jugador.setVelocityX(300); //Mover a la derecha
            this.jugador.anims.play('derecha', true);
        } else {
            this.jugador.anims.play('idle', true);
        }

        if (this.cursors.up.isDown || this.input.keyboard.checkDown(this.input.keyboard.addKey('w'))) {
            this.jugador.setVelocityY(-300); //Mover hacia arriba
        } else if (this.cursors.down.isDown || this.input.keyboard.checkDown(this.input.keyboard.addKey('s'))) {
            this.jugador.setVelocityY(300); //Mover hacia abajo
        }

        this.puntaje += 1;
        this.textoPuntaje.setText('Puntaje: ' + this.puntaje);
    }

    gameOver(jugador) {
        this.physics.pause(); //Pausar el juego
        //jugador.setTint(0xff0000);//Cambiar color para indicar impacto
        console.log('GameOver');
        if (this.puntaje > this.puntajeMaximo) {
            this.puntajeMaximo = this.puntaje;
        }
        this.scene.start('GameOver', { puntaje: this.puntaje, puntajeMaximo: this.puntajeMaximo });
        //Escena GameOver y mostrar puntaje
    }
} export default Escena4;