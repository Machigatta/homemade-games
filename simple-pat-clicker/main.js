window.onload=function() {
    canvas=document.getElementById("clickerGC");

    ctx=canvas.getContext("2d");
    canvas.onclick = keyPushed;
    setInterval(gameLoop,1000/30);

    //Default Value to Scroller
    document.getElementById("cordY").value = alice.yPos;
    document.getElementById("cordX").value = alice.xPos;
    document.getElementById("size").value = alice.width;
    document.getElementById("handCordY").value = hand.yPos;
    document.getElementById("handCordX").value = hand.xPos;
    document.getElementById("handSize").value = hand.width;

    //Bind Config-Scroller Event
    document.getElementById("cordY").oninput = function () { alice.yPos = parseInt(this.value); }
    document.getElementById("cordX").oninput = function () { alice.xPos = parseInt(this.value); }
    document.getElementById("size").oninput = function () { alice.width = parseInt(this.value); alice.height = (parseInt(this.value) / 100) * alice.aspectRatio; }

    document.getElementById("handCordY").oninput = function () { hand.yPos = parseInt(this.value); }
    document.getElementById("handCordX").oninput = function () { hand.xPos = parseInt(this.value); }
    document.getElementById("handSize").oninput = function () { hand.width = parseInt(this.value); hand.height = (parseInt(this.value) / 100) * hand.aspectRatio; }
}

var game = {
    moods: ["Default","Happy"]
}
//asset from https://aucrowne.itch.io/project-alice
var alice = {
    xPos: 855,
    yPos: 24,
    width: 531,
    height: 1024.5113999999999,
    defaultWidth: 2468,
    defaultHeight: 4762,
    aspectRatio: 192.94,
    mood: (game.moods.length > 0) ? game.moods[0] : ""
}
var hand = {
    isPatting: false,
    patCounter: 0,
    xPos: 869,
    yPos: 22,
    originXPos: 869,
    originYPos: 22,
    aspectRatio: 38.501,
    width: 370,
    height: 142.4537,
    directionDown: true,
    image: new Image()
}
hand.image.src = "assets/hand.png";
game.moods.forEach(initMood => {
    alice[initMood] = new Image();
    alice[initMood].src = "assets/PAlice"+initMood+".png";
});

function gameLoop() {
    //draw background
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.drawImage(alice[alice.mood], alice.xPos, alice.yPos, alice.width, alice.height);
    if (hand.isPatting) {
        alice.mood = "Happy";
        ctx.drawImage(hand.image, hand.xPos, hand.yPos, hand.width, hand.height);
        if (hand.yPos < hand.originYPos + 20 && hand.patCounter % 2 == 0){
            hand.yPos += 2;
        } else if (hand.yPos == hand.originYPos + 20 && hand.patCounter % 2 == 0){
            hand.patCounter++;
        } else if (hand.yPos > hand.originYPos && hand.patCounter % 2 == 1){
            hand.yPos -= 2;
        }else if(hand.yPos == hand.originYPos && hand.patCounter % 2 == 1){
            hand.patCounter++;
        }

        if(hand.patCounter == 4){
            hand.yPos = hand.originYPos;
            hand.patCounter = 0;
            hand.isPatting = false;
            alice.mood = "Default";
            hand.directionDown = true;
        }
    }
}

function keyPushed(e) {
    // e.x: 1210
    // e.y: 310
    if(!hand.isPatting){
        hand.isPatting = true;
    }    
}