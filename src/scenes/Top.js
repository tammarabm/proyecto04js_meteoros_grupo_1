class Top extends Phaser.Scene {
    constructor() {
        super("Top"); 
        this.nombreJugador=0;
    }
    init(data){
        this.nombreJugador = data.nombreJugador; // Obtener nombre jugador
        this.puntaje = data.puntaje; //Recibir el puntaje
    }
    preload() {
        this.load.image('background', '/public/resources/img/background2.jpg');
    }
    create() {
        this.background = this.add.tileSprite(663, 298, 1326, 596, 'background');

        let topJugadores = JSON.parse(localStorage.getItem('topJugadores')) || [];

        topJugadores.push({ nombre: this.nombreJugador, puntaje: this.puntaje });

        topJugadores.sort((a, b) => b.puntaje - a.puntaje);
        topJugadores = topJugadores.slice(0, 5);

        localStorage.setItem('topJugadores', JSON.stringify(topJugadores));

        this.add.text(480, 200, 'TOP 5 JUGADORES :', { fontSize: '45px',fill: '#fff' });
        topJugadores.forEach((entry, index) => {
            this.add.text(550, 260 + (index * 50), `${index + 1}. ${entry.nombre}: ${entry.puntaje}`, { fontSize: '22px', fill: '#fff' });
        }); 
    }
    update(){
        this.background.tilePositionX += 2; // Ajusta la velocidad de desplazamiento del fondo
    }
}export default Top;
