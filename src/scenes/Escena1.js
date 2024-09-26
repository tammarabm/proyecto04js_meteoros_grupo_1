class Escena1 extends Phaser.Scene{
    constructor(){
        super("Escena1"); 
        this.jugador=null; 
        this.grupoMeteoros= null;
        this.cursors= null;
        this.puntaje=0;
        this.textoPuntaje=0;
    }

    preload(){ //Carga de recursos
        this.load.image('cielo', '/public/resource/img/nombreImagen.png');
        this.load.image('nave', '../public/resource/img/nombreImagen.png');
        this.load.image('meteoro', '../public/resource/img/nombreImagen.png');
    }

    create(){
        this.add.image(400,300,'cielo'); 
        this.jugador=this.physics.add.sprite(400,550,'nave'); //Creando la nave
        this.jugador.setCollideWorldBounds(true); //Evita que salga de la pantalla

        this.grupoMeteoros=this.physics.add.group(); //Creando el grupo de meteoritos
        this.time.addEvent({delay: 1000, callback:this.generarMeteoros, callbackScope:this, loop:true});

        this.cursors=this.input.keyboard.createCursorKeys();//Configurando los controles
        this.physics.add.collider(this.jugador, this.grupoMeteoros, this.gameOver, null,this);
        this.textoPuntaje=this.add.text(18,18,'Puntaje: 0', {fontSize:'32px', fill: '#fff'});
    }
    generarMeteoros(){
        const x= Phaser.Math.Between(0,800); //posicion aleatoria en el eje x

        const meteoro= this.grupoMeteoros.create(x,0,'meteoro'); //Crear un meteorito

        meteoro.setVelocity(200); //Velocidad vertical hacia abajo
    }

    update(){
        this.jugador.setVelocityX(0); // Detener la nave
        if (this.cursors.left.isDown) {
            this.jugador.setVelocityX(-300); // Mover a la izquierda
        } else if (this.cursors.right.isDown) {
            this.jugador.setVelocityX(300); // Mover a la derecha
        }

        this.puntaje+=1; 
        this.textoPuntaje.setText('Puntaje: '+this.puntaje);
    }

    gameOver(jugador){
        this.physics.pause(); //Pausar el juego
        jugador.setTint(0xff0000);//Cambiar color para indicar impacto
        console.log('GameOver'); 
        this.scene.start('GameOver', {puntaje: this.puntaje}); //Escena GameOver y mostrar puntaje

    }

}export default Escena1;
