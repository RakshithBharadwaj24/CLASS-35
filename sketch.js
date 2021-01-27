var ball;
var database,pos;

function setup(){
   
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var ballpos = database.ref('ball/position');
    ballpos.on("value",readPosition,showError);
    
}

function draw(){
    background("white");
    if(pos !== undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x' : ball.x + x,
        'y' : ball.y + y
    });    
}


function readPosition(data){
    pos = data.val();
    ball.x = pos.x;
    ball.y = pos.y;
}

function showError(){
    console.log("Error");
}
