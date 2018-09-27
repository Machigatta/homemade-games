// global setting-variables
var blockHeight = 200;
var blockWidth = 10;
var ballRadiant = 10;
var blockSpacing = 20;

// movement variables
var movingSpeed = 10;
var ballSpeedX = ballSpeedY = ballSpeedBaseX = ballSpeedBaseY = 10;

//position variables
var playerY=playerX=0;
var enemyY=enemyX=0;
var ballY=ballX=0;

//dom-objects
var ePoints=pPoints=null;

//utilty-variables
var playerPoints=enemyPoints=0;
var ballSpeedLabel="";

//on-load function-hook
window.onload=function() {

    //get dom-objects
    canvas=document.getElementById("pongCanvas");
    ctx=canvas.getContext("2d");
    pPoints=document.getElementById("pPoint");
    ePoints=document.getElementById("ePoint");
    ballSpeedLabel=document.getElementById("ballSpeed");

    //init player positions
    playerY = ((canvas.height/2) - (blockHeight/2));
    enemyY = ((canvas.height/2) - (blockHeight/2));
    playerX = blockSpacing;
    enemyX = canvas.width - blockSpacing - blockWidth;

    //init ball-position
    resetBall();

    //add control-listener
    document.addEventListener("keydown",keyPushed);

    //start game-loop
    setInterval(gameLoop,1000/30);
}

//main game-loop
function gameLoop() {

    //basic background
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //player
    ctx.fillStyle="white";
    ctx.fillRect(playerX,playerY,blockWidth,blockHeight);

    //enemy
    ctx.fillStyle="white";
    ctx.fillRect(enemyX,enemyY,blockWidth,blockHeight);

    //update circle
    updateCircle();

    //detect collisions
    collisionManagement();

    //move enemy
    AI();

    //update labels
    pPoints.innerText = playerPoints;
    ePoints.innerText = enemyPoints;
    ballSpeedLabel.innerText = ballSpeedY+"x"+ballSpeedX;
}

//detect collisions
function collisionManagement(){
    //one third of a block
    let blockHeightThird = (blockHeight / 3);

    // ball is behind player-block (can't catch it anymore)
    if(ballX <= ballRadiant + blockSpacing){
        // ball passed thru the left-border
        if(ballX <= ballRadiant){

            //add point and reset
            enemyPoints++;
            resetBall();
        }
    // ball is behind enemy-block (can't catch it enymore)
    }else if(ballX >= (canvas.width - ballRadiant - blockSpacing)){
        if (ballX >= (canvas.width-ballRadiant)){
            //add point and reset
            playerPoints++;
            resetBall();
        }
        
    // player-block connected to ball positions 
    }else if ((ballX <= (playerX + blockWidth + ballRadiant)) && ( (ballY >= playerY) && (ballY <= playerY + blockHeight))){
        // invert x-direction
        ballSpeedX = -ballSpeedX;

        let step = 0;

        // player hit in upper third part of the block
        if(ballY >= playerY && ballY <= playerY + blockHeightThird){
            // add or substract, based on he ballSpeed
            if(ballSpeedX < 0){
                step = step - 2;
            }else{
                step = step + 2;
            }
        // player hit in lower third part of the block
        }else if(ballY >= (playerY + (blockHeightThird * 2)) && ballY <= (playerY + (blockHeightThird * 3))){
            // add or substract, based on he ballSpeed
            if(ballSpeedX < 0){
                step = step - 2;
            }else{
                step = step + 2;
            }
        }

        // add / substract to speed
        ballSpeedY += step;
        
    //enemy hit the ball
    }else if ((ballX >= (enemyX - ballRadiant)) && ( (ballY >= enemyY) && (ballY <= enemyY + blockHeight))){
        // invert x-direction
        ballSpeedX = -ballSpeedX;

        let step = 0;

        // player hit in upper third part of the block
        if(ballY <= enemyY && ballY <= enemyY + blockHeightThird){
            // add or substract, based on he ballSpeed
            if(ballSpeedX < 0){
                step = step - 2;
            }else{
                step = step + 2;
            }
        // player hit in lower third part of the block
        }else if(ballY <= (enemyY + (blockHeightThird * 2)) && ballY <= (enemyY + (blockHeightThird * 3))){
            // add or substract, based on he ballSpeed
            if(ballSpeedX < 0){
                step = step - 2;
            }else{
                step = step + 2;
            }
        }

        // add / substract to speed
        ballSpeedY += step;
    }
}

//reset ball-position
function resetBall(){
    ballY = (canvas.height / 2) - (ballRadiant /2)
    ballX = (canvas.width / 2) - (ballRadiant /2)

    ballSpeedX = ballSpeedBaseX;
    ballSpeedY = ballSpeedBaseY;
}

//enemy player
function AI(){
    var diff = ((enemyY + (blockHeight / 2)) - ballY);
    if(diff > 0 && diff >= 6){
        if((enemyY - movingSpeed ) >= 0 ){
            enemyY -= 6;
        }
    }else {
        if((enemyY + movingSpeed ) <= (canvas.height - blockHeight) ){
            enemyY = enemyY + 6;
        }
    }
    
}

function updateCircle(){
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    //oberer rand
    if(ballY - ballRadiant < 0) {
        ballSpeedY = -ballSpeedY;
    //unterer rand
    } else if(ballY + ballRadiant > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if(ballX - ballRadiant < 0) {
        ballSpeedX = -ballSpeedX;
    } else if(ballX + ballRadiant > canvas.width) {
        ballSpeedX = -ballSpeedX;
    }

    
    ctx.fillStyle="white";
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadiant, 0, Math.PI*2);
    ctx.fill();
}

function keyPushed(e) {
    switch (e.keyCode) {
        //arrow-up
        case 38:
            if((playerY - movingSpeed ) >= 0 ){
                playerY = playerY - movingSpeed;
            }
            break;
        //arrow-down
        case 40:
            if((playerY + movingSpeed ) <= (canvas.height - blockHeight) ){
                playerY = playerY + movingSpeed;
            }
            break;
        default:
            break;
    }
}