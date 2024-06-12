class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        // Load characters spritesheet
        this.load.atlas("platformer_characters", "tilemap-characters-packed.png", "tilemap-characters-packed.json");

        this.load.audio("wrong", "648462__andreas__wrong-answer.mp3");
        this.load.audio("pickup", "678385__deltacode__item-pickup-v2.wav");
        this.load.audio("jump", "277219__thedweebman__8-bit-jump-2.wav");
        this.load.audio("water", "221614__moodpie__splash_2.wav");
        this.load.audio("win", "668436__david819__win.mp3")
        this.load.audio("write", "335518__newagesoup__writing-short-8.wav")

        // Load tilemap information
       //this.load.image("tilemap_tiles", "tilemap_packed.png");
       // this.load.image("tilemap_tiles_farm", "tilemapFarm_packed.png");  
        //this.load.image("tilemap_tiles_food", "tilemapFood_packed.png");        
        this.load.image("tilemap_tiles_big", "tilemapBig_packed.png"); // Packed tilemap
        this.load.tilemapTiledJSON("platformer-level-1", "platformer-level-1.tmj");   // Tilemap in JSON

        // Load the tilemap as a spritesheet
        this.load.spritesheet("tilemap_sheet", "tilemapBig_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });

        this.load.bitmapFont("honk", "Honk_0.png", "Honk.fnt");

        // Oooh, fancy. A multi atlas is a texture atlas which has the textures spread
        // across multiple png files, so as to keep their size small for use with
        // lower resource devices (like mobile phones).
        // kenny-particles.json internally has a list of the png files
        // The multiatlas was created using TexturePacker and the Kenny
        // Particle Pack asset pack.
        this.load.multiatlas("kenny-particles", "kenny-particles.json");
    }

    create() {
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('platformer_characters', {
                prefix: "tile_",
                start: 0,
                end: 1,
                suffix: ".png",
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            defaultTextureKey: "platformer_characters",
            frames: [
                { frame: "tile_0000.png" }
            ],
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            defaultTextureKey: "platformer_characters",
            frames: [
                { frame: "tile_0001.png" }
            ],
        });

         // ...and pass to the next Scene
         this.scene.start("platformerScene");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}