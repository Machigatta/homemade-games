var SPRITES = {
    COOKIE: null,
    BG: null,
    BUTTON: {
        NORMAL: null,
        HOVER: null,
        LOCKED: null
    },
    ICONS: {
        OMA: null,
        BÄCKER: null,
        FABRIK: null
    }
}

//Sprite-Class
class Sprite {
    constructor(img, x, y, width, height) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.draw = function (ctx, x, y, scaleRatio) {
            if (typeof scaleRatio == 'undefined')
                scaleRatio = 100;

            let customWidth = this.width / 100 * scaleRatio;
            let customHeight = this.height / 100 * scaleRatio;

            ctx.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, customWidth,customHeight);
        };
    }
}

function csInit(img) {
    SPRITES.COOKIE = new Sprite(img, 0, 0, 256, 256);
}

function sInit(img){
    SPRITES.BUTTON.NORMAL = new Sprite(img, 300, 284, 400, 175);
    SPRITES.BUTTON.HOVER = new Sprite(img, 744, 284, 400, 175);
    SPRITES.BUTTON.LOCKED = new Sprite(img, 1188, 284, 400, 175);

    SPRITES.ICONS.OMA = new Sprite(img, 1125, 1310, 250, 250);
    SPRITES.ICONS.BÄCKER = new Sprite(img, 1125, 1570, 250, 250);
    SPRITES.ICONS.FABRIK = new Sprite(img, 1125, 790, 250, 250);
}