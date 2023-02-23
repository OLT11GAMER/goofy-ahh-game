var player;
var stars;
var platforms;
var cursors;
var movingPlatform;
var cameras;
var bullet
class MeGame extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.image('bg', 'assets/map_background.png');
        this.load.image('block', 'assets/block.png');
        this.load.image('ground', 'assets/ground.png');
        this.load.image('bullet', 'assets/bullet.png');
        
    }
    

    create() {
        platforms = this.physics.add.staticGroup();

        bullet = this.physics.add.staticGroup();
        //  Set the camera and physics bounds to be the size of 4x4 bg images
        this.cameras.main.setBounds(0, 0, 600 * 2, 600 * 2);
        this.physics.world.setBounds(0, 0, 800 * 2, 600 * 2);
        //  Mash 4 images together to create our background
        this.add.image(0, 0, 'bg').setOrigin(0);
        this.add.image(800, 0, 'bg').setOrigin(0).setFlipX(true);
        this.add.image(0, 600, 'bg').setOrigin(0).setFlipY(true);
        this.add.image(800, 600, 'bg').setOrigin(0).setFlipX(true).setFlipY(true);
        this.add.image(0, 0, 'bg').setOrigin(0);
        this.cursors = this.input.keyboard.createCursorKeys();
        platforms.create(400, 568, 'ground').setScale(20,1).refreshBody();
        platforms.create(600, 435, 'ground');
        platforms.create(800, 240, 'ground');
        platforms.create(500, 380, 'ground');
        platforms.create(200, 200, 'ground');
        platforms.create(350, 280, 'ground');
        platforms.create(50, 300, 'ground');
        platforms.create(800, 320, 'ground');

        player = this.physics.add.image(400, 300, 'block'); 
       
        player.setCollideWorldBounds(true);
        player.body.setGravityY(300);
    
        this.physics.add.collider(player, platforms);

        player.setCollideWorldBounds(true);

        this.cameras.main.startFollow(player, true, 0.05, 0.05);

        // platforms = this.physics.add.staticGroup();
        


        // this.physics.add.collider(player, platforms);
        // this.physics.add.collider(stars, platforms);
        // this.physics.add.collider(bombs, platforms);
        // this.physics.add.overlap(player, stars, collectStar, null, this);
        // this.physics.add.collider(player, bombs, hitBomb, null, this);
        
    }

    update() {

        player.setVelocityX(0);
        

        if (this.cursors.left.isDown) {
            player.setVelocityX(-300);
        }
        else if (this.cursors.right.isDown) {
            player.setVelocityX(300);
        }

        if (this.cursors.up.isDown&& player.body.touching.down) {
            player.setVelocityY(-500);
            
        }
        else if (this.cursors.down.isDown) {
            player.setVelocityY(500);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: [MeGame]
};


const game = new Phaser.Game(config);