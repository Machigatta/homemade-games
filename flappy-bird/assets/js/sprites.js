var SPRITES = {
    BIRD: null,
    BG: null,
    PIPE_NORTH: null,
    PIPE_SOUTH: null,
    BOTTOM: null,
    NAME: null,
    READY: null,
    COPYRIGHT: null,
    START_BUTTON:null
}

//Sprite-Class
function Sprite(img, x, y, width, height) {
    this.img = img;
    this.x = x*2;
    this.y = y*2;
    this.width = width*2;
    this.height = height*2;
    this.draw = function (ctx, x, y) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
    }
}

function sInit(img){
    SPRITES.BIRD = [
        new Sprite(img, 0, 430, 20, 12),
        new Sprite(img, 25, 430, 20, 12),
        new Sprite(img, 50, 430, 20, 12)
    ];

    //BG Sprites
    SPRITES.BG = new Sprite(img, 0, 0, 125, 224);
    SPRITES.BOTTOM = new Sprite(img, 257, 0, 147, 49);

    //Pipes
    SPRITES.PIPE_SOUTH = new Sprite(img, 49, 284, 24, 142);
    SPRITES.PIPE_NORTH = new Sprite(img, 73, 284, 24, 142);

    //Text
    SPRITES.NAME = new Sprite(img, 305, 79, 84, 24);
    SPRITES.READY = new Sprite(img, 257, 50, 88, 27);
    SPRITES.GAMEOVER = new Sprite(img, 342, 50, 90, 27);
    SPRITES.COPYRIGHT = new Sprite(img, 387, 79, 58, 24);

    //Button
    SPRITES.START_BUTTON = new Sprite(img, 308, 103, 49, 26);
}