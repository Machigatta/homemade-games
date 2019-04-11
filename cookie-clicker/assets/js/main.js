var canvas, ctx, width, height;

var GAME = {
    frames: 0, 
    cCookies: 0,
    isRunning: false,
    spritesLoaded: false,
    cookieSpriteLoaded: false,
    mInterval: null
}

var MASTER_BUTTON_OBJECT = {
    BUTTON_STATE: {
        NORMAL: 0,
        HOVER: 1
    },
    GENERATED_BUTTONS: [],
    BUTTON_LIST: []
}

var BAR = {SPACE: 406, WIDTH: 31};

class M_BUTTON {
    constructor(B_L_Object, x, y) {
        this.name = B_L_Object.name;
        this.value = B_L_Object.value;
        this.state = MASTER_BUTTON_OBJECT.BUTTON_STATE.NORMAL;
        this.x = x;
        this.y = y;
        this.bought = 0;
        this.modulator = B_L_Object.modulator;
        this.price = B_L_Object.price;
        this.price_modulator = B_L_Object.price_modulator;
        this.locked = true;
        this.draw = function (ctx) {
            if(this.locked){
                SPRITES.BUTTON.LOCKED.draw(ctx, this.x, this.y);
            }
            else if (this.state == MASTER_BUTTON_OBJECT.BUTTON_STATE.HOVER) {
                SPRITES.BUTTON.HOVER.draw(ctx, this.x, this.y);
            }
            else {
                SPRITES.BUTTON.NORMAL.draw(ctx, this.x, this.y);
            }
            ctx.fillStyle = "#ffffff";
            ctx.font = "30px Verdana";
            ctx.fillText(`${this.name} (${this.price})`, this.x+(SPRITES.BUTTON.NORMAL.width / 2)-30, this.y+(SPRITES.BUTTON.NORMAL.height /2));
            ctx.font = "11px Verdana";
            printAt(ctx, `${this.name}: ${this.bought} => ${this.modulator}\nCPS: ${Math.floor(this.modulator * this.bought * 100) / 100}`, this.x+(SPRITES.BUTTON.NORMAL.width / 2)-30, this.y+(SPRITES.BUTTON.NORMAL.height /2)+15, 12);
            B_L_Object.icon_sprite.draw(ctx, this.x +20, this.y+15, 50);
        },
        this.isButtonHit = function (x, y) {
            if (x >= this.x && x <= this.x + SPRITES.BUTTON.NORMAL.width && y >= this.y && y <= this.y + SPRITES.BUTTON.NORMAL.height) {
                return true;
            }
            else {
                return false;
            }
        },
        this.buy = function(){
            if (this.locked) {
                return;
            }
            GAME.cCookies -= this.price;
            this.bought++;
        };
    }
}




function main() {
    canvas = document.createElement("canvas");

    width = window.innerWidth;
    height = window.innerHeight;
    
    if(width >= 500){
        //desktop
        width = 1280;
        height = 720;
    }

    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    var cookieSprite = new Image();
    cookieSprite.onload = function(){
        GAME.cookieSpriteLoaded = true;
        csInit(cookieSprite);
        isLoaded();
    }
    cookieSprite.src = "assets/img/mCookie.png";

    var btnSprite = new Image();
    btnSprite.onload = function(){
        GAME.spritesLoaded = true;
        sInit(btnSprite);
        isLoaded();
    }
    btnSprite.src = "assets/img/Button.png";
}

function isLoaded(){
    if (GAME.cookieSpriteLoaded && GAME.spritesLoaded && !GAME.isRunning)
       run();
}

//initializer
function run() {
    GAME.isRunning = true;

    document.addEventListener("click",mouseHook);
    document.addEventListener("mousemove",mouseOverHook);


    MASTER_BUTTON_OBJECT.BUTTON_LIST = [
        {name: "Oma", value: 10, bought: 0, modulator: 0.1, price: 10, price_modulator: 0.1, icon_sprite: SPRITES.ICONS.OMA},
        {name: "Bäcker", value: 10, bought: 0, modulator: 0.2, price: 50, price_modulator: 0.2, icon_sprite: SPRITES.ICONS.BÄCKER},
        {name: "Fabrik", value: 10, bought: 0, modulator: 0.3, price: 100, price_modulator: 0.3, icon_sprite: SPRITES.ICONS.FABRIK}
    ]
    MASTER_BUTTON_OBJECT.BUTTON_LIST.forEach( (element,i) => {
        MASTER_BUTTON_OBJECT.GENERATED_BUTTONS.push(new M_BUTTON(element, BAR.SPACE + BAR.WIDTH + ((BAR.SPACE - SPRITES.BUTTON.NORMAL.width)/2), SPRITES.BUTTON.NORMAL.height * i));    
    });

    GAME.mInterval = setInterval(CPS_TICK, 1000);
    
    var loop = function(){
        update();
        render();

        //https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
        window.requestAnimationFrame(loop, canvas);
    }   
    window.requestAnimationFrame(loop, canvas);
}

//update positions and stuff
function update() {
    GAME.frames++;

    MASTER_BUTTON_OBJECT.GENERATED_BUTTONS.forEach(element => {
        if (element.price > GAME.cCookies) {
            element.locked = true;
        }else{
            element.locked = false;
        }
    });
}

//render each sprite
function render() {

    ctx.clearRect(0,0,width, height);
    //#54c0c9
    ctx.fillStyle = "#54c0c9";
    ctx.fillRect(0,0,width,height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "30px Verdana";
    ctx.fillText(`${Math.floor(GAME.cCookies * 100) / 100} COOKIES`, 100, 150);

    ctx.fillRect(BAR.SPACE,0,BAR.WIDTH,height);
    ctx.fillRect(BAR.SPACE*2+BAR.WIDTH,0,BAR.WIDTH,height);

    SPRITES.COOKIE.draw(ctx, (BAR.SPACE - SPRITES.COOKIE.width)/2, height/2 - SPRITES.COOKIE.height / 2);

    MASTER_BUTTON_OBJECT.GENERATED_BUTTONS.forEach(element => {
        element.draw(ctx);
    });
}

function CPS_TICK(){

    let CPS = 0;
    MASTER_BUTTON_OBJECT.GENERATED_BUTTONS.forEach(element => {
        CPS += (element.modulator * element.bought);
    });
    GAME.cCookies += CPS;
    
}

function mouseHook(e){
    if(e.target == canvas){
        
        
       //has hit cookie
       if ( (e.layerX >=  (BAR.SPACE - SPRITES.COOKIE.width)/2 && e.layerX <= SPRITES.COOKIE.width+ (BAR.SPACE - SPRITES.COOKIE.width)/2 ) && ( e.layerY >= height/2 - SPRITES.COOKIE.height/2 && e.layerY <=  height/2 + SPRITES.COOKIE.height/2 ) ) {
        GAME.cCookies++; 
       }

       //has hit upgrade button
       MASTER_BUTTON_OBJECT.GENERATED_BUTTONS.forEach(element => {
            if(element.isButtonHit(e.layerX, e.layerY) && !element.locked){
                element.buy();
            }
        });
       
       //has hit power up
       //TODO
    }
}

function mouseOverHook(e) {
    if(e.target == canvas){
        MASTER_BUTTON_OBJECT.GENERATED_BUTTONS.forEach(element => {
            if(element.isButtonHit(e.layerX, e.layerY)){
                element.state = MASTER_BUTTON_OBJECT.BUTTON_STATE.HOVER;
            }else{
                element.state = MASTER_BUTTON_OBJECT.BUTTON_STATE.NORMAL;
            }
        });
    }
}


main();