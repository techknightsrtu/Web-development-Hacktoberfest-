var config = {
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'Assets/back.jpg');
    this.load.image('mywheel', 'Assets/wheel.png');
    this.load.image('pin', 'Assets/pin.png');;
    this.load.image('stand', 'Assets/stand.png');
    this.load.image('start', 'Assets/spin-n-win-logo.png.jpg');
    this.load.image('won', 'Assets/Youwon.jpg');

    this.load.audio('spin', 'Assets/wheel-audio.mp3.mp3');
}

function create() {
    let W = game.config.width;
    let H = game.config.height;
    background = this.add.sprite(W / 2, H / 2, 'background');
    this.pin = this.add.sprite(W / 2, H / 2 - 150, 'pin').setScale(0.2);
    this.pin.depth = 1;
    this.stand = this.add.sprite(W / 2, H / 2 + 250, 'stand').setScale(0.25);
    this.wheel = this.add.sprite(W / 2, H / 2+50, 'mywheel').setScale(0.2).setOrigin(0.5, 0.5);
    this.start = this.add.sprite(W/2, 70, 'start').setScale(.50).setInteractive({
        cursor: 'pointer'
    });
    
    this.won = this.add.sprite(400, 300, 'won');
    this.won.visible = false;
    this.spin = this.sound.add('spin');
    this.start.on('pointerdown', spinWheel, this);
}

function spinWheel() {
    let W = game.config.width;
    let H = game.config.height;
    this.start.visible = false;
    this.sound.play('spin');
    console.log("In the spin wheel function");
    let rounds = Phaser.Math.Between(0, 11);
    let prizes = ["CB BOOK", "CB TSHIRT", "2 EXTRA SPIN", "AMAZON VOUCHER", "50% OFF", "NETFLIX SUBS", "100% OFF", "CB SWAGPACK", "70% OFF", "HARD LUCK", "35% OFF", "3000 CB CREDITS"];
    console.log(prizes[rounds]);
    let tween = this.tweens.add({
        targets: this.wheel,
        ease: "Cubic.easeOut",
        angle: 360 * 3 + (30 * rounds),
        duration: 13000
    })
    setTimeout(() => {
        console.log("Timeout to freeze the mouse")
        this.pin.visible = false;
        this.won.visible = true;
        this.add.text(300, 300, `${prizes[rounds]}`, {
            fontSize: '30px',
            fontFamily: 'ComicSansMs',
            color: 'red',
            style: 'bold',
        });
        this.input.on("pointerdown", restart, this);
    }, 13000);

}

function update() {
    console.log("In update");

}

function restart() {
    this.scene.restart();

}