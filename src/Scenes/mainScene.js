class mainScene extends Phaser.Scene {
    constructor() {
        super("platformerScene");

        this.my = {sprite: {}, text: {}};
    }

    init() {
        // variables and settings
        this.ACCELERATION = 300;
        this.DRAG = 600;    // DRAG < ACCELERATION = icy slide
        this.physics.world.gravity.y = 1500;
        this.JUMP_VELOCITY = -400;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = 3.0;
    }
//asdasdasasdasd
    create() {
        // Create a new tilemap game object which uses 18x18 pixel tiles, and is
        // 45 tiles wide and 25 tiles tall.
        this.map = this.add.tilemap("platformer-level-1", 18, 18, 120, 40);

        this.pick = this.input.keyboard.addKey("E");

        this.canUp = false;
        this.donutMade = false;
        this.waterUp = false;
        this.shovelUp = false;

        this.cornerPosX = 0;
        this.cornerPosY = 0;

        // Add a tileset to the map
        // First parameter: name we gave the tileset in Tiled
        // Second parameter: key for the tilesheet (from this.load.image in Load.js)
        this.tileset = this.map.addTilesetImage("tilemapBig_packed", "tilemap_tiles_big");

        // Create a layer
        this.detailLayer = this.map.createLayer("Details", this.tileset, 0, 0);
        this.groundLayer = this.map.createLayer("Ground", this.tileset, 0, 0);
        

        // Make it collidable
        this.groundLayer.setCollisionByProperty({
            collides: true
        });

        // Find coins in the "Objects" layer in Phaser
        // Look for them by finding objects with the name "coin"
        // Assign the coin texture from the tilemap_sheet sprite sheet
        // Phaser docs:
        // https://newdocs.phaser.io/docs/3.80.0/focus/Phaser.Tilemaps.Tilemap-createFromObjects

        
        this.can = this.map.createFromObjects("Objects", {
            name: "can",
            key: "tilemap_sheet",
            frame: 442
        });
        this.water = this.map.createFromObjects("Objects", {
            name: "water",
            key: "tilemap_sheet",
            frame: 53
        });
        this.box = this.map.createFromObjects("Objects", {
            name: "box",
            key: "tilemap_sheet",
            frame: 26
        });
        this.flag = this.map.createFromObjects("Objects", {
            name: "flag",
            key: "tilemap_sheet",
            frame: 111
        });
        this.flag = this.map.createFromObjects("Objects", {
            name: "flag",
            key: "tilemap_sheet",
            frame: 111
        });
        this.flag = this.map.createFromObjects("Objects", {
            name: "flag",
            key: "tilemap_sheet",
            frame: 111
        });
        this.flag = this.map.createFromObjects("Objects", {
            name: "flag",
            key: "tilemap_sheet",
            frame: 111
        });



        this.E = this.map.createFromObjects("Objects", {
            name: "E",
            key: "tilemap_sheet",
            frame: 173
        });
        
        

        // Since createFromObjects returns an array of regular Sprites, we need to convert 
        // them into Arcade Physics sprites (STATIC_BODY, so they don't move) 
        this.physics.world.enable(this.can, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.water, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.flag, Phaser.Physics.Arcade.STATIC_BODY);


        this.physics.world.enable(this.E, Phaser.Physics.Arcade.STATIC_BODY);

        // Create a Phaser group out of the array this.coins
        // This will be used for collision detection below.
        this.waterGroup = this.add.group(this.water);
        this.boxGroup = this.add.group(this.box);
        this.flagGroup = this.add.group(this.flag);

        //this.EGroup = this.add.group(this.E);
        

        // set up player avatar
        my.sprite.player = this.physics.add.sprite(50, 600, "platformer_characters", "tile_0000.png");
        my.sprite.player.setCollideWorldBounds(false);

        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.groundLayer);


        //ALL LOGS
        this.physics.add.overlap(my.sprite.player, this.E, (obj1, obj2) => {
            obj2.setVisible(true);
            this.can.setPosition(this.cornerPosX, this.cornerPosY);
            if(Phaser.Input.Keyboard.JustDown(this.pick)) {
                
                //obj2.setPosition(this.cornerPosX, this.cornerPosY);
                this.my.text.speach = this.add.bitmapText(obj2.x - 50, obj2.y - 25, "honk", "BAHHH IM THE GLUCOSE GOBLIN AND I WANT THE SWEETEST TREAT YOU HAVE!");
                this.my.text.speach.setScale(0.4);
                this.sound.play("write", {
                    volume: 0.4   // Can adjust volume using this, goes from 0 to 1
                });

                const delay = 3000;

            // Create a timer to handle text disappearance
                const timer = this.time.delayedCall(delay, () => {
                    this.my.text.speach.destroy(); // Destroy the text object after the delay
                });
            }
        });

        this.physics.add.overlap(my.sprite.player, this.can, (obj1, obj2) => {
            if(Phaser.Input.Keyboard.JustDown(this.pick)) {
                obj2.destroy();
                this.canUp = true;
                this.sound.play("pickup", {
                    volume: 0.4   // Can adjust volume using this, goes from 0 to 1
                });
            }
        });

        this.physics.add.overlap(my.sprite.player, this.waterGroup, (obj1, obj2) => {
            if(Phaser.Input.Keyboard.JustDown(this.pick)) {
                if(this.canUp){
                    obj2.destroy();
                    this.waterUp = true;
                    this.sound.play("water", {
                        volume: 0.4   // Can adjust volume using this, goes from 0 to 1
                    });
                } else {
                    this.sound.play("wrong", {
                        volume: 0.4   // Can adjust volume using this, goes from 0 to 1
                    });
                }
                
            }
        });





        
        this.physics.add.overlap(my.sprite.player, this.carrotGroup, (obj1, obj2) => {
            if(Phaser.Input.Keyboard.JustDown(this.pick)) {
                if(this.shovelUp){
                    obj2.destroy();
                    this.objCount += 1;
                    this.sound.play("pickup", {
                        volume: 0.4   // Can adjust volume using this, goes from 0 to 1
                    });
                } else {
                    this.sound.play("wrong", {
                        volume: 0.4   // Can adjust volume using this, goes from 0 to 1
                    });
                }
            }
        });

        this.physics.add.overlap(my.sprite.player, this.flagGroup, (obj1, obj2) => {
            if(Phaser.Input.Keyboard.JustDown(this.pick)) {
                if(this.donutMade){
                    this.my.text.score = this.add.bitmapText(this.cameras.main.width, this.cameras.main.height, "honk", "The Glucose Goblin got his Donut!");
                    this.my.text.score.setScale(0.6);
                    this.stewMade = true;
                    this.sound.play("win", {
                        volume: 0.4   // Can adjust volume using this, goes from 0 to 1
                    });
                } else {
                    this.sound.play("wrong", {
                        volume: 0.4   // Can adjust volume using this, goes from 0 to 1
                    });
                }
                
            } 
        });

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        this.rKey = this.input.keyboard.addKey('R');

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this);

        my.vfx.walking = this.add.particles(0, 0, "kenny-particles", {
            frame: ['smoke_01.png', 'smoke_03.png'],
            // TODO: Try: add random: true,
            scale: {start: 0.02, end: 0.1},
            maxAliveParticles: 50,
            lifespan: 500,
            gravityY: -50,
            alpha: {start: 1, end: 0.1}, 
        });

        my.vfx.walking.stop();
        

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 1000, 1000); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(0, 0);
        this.cameras.main.setZoom(this.SCALE);
        

    }

    update() {

        if(this.my.text.score){
            this.my.text.score.x = my.sprite.player.displayWidth - 20;
            this.my.text.score.y = my.sprite.player.displayHeight - 50;
        }

        this.cornerPosX = my.sprite.player.x- 50;
        this.cornerPosY = my.sprite.player.y - 30;

        if(cursors.left.isDown) {
            my.sprite.player.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk', true);

            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-10, my.sprite.player.displayHeight/2-5, false);

            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);

            // Only play smoke effect if touching the ground

            if (my.sprite.player.body.blocked.down) {

                my.vfx.walking.start();

            }

        } else if(cursors.right.isDown) {
            my.sprite.player.setAccelerationX(this.ACCELERATION);
            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk', true);
            // TODO: add particle following code here

            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-10, my.sprite.player.displayHeight/2-5, false);

            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);

            // Only play smoke effect if touching the ground

            if (my.sprite.player.body.blocked.down) {

                my.vfx.walking.start();

            }

        } else {
            // Set acceleration to 0 and have DRAG take over
            my.sprite.player.setAccelerationX(0);
            my.sprite.player.setDragX(this.DRAG);
            my.sprite.player.anims.play('idle');

            my.vfx.walking.stop();
        }

        // player jump
        // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
        if(!my.sprite.player.body.blocked.down) {
            my.sprite.player.anims.play('jump');
        }
        if(my.sprite.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
            this.sound.play("jump", {
                volume: 0.4   // Can adjust volume using this, goes from 0 to 1
            });
        }

        if(Phaser.Input.Keyboard.JustDown(this.rKey) && this.stewMade) {
            this.scene.restart();
        }
    }
}