class Escena1 extends Phaser.Scene {
    constructor() {
        super("Escena1");
        this.background = null;
        this.jugador = null;
        this.grupoMeteoros = null;
        this.cursors = null;
        this.puntaje = 0;
        this.textoPuntaje = 0;
        this.cantidad = 300;    // Tiempo de generación inicial (milisegundos)
    }
    /** Carga de Recursos */
    preload() {
        //this.load.image('cielo', '/public/resources/img/cielo.png');
        this.load.image('background', '/public/resources/img/background2.jpg');// añado el fondo
        //this.load.image('nave', '/public/resources/img/naveespacial.png');
        //this.load.image('meteoro', '/public/resources/img/meteoro.png');
        this.load.spritesheet('meteoro', '/public/resources/img/meteoro2.png', { frameWidth: 40, frameHeight: 55.5 });
        this.load.spritesheet('supernave', '/public/resources/img/supernave2.png', { frameWidth: 45, frameHeight: 107.5 });//width192 & height144
    }
    /** Creacion de objetos en el juego */
    create() {
        //this.add.image(400,300,'cielo'); 
        this.background = this.add.tileSprite(663, 298, 1326, 596, 'background'); // creo el fondo con tilesprite para que funcion el desplazamiento
        this.jugador = this.physics.add.sprite(663, 500, 'supernave'); //Creando la nave

        //AnimAcion Spritesheet
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
        // animacion del meteoro
        this.anims.create({
            key: 'meteoro_cayendo',
            frames: this.anims.generateFrameNumbers('meteoro', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        })

        this.jugador.setCollideWorldBounds(true); //Evita que salga de la pantalla

        this.grupoMeteoros = this.physics.add.group(); //Creando el grupo de meteoritos
        this.time.addEvent({
            delay: this.cantidad,
            callback: () => {
                this.generarMeteoros(); // Genera los meteoros
                // Actualizar el evento para el próximo ciclo
                this.time.removeAllEvents(); // Eliminar el evento previo para no duplicar la generación
                this.time.addEvent({ delay: this.cantidad, callback: this.generarMeteoros, callbackScope: this, loop: true });
            },
            callbackScope: this,
            loop: true
        });

        this.cursors = this.input.keyboard.createCursorKeys();//Configurando los controles

        this.physics.add.collider(this.jugador, this.grupoMeteoros, this.gameOver, null, this);

        this.puntaje = 0; //resetea el puntaje a 0 cuando se inicia la escena
        this.textoPuntaje = this.add.text(18, 18, 'Puntaje: 0', { fontSize: '32px', fill: '#fff' });
    }
    /** Actualizacion del juego */
    update() {
        this.background.tilePositionY -= 2; // Ajusta la velocidad de desplazamiento del fondo
        this.jugador.setVelocityX(0); // Detiene la nave cuando va de manera Horizontal
        this.jugador.setVelocityY(0); // Detiene la nave cuando va de manera Vertical

        if (this.cursors.left.isDown) {
            this.jugador.setVelocityX(-300); // Mover a la izquierda
            this.jugador.anims.play('izquierda', true);
        } else if (this.cursors.right.isDown) {
            this.jugador.setVelocityX(300); // Mover a la derecha
            this.jugador.anims.play('derecha', true);
        } else {
            this.jugador.anims.play('idle', true);
        }

        if (this.cursors.up.isDown) {
            this.jugador.setVelocityY(-300); // Mover hacia arriba
        } else if (this.cursors.down.isDown) {
            this.jugador.setVelocityY(300); // Mover hacia abajo
        }

        this.puntaje += 1; // Incrementar el puntaje a medida que la nave avanza
        this.textoPuntaje.setText('Puntaje: ' + this.puntaje);
    }
    /** Metodo para la generacion de meteoritos */
    generarMeteoros() {
        const x = Phaser.Math.Between(0, 1326); //posicion aleatoria en el eje x

        const meteoro = this.grupoMeteoros.create(x, 0, 'meteoro'); //Crear un meteorito

        meteoro.play('meteoro_cayendo'); // animacion del meteoro

        meteoro.setVelocityY(200); //Velocidad vertical hacia abajo
    }
    /** Metodo para mostrar la escena game over */
    gameOver(jugador) {
        this.physics.pause(); //Pausar el juego
        jugador.setTint(0xff0000);//Cambiar color para indicar impacto
        console.log('GameOver');
        this.scene.start('GameOver', { puntaje: this.puntaje }); //Escena GameOver y mostrar puntaje
    }

} export default Escena1;
