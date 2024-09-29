class Escena2 extends Phaser.Scene{
    constructor(){
        super("Escena2"); 
        this.jugador=null; 
        this.grupoMeteoros= null;
        this.grupoMeteoros2= null;
        this.cursors= null;
        this.puntaje=0;
        this.textoPuntaje=0;
    }
    
    /*preload(){ //Carga de recursos
        this.load.image('cielo', '/public/resources/img/cielo.png');
        this.load.image('nave', '/public/resources/img/naveespacial.png');
        this.load.image('meteoro', '/public/resources/img/meteoro.png');
    }*/
    preload(){ //Carga de recursos
        this.load.image('cielo', '/public/resources/img/cielo.png');
        //this.load.image('nave', '/public/resources/img/naveespacial.png');
        //this.load.image('meteoro', '/public/resources/img/meteoro.png');
        this.load.spritesheet('meteoro', '/public/resources/img/meteoro2.png',{frameWidth:40,frameHeight:55.5});
        this.load.spritesheet('supernave','/public/resources/img/supernave.png',{frameWidth:90,frameHeight:215});//width192 & height144
    }

    init(data){
        this.puntaje=data.puntaje; //Recibe el puntaje
        
        this.posicionNave = data.posicionNave; // Obtener posición de la nave
    }

    create(){
        this.add.image(400,300,'cielo'); 
        this.jugador = this.physics.add.sprite(this.posicionNave.x, this.posicionNave.y, 'supernave'); // Usa la posición anterior

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
        //grupo de meteoros
        this.grupoMeteoros=this.physics.add.group(); 
        this.time.addEvent({delay: 1400, callback:this.generarMeteoros, callbackScope:this, loop:true});
        //grupo de meteoros2
        this.grupoMeteoros2=this.physics.add.group(); 
        this.time.addEvent({delay: 1000, callback:this.generarMeteoros2, callbackScope:this, loop:true});

        this.cursors=this.input.keyboard.createCursorKeys();//Configurando los controles
        this.physics.add.collider(this.jugador, this.grupoMeteoros, this.gameOver, null,this);
        this.physics.add.collider(this.jugador, this.grupoMeteoros2, this.gameOver, null,this); //meteoros2

        // Mostrar mensaje
        this.mensaje = this.add.text(400, 150, 'Nivel 2', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        // Eliminar el mensaje después de 2 segundos
        this.time.delayedCall(2000, () => {
            this.mensaje.destroy(); // Elimina el mensaje
        });

        this.textoPuntaje=this.add.text(18,18,'Puntaje: 0', {fontSize:'32px', fill: '#fff'});
    }

    generarMeteoros(){
         
    const x = Phaser.Math.Between(100, 700); //posicion aleatoria en el eje x
    const meteoro = this.grupoMeteoros.create(x, 0, 'meteoro'); // Crear el meteoro en la parte superior

    meteoro.play('meteoro_cayendo'); // animacion del meteoro

    // Determina si el meteoro va a la izquierda o a la derecha
    if (Phaser.Math.Between(0, 1) === 0) {
        meteoro.setVelocity(-200, 200); // Diagonal hacia abajo a la izquierda
    } else {
        meteoro.setVelocity(200, 200); // Diagonal hacia abajo a la derecha 
    }
    }

    generarMeteoros2(){
        const r= Phaser.Math.Between(0,800); //posicion aleatoria en el eje x

        const meteoro= this.grupoMeteoros.create(r,0,'meteoro'); //Crear un meteorito

        meteoro.play('meteoro_cayendo'); // animacion del meteoro

        meteoro.setVelocityY(200); //Velocidad vertical hacia abajo
   }

    update(){
        this.jugador.setVelocityX(0); // Detiene la nave cuando va de manera Horizontal
        this.jugador.setVelocityY(0); // Detiene la nave cuando va de manera Vertical
        
        if (this.cursors.left.isDown) {
            this.jugador.setVelocityX(-300); // Mover a la izquierda
            this.jugador.anims.play('izquierda',true)
        } else if (this.cursors.right.isDown) {
            this.jugador.setVelocityX(300); // Mover a la derecha
            this.jugador.anims.play('derecha',true);
        }else{
            this.jugador.anims.play('idle',true);
        }

        if (this.cursors.up.isDown) {
            this.jugador.setVelocityY(-300); // Mover hacia arriba
        } else if (this.cursors.down.isDown) {
            this.jugador.setVelocityY(300); // Mover hacia abajo
        }

        this.puntaje+=1; 
        this.textoPuntaje.setText('Puntaje: '+this.puntaje);

        if (this.puntaje >= 1000) { //puntaje para que pase a la siguiente escena
            const posicionNave = { x: this.jugador.x, y: this.jugador.y }; // Guarda posición
            this.scene.start('Escena3', {puntaje: this.puntaje, posicionNave}); // Cambiar a la siguiente escena y pasa el puntaje
        }

    }

    gameOver(jugador){
        this.physics.pause(); //Pausar el juego
        jugador.setTint(0xff0000);//Cambiar color para indicar impacto
        console.log('GameOver'); 
        this.scene.start('GameOver', {puntaje: this.puntaje}); //Escena GameOver y mostrar puntaje

    }

}export default Escena2;
