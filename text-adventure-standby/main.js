var canvas, ctx, activePlace;

var COLORS = {
    DARK_GRAY: 'rgba(80, 80, 80, 1)',
    LIGHT_GRAY: 'rgba(211, 211, 211, 0.7)',
    WHITE: 'rgba(255, 255, 255, 1)'
}

var GAME_STATES = {
    START: 0,
    RUNNING: 1,
    PAUSED: 2,
    STOPPED: 3
}

var GAME = {
    frames: 0, 
    curState: GAME_STATES.START,
    maxLines: 20,
    pathBase: {
        main: "start",
        left: null,
        execute: null,
        right: null
    }
}

var LINES = [];

//startingpoint - init
function main() {
    canvas = document.getElementById("mtaCanvas");
    ctx = canvas.getContext("2d");
    activePlace = document.getElementById("activePlace");
    run();
}

//start running
function run() {
    document.addEventListener("keydown",keydown_event);
    setPath();
    var loop = function(){
        update();
        render();
        window.requestAnimationFrame(loop, canvas);
    }   
    window.requestAnimationFrame(loop, canvas);
}

//update objects
function update() {
    LINES = path_main[GAME.pathBase.main].line;
}

//render objects
function render() {

    //clear
    ctx.clearRect(0,0,canvas.width, canvas.height);

    LINES.forEach(function(element,i){
        ctx.font = '16px serif';
        ctx.fillStyle = 'rgba(0, 0, 0, '+(1 - ( (1/GAME.maxLines) * i))+')';
        ctx.fillText(element,10,(i*20)+20);
    });
    
    //draw controls
    ctx.fillStyle = COLORS.LIGHT_GRAY;
    roundRect(ctx,0,canvas.height-50,canvas.width,50,20,true,false)

    //draw path1 button
    ctx.fillStyle = COLORS.DARK_GRAY;
    roundRect(ctx,20,canvas.height-40,150,30,10,true,false)
    ctx.fillStyle = COLORS.WHITE;
    ctx.fillText("< | "+((GAME.pathBase.left == null) ? "" : GAME.pathBase.left.label),30,canvas.height-40+20);

    //draw path2 button
    ctx.fillStyle = COLORS.DARK_GRAY;
    roundRect(ctx,canvas.width - 20 - 150,canvas.height-40,150,30,10,true,false)
    ctx.fillStyle = COLORS.WHITE;
    ctx.fillText("> | "+((GAME.pathBase.right == null) ? "" : GAME.pathBase.right.label),canvas.width - 10 - 150,canvas.height-40+20);
    
    //draw execute button
    ctx.fillStyle = COLORS.DARK_GRAY;
    roundRect(ctx,canvas.width/2 - 75,canvas.height-40,150,30,10,true,false)
    ctx.fillStyle = COLORS.WHITE;
    ctx.fillText("X | "+((GAME.pathBase.execute == null) ? "" : GAME.pathBase.execute.label),canvas.width/2 - 65,canvas.height-40+20);

    //draw start / pause / stop button

}

//check keystrokes
function keydown_event(e) {
    switch (e.keyCode) {
        //<
        case 37: 
            setPath("left", path_main[GAME.pathBase.main].left);
            break;
        //>
        case 39: 
            setPath("right", path_main[GAME.pathBase.main].right);
            break;
        //x
        case 88: 
            setPath("execute", path_main[GAME.pathBase.main].execute);
            break;
        default:
            break;
    }
    clearLines();
}

main();