var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2
    
var oppPink1Img, oppRed1Img, oppYellow1Img, oppPink2Img, oppRed2Img, oppYellow2Img;

var player1, player2, player3

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

var cycleBell, pinkCG, yellowCG, redCG

var gameOverImage

var obstacle1Img, obstacle2Img, obstacle3Img, obstacleGroup

var obs1, obs2, obs3

var gameOver, restart

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  
  oppPink2Img = loadAnimation("images/opponent3.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png")
  oppRed2Img = ("images/opponent9.png")
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png")
  oppYellow2Img = loadAnimation("images/opponent6.png")


cycleBell = loadSound("sound/bell.mp3");

gameOverImage = loadImage("images/gameOver.png");

obstacle1Img = loadImage("images/obstacle1.png");
obstacle2Img = loadImage("images/obstacle2.png");
obstacle3Img = loadImage("images/obstacle3.png");
}
function setup(){
  
createCanvas(displayWidth, displayHeight/3);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
//path.velocityX = -5
camera.position.x = displayWidth



//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;

  gameOver = createSprite(650, 150);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;
  gameOver.scale = 0.8
  
  pinkCG = new Group();
  redCG = new Group();
  yellowCG = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
    distance = distance + Math.round(getFrameRate()/50);
    
    path.velocityX = -(6 + 2*distance/150);
    
    mainCyclist.y = World.mouseY;
    
    edges = createEdgeSprites();
    mainCyclist.collide(edges);
    
    if(path.x < 0 ){
      camera.position.x -= 1
   }
    
    if(keyDown("space")) {
      cycleBell.play();
    }
    
  var select_oppPlayer = Math.round(random(1,3));
    
  if (World.frameCount % 150 == 0) {
    if(select_oppPlayer == 1) {
      pinkCyclists();
    } else if(select_oppPlayer == 2) {
      yellowCyclists();
    }else {
      redCyclists();
    }
  }
  var select_obstacle = Math.round(random(1,3));
    
    if(World.frameCount % 100 == 0) {
      if(select_obstacle == 1) {
        obstacle1();
      }else if(select_obstacle == 2) {
        obstacle2();
      }else {
        obstacle3();
      }
    }
    
    
    if(pinkCG.isTouching(mainCyclist)) {
      gameState = END;
      player1.velocityY = 0;
      player1.addAnimation("opponentPlayer1", oppPinkImg2)
    }
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
    if(mainCyclist.isTouching(obstacleGroup)) {
      gameState = END;
      obstacleGroup.velocityYEach = 0
      obstacleGroup.destroyEach();
      pinkCG.destroyEach();
      yellowCG.destroyEach();
      redCG.destroyEach();
    }
  } else if(gameState === END) {
    gameOver.visible = true
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW")) {
      reset();
    }
}
}

function pinkCyclists() {
  player1 = createSprite(1100, Math.round(random(50,250)));
  player1.scale = 0.06
  player1.velocityX  = -(6 + 2*distance/150)
  player1.addAnimation("opponentPlayer1", oppPink1Img)
  player1.setLifetime = 170;
  pinkCG.add(player1);
}

function redCyclists() {
  player3 = createSprite(1100, Math.round(random(50,250)), 10,10);
  player3.scale = 0.06
  player3.velocityX  = -(6 + 2*distance/150)
  player3.addAnimation("opponentPlayer2", oppRed1Img)
  player3.setLifetime = 170;
  redCG.add(player3);
}

function yellowCyclists() {
  player2 = createSprite(1100, Math.round(random(50,250)), 10,10);
  player2.scale = 0.06
  player2.velocityX  = -(6 + 2*distance/150)
  player2.addAnimation("opponentPlayer3", oppYellow1Img)
  player2.setLifetime = 170;
  yellowCG.add(player2);
}

function reset() {
  gameState = PLAY
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning", mainRacerImg1)
  
  pinkCG.destroyEach();
  redCG.destroyEach();
  yellowCG.destroyEach();
  
  distance = 0;
}

function obstacle1() {
  obs1 = createSprite(1100, Math.round(random(50,250)), 100,100)
  obs1.addImage(obstacle1Img);
  obs1.scale = 0.1
  obs1.velocityX = -(6+2*distance/150);
  obs1.setLifetime = 170;
  obstacleGroup.add(obs1);
}

function obstacle2() {
  obs2 = createSprite(1100, Math.round(random(50,250)), 100, 100)
  obs2.addImage(obstacle2Img);
  obs2.scale = 0.1
  obs2.velocityX = -(6+2*distance/150);
  obs2.setLifetime = 170;
  obstacleGroup.add(obs2);
}

function obstacle3() {
  obs3 = createSprite(1100, Math.round(random(50,250)), 100, 100)
  obs3.addImage(obstacle3Img);
  obs3.scale = 0.1
  obs3.velocityX = -(6+2*distance/150);
  obs3.setLifetime = 170;
  obstacleGroup.add(obs3);
}