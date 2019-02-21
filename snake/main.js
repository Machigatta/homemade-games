window.onload=function() {
    canvas=document.getElementById("snakeGC");
    ctx=canvas.getContext("2d");
    document.addEventListener("keydown",keyPushed);
    setInterval(gameLoop,1000/15);
}
var game = {
    startingTailCounter: 0,
    initialized: false,
    gridSize:20,
    objectSize:20
}
var player = {
    x:10,
    y:10,
    xVelocity:0,
    yVelocity:0,
    trail:[],
    tailLength:game.startingTailCounter
}
var apple = {
    x:10,
    y:10
}

function gameLoop() {
    //change direction
    player.x+=player.xVelocity;
    player.y+=player.yVelocity;

    //wall hit detection
    if(player.x<0){
        player.x = game.gridSize - 1;
    }else if(player.y<0){
        player.y = game.gridSize -1;
    }else if(player.x>game.gridSize){
        player.x = 0;
    }else if(player.y>game.gridSize){
        player.y = 0;
    }
      
    //draw background
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //draw snake
    for (let i = 0; i < player.trail.length; i++) {
        if(i==player.trail.length-1){
            //head
            ctx.fillStyle = "lime";
        }else{
            //tail
            ctx.fillStyle = "white";
        }
        ctx.fillRect(player.trail[i].x * game.gridSize, player.trail[i].y * game.gridSize, game.objectSize - 2, game.objectSize - 2);
        //hit detection eaten by itself
        if(player.trail[i].x == player.x && player.trail[i].y == player.y && player.tailLength > 1){
            player.tailLength = game.startingTailCounter;
            game.initialized=false;
        }
    }

    //add a tail-obj to the player.trail each loop with the new player coordinates
    player.trail.push({x:player.x,y:player.y});
    //shift the item if the trai would be too big
    while (player.trail.length > player.tailLength) {
        player.trail.shift();
    }

    //apple hit detection
    if((player.x==apple.x && player.y==apple.y) || !game.initialized ) {
        player.tailLength++;
        apple.x = Math.floor(Math.random() * game.gridSize);
        apple.y = Math.floor(Math.random() * game.gridSize);
        game.initialized = true;
    }

    //draw apple
    ctx.fillStyle="red";
    ctx.fillRect(apple.x * game.gridSize, apple.y * game.gridSize, game.objectSize - 2, game.objectSize-2);
}

function keyPushed(e) {
    switch (e.keyCode) {
        case 37:
            player.xVelocity=-1;
            player.yVelocity=0;
            break;
        case 38:
            player.xVelocity=0;
            player.yVelocity=-1;
            break;
        case 39:
            player.xVelocity=1;
            player.yVelocity=0;
            break;
        case 40:
            player.xVelocity=0;
            player.yVelocity=1;
            break;
        default:
            break;
    }
}