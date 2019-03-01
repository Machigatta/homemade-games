var canvas, ctx, width, height;

var GAME_STATES = {
    Start: 0,
    Game: 1,
    End: 2
}

var GAME = {
    frames: 0, 
    score: 0,
    curState: GAME_STATES.Start,
    bAnimation: 0
}

var BIRD = {
    x: 0,
    y: 0,
    animationFrame: 0,
    animation: [0,1,2,1],
    angle: 0,
    isAlive: true,
    gravity: 0.50,
    velocity: 4.5,
    init: function(){
        //set to center
        this.x = canvas.width / 2 - 5;
        this.y = canvas.height / 2 - 3;
    },
    update: function(){
        if(this.isAlive){
            if (GAME.frames % 10 == 0) {
                (this.animation.length - 1 > this.animationFrame) ? this.animationFrame++ : this.animationFrame = 0;
            }
            if(GAME.curState === GAME_STATES.Game){
                this.y += (this.gravity * this.velocity);
                this.velocity += 0.5;

                if(this.velocity > 0){
                    this.angle = 40;
                }else{
                    this.angle = 310;
                }
            }
        }
    },
    draw: function(ctx){
        ctx.save();
        //move origin to bird
        //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate
        ctx.translate(this.x, this.y);
        //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate
        ctx.rotate(this.angle * Math.PI / 180);
        var aFrame = this.animation[this.animationFrame];
        SPRITES.BIRD[aFrame].draw(ctx, -SPRITES.BIRD[aFrame].width / 2, -SPRITES.BIRD[aFrame].height / 2);
        ctx.restore();
    },
    reset: function(){
        this.init();
        this.angle = 0;
        this.isAlive = true;
        this.gravity = 0.50;
        this.velocity = 4.5;
    }
};

var PIPES = {
    pp: [],
    draw: function(ctx){
        for (let i = 0; i < this.pp.length; i++) {
            var pipe = this.pp[i];
            SPRITES.PIPE_SOUTH.draw(ctx,pipe.x,pipe.y);
            SPRITES.PIPE_NORTH.draw(ctx, pipe.x, pipe.y+80+pipe.height);
        }
    },
    update: function(){
        if(GAME.frames % 100 == 0){
            
            //add pipes every 100 frames
            var y = height - (SPRITES.PIPE_SOUTH.height + SPRITES.BOTTOM.height + 120 + 200 * Math.random());
            this.pp.push({
                x: 500,
                y: y,
                width: SPRITES.PIPE_SOUTH.width,
                height: SPRITES.PIPE_SOUTH.height
            })
        }

        //move pipes from right to left
        var len = this.pp.length;
        for (let i = 0; i < len; i++) {
            var pipe = this.pp[i];

            pipe.x -= 2;
            //out of picuter
            if (pipe.x < -100) {
                this.pp.splice(i, 1);
                i--;
                len--;
            }
        }

        //check hitdetection
        for (let i = 0; i < this.pp.length; i++) {
            var pipe = this.pp[i];
            if(
                ((pipe.x + pipe.width >= BIRD.x) && (pipe.x <= BIRD.x)) 
                && 
                ((pipe.y <= BIRD.y) && (pipe.y + pipe.height >= BIRD.y) //TOP-PIPE
                ||
                (pipe.y + 80 + pipe.height <= BIRD.y) && (pipe.y + 80 + pipe.height + pipe.height >= BIRD.y)) //BOTTOM-PIPE
            ){
                BIRD.isAlive = false;
                GAME.curState = GAME_STATES.End;
            }else{
                if (pipe.x+pipe.width == BIRD.x - 1) {
                    GAME.score++;
                }
            }
        }
    },
    reset: function(){
        this.pp = [];
    }
}

function main() {
    canvas = document.createElement("canvas");

    width = window.innerWidth;
    height = window.innerHeight;

    
    if(width >= 500){
        //desktop
        width = 320;
        height = 480;
    }

    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    var spriteSheet = new Image();
    spriteSheet.onload = function(){
        sInit(spriteSheet);
        run();
    }
    spriteSheet.src = "assets/img/sprites.png";
}

//initializer
function run() {
    BIRD.init();
    document.addEventListener("click",mouseHook);
    //document.addEventListener("mousemove",mouseHook);
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
    if(GAME.curState === GAME_STATES.Game){
        //animate bottom on game mode not on end or start
        GAME.bAnimation = (GAME.bAnimation - 2) % 21;
    }
    BIRD.update();
    if (GAME.curState === GAME_STATES.Game) {
        PIPES.update();
    }
    
    if(BIRD.y < 0 || BIRD.y > height - SPRITES.BOTTOM.height){
        BIRD.isAlive = false;
        GAME.curState = GAME_STATES.End;
    }
}

//render each sprite
function render() {

    //#54c0c9
    ctx.fillStyle = "#54c0c9";
    ctx.fillRect(0,0,width,height);

    SPRITES.BG.draw(ctx, 0, height-SPRITES.BG.height);
    SPRITES.BG.draw(ctx, SPRITES.BG.width, height-SPRITES.BG.height);
    
    BIRD.draw(ctx);
    PIPES.draw(ctx);

    SPRITES.BOTTOM.draw(ctx, GAME.bAnimation, height - SPRITES.BOTTOM.height);
    SPRITES.BOTTOM.draw(ctx, GAME.bAnimation+SPRITES.BOTTOM.width, height - SPRITES.BOTTOM.height);

    if (GAME.curState === GAME_STATES.Start || GAME.curState === GAME_STATES.End) {
        SPRITES.START_BUTTON.draw(ctx, width / 2 - SPRITES.START_BUTTON.width / 2, 290);
        SPRITES.NAME.draw(ctx, width / 2 - SPRITES.NAME.width / 2, 50);
        if (GAME.curState === GAME_STATES.Start) {
            SPRITES.READY.draw(ctx, width / 2 - SPRITES.READY.width / 2, 120);
        } else if (GAME.curState === GAME_STATES.End) {
            SPRITES.GAMEOVER.draw(ctx, width / 2 - SPRITES.READY.width / 2, 120);
            ctx.fillStyle = "white";
            ctx.font = "70px Georgia";
            ctx.fillText(GAME.score, 135, 260);
        }
    }else{
        ctx.fillStyle = "white";
        ctx.font = "20px Georgia";
        ctx.fillText(GAME.score,20,20);
    }

    SPRITES.COPYRIGHT.draw(ctx, width - SPRITES.COPYRIGHT.width, 0);
}

function mouseHook(e){
    if(e.target == canvas){        
        hit(SPRITES.START_BUTTON, e, function(){
            if (GAME.curState === GAME_STATES.Start || GAME.curState === GAME_STATES.End) {
                PIPES.reset();
                BIRD.reset();
                GAME.curState = GAME_STATES.Game;
                GAME.score = 0;
            }
        })
        if(GAME.curState === GAME_STATES.Game){
            if(BIRD.velocity > 0){
                BIRD.velocity = -10.5;
            }else{
                if(BIRD.velocity >= -20){
                    BIRD.velocity -= 7;
                }
            }
            
        }
    }
}

function hit(operation, arg, callback){
    switch (operation) {
        case SPRITES.START_BUTTON:
            if((arg.layerX >= width / 2 - SPRITES.START_BUTTON.width / 2) && (arg.layerX <= width / 2 + SPRITES.START_BUTTON.width / 2) && (arg.layerY >= 290) && (arg.layerY <= 290 + SPRITES.START_BUTTON.height)){
                callback();
            }
            break;
        default:
            break;
    }
}

main();