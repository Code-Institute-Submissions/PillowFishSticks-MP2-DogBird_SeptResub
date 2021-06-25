// accordian open and close on touch

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

// canvas variables

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// Load images

var dog = new Image();
var bg = new Image();
var fg = new Image();
var rocketNorth = new Image();
var rocketSouth = new Image();
var bone = new Image ();

dog.src = "../images/dogrocket.png";
bg.src = "../images/sbg.png";
fg.src = "../images/fg.png";
rocketNorth.src = "../images/rocketNorth.png";
rocketSouth.src = "../images/rocketSouth.png";
bone.src = "../images/bone.png";

// static image onload

window.onload = function(){
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(rocketNorth, 200,-100);
    ctx.drawImage(rocketSouth, 200,300);
    ctx.drawImage(fg, 0, 400);
    ctx.drawImage(dog, 10, 150);
};

// start game function

function init(){

// score

var score = 0;

// gap variables

var gap = 160;
var constant = rocketNorth.height+gap;

// dog variables

var dX = 10;
var dY = 150;

// gravity variable

var gravity = 1;

// audio file

var fly = new Audio();
var gapscore = new Audio();
var death = new Audio();

fly.src ="../audio/bark.mp3";
gapscore.src ="../audio/gapscore.mp3";
death.src ="../audio/death.mp3";


// onkey down
document.addEventListener("click", moveUp);

function moveUp (){
    dY -= 25;
    fly.play();
}

// rocket placement

var rocketpos = [];

rocketpos[0] = {
    x : cvs.width,
    y : 0,
};

var randomNumber = Math.floor((Math.random() * 300) + 1);


// draw images

function draw(){

    ctx.drawImage(bg,0,0);

    for(var i = 0; i < rocketpos.length; i++){
        ctx.drawImage(rocketNorth,rocketpos[i].x,rocketpos[i].y);
        ctx.drawImage(rocketSouth,rocketpos[i].x,rocketpos[i].y+constant);
        ctx.drawImage(bone,rocketpos[i].x - randomNumber,rocketpos[i].y + randomNumber);

        rocketpos[i].x--;

        if(rocketpos[i].x==125){
            rocketpos.push({
                x : cvs.width,
                y : Math.floor(Math.random()*rocketNorth.height)-
                rocketNorth.height
            });
        }

        // collision

        if (dX + dog.width >= rocketpos[i].x && dX <= rocketpos[i].x + rocketNorth.width 
        && (dY <= rocketpos[i].y + rocketNorth.height || dY+dog.height >=
        rocketpos[i].y+constant) || dY + dog.height >= cvs.height - fg.height){
        {
        death.play();
        }
        {
        ctx.drawImage(bg,0,0);
        ctx.font = "20px serif";
        ctx.strokeText("Game over, your score is "+score, 30, 100);
        {
        var newScore = document.createElement("P");
        var newText = document.createTextNode("Score to beat is "+score);
        newScore.appendChild(newText);
        document.getElementById("scorelist").appendChild(newScore);
        }
        location.return();
        }
        }

        if (dX + dog.width >= rocketpos[i].x - randomNumber && dX <= rocketpos[i].x- randomNumber + bone.width 
        && (dY <= rocketpos[i].y + randomNumber + bone.height)
        ) 
        {
        score+=1;    
        }
        
        
        // score 

        if(rocketpos[i].x == 5){
            score++;
            gapscore.play();
        }
        
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(dog,dX,dY);

    dY += gravity;

    ctx.fillSyle = "black";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10, 50);
    
    requestAnimationFrame(draw);
}

draw();
}