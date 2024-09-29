class Escena1 extends Phaser.Scene{
    constructor(){
        super("Escena1"); 
        this.background=null;
        this.jugador=null;
        this.grupoMeteoros= null;
        this.cursors= null;
        this.puntaje=0;
        this.textoPuntaje=0;
    }

    preload(){ //Carga de recursos
        //this.load.image('cielo', '/public/resources/img/cielo.png');
        this.load.image('background', '/public/resources/img/background.png');
        //this.load.image('nave', '/public/resources/img/naveespacial.png');
        //this.load.image('meteoro', '/public/resources/img/meteoro.png');
        this.load.spritesheet('meteoro', '/public/resources/img/meteoro2.png',{frameWidth:40,frameHeight:55.5});
        this.load.spritesheet('supernave','/public/resources/img/supernave.png',{frameWidth:90,frameHeight:215});//width192 & height144
    }

    create(){
        //this.add.image(400,300,'cielo'); 
        this.background = this.add.tileSprite(400,300,800,600,'background');
        this.jugador=this.physics.add.sprite(400,550,'supernave'); //Creando la nave

        //AnimAcion Spritesheet
        this.anims.create({
            key:'idle',
            frames: this.anims.generateFrameNumbers('supernave',{start:0,end:7}),
            frameRate:10,
            repeat:0
        })
        this.anims.create({
            key:'derecha',
            frames: this.anims.generateFrameNumbers('supernave',{start:1,end:3}),
            frameRate:10,
            repeat:0
        })
        this.anims.create({
            key:'izquierda',
            frames: this.anims.generateFrameNumbers('supernave',{start:5,end:7}),
            frameRate:10,
            repeat:0
        })
        // animacion del meteoro
        this.anims.create({
            key:'meteoro_cayendo',
            frames: this.anims.generateFrameNumbers('meteoro',{start:0,end:7}),
            frameRate:10,
            repeat:-1
        })

        this.jugador.setCollideWorldBounds(true); //Evita que salga de la pantalla

        this.grupoMeteoros=this.physics.add.group(); //Creando el grupo de meteoritos
        this.time.addEvent({delay: 1000, callback:this.generarMeteoros, callbackScope:this, loop:true});

        this.cursors=this.input.keyboard.createCursorKeys();//Configurando los controles
        this.physics.add.collider(this.jugador, this.grupoMeteoros, null,this); //this.gameOver
        this.textoPuntaje=this.add.text(18,18,'Puntaje: 0', {fontSize:'32px', fill: '#fff'});
    }
    generarMeteoros(){
        const x= Phaser.Math.Between(0,800); //posicion aleatoria en el eje x

        const meteoro= this.grupoMeteoros.create(x,0,'meteoro'); //Crear un meteorito

        meteoro.play('meteoro_cayendo'); // animacion del meteoro

        meteoro.setVelocityY(200); //Velocidad vertical hacia abajo
    }

    update(){
        this.background.tilePositionY -= 2; // Ajusta la velocidad de desplazamiento del fondo
        this.jugador.setVelocityX(0); // Detener la nave
        if (this.cursors.left.isDown) {
            this.jugador.setVelocityX(-300); // Mover a la izquierda
            this.jugador.anims.play('izquierda',true);
        } else if (this.cursors.right.isDown) {
            this.jugador.setVelocityX(300); // Mover a la derecha
            this.jugador.anims.play('derecha',true);
        }else{
            this.jugador.anims.play('idle',true);
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
