var backGround, thief, police, invisibleGround, preciousItem, obstacle;
var background_image, thief_image, police_image, goldcoin_image, silvercoin_image, diamond_image, brickWall_image, net_image, puddle_image;
var nightsound, scoreincreasesound, gameoversound;  
var obstacleGroup, preciousItemsGroup;
var Start;
var Play;
var End;
var score;
var gameState;

function preload(){

  // Images
  background_image = loadImage ("background.gif");
  thief_image = loadImage ("thief.png");
  police_image = loadImage("police.png");
  goldcoin_image = loadImage("gold coin.png");
  silvercoin_image = loadImage ("silver coin.png");
  diamond_image = loadImage ("diamond.png");
  brickWall_image = loadImage("brick wall.png");
  net_image = loadImage("net.png");
  puddle_image = loadImage("puddle.png");
  
  // Sounds
  nightsound = loadSound("night sound.mp3");
  scoreincreasesound = loadSound("score increase.mp3");
  gameoversound = loadSound("gameover.mp3");
  gameState = "Play";
}

function setup() {

  createCanvas (displayWidth, displayHeight);
  
  backGround = createSprite(displayWidth/2, 0, displayWidth, displayHeight);
  backGround.addImage("background-image", background_image);
  //backGround.scale = 0.75;

  thief = createSprite (200, displayHeight-350);
  thief.addImage("thief-image", thief_image);
  thief.scale = 0.1;
  
  police = createSprite (100, displayHeight-350);
  police.addImage("police-image", police_image);
  police.scale = 0.155;
  
  invisibleGround = createSprite(250, displayHeight-300, displayWidth, 10);
  //invisibleGround.visible = false;
  
  obstacleGroup = new Group();
  preciousItemsGroup = new Group();
  
  score = 0;
  police.debug = true;
  police.setCollider("rectangle", 65, 15, 150, 100)

  camera.position.x = displayWidth/2;
}

function draw() {
  //console.log (score);
  
  if (gameState === "Play") {
  
    backGround.velocityX = -(7+ (score/4));
    
    if(frameCount% 60 ===0){
    police.velocityX = 0.13;
    }
    else{
    police.velocityX = 0.06;
    }
    
    //police.velocityX = 0.01;
    //nightsound.loop();

    if (backGround.x<10) {
          backGround.x = 440;
      }

    if (touches.length > 0 || keyDown("space") && thief.y > 190) {
        thief.velocityY = -10;
        touches = [];
    }

    if (keyDown("right") && thief.x < 400) {
        thief.x = thief.x + 5;
    }

    if (keyDown("left") && thief.x > 100) {
        thief.x = thief.x - 5;
    }
    
    if (thief.isTouching(preciousItemsGroup)) {
        score = score + 5;
        scoreincreasesound.play();
        preciousItemsGroup.destroyEach();
    }

    thief.velocityY = thief.velocityY + 0.8;
    police.velocityY = police.velocityY + 0.5;

    if (thief.isTouching(obstacleGroup) || police.isTouching(thief)){
        gameState = "End";
        //gameoversound.play();
        //stroke ("yellow");
        fill ("yellow");
        textSize (40);
        text ("Thief Is Caught!", displayHeight/2, displayWidth/2);
        thief.velocity = 0;
        backGround.velocity = 0;
        police.velocity = 0;
    }
    
    if (police.isTouching(obstacleGroup)) {
        police.velocityY = -10;
    }
    
    //spawnPreciousItems();
    //spawnObstacles();
  }
  
  thief.collide(invisibleGround);
  police.collide(invisibleGround);
  
  drawSprites();
  fill ("yellow");
  textSize (20);
  text ("Score :" + score, displayWidth-100, 30);
}

function spawnPreciousItems(){
  if (World.frameCount%150===0){
    preciousItem = createSprite (Math.round(random(430,480)), Math.round(random(160,200)));
    preciousItem.scale = 0.05;
    //preciousItem.debug = true;
    r = Math.round(random(1,4));
    if (r === 1) {
      preciousItem.addImage(goldcoin_image);
    } else if (r === 2) {
      preciousItem.addImage (silvercoin_image);
    } else {
      preciousItem.addImage (diamond_image);
    }

    preciousItem.velocityX = -(7+ (score/4));
    preciousItem.setLifetime = 100;
    preciousItemsGroup.add(preciousItem);
  }
    
  }

function spawnObstacles(){
  if (World.frameCount%250===0){
    obstacle = createSprite (Math.round(random(430,480)), 400);
    obstacle.scale = 0.15;
    //obstacle.debug = true;
    r = Math.round(random(1,3));
    if (r === 1) {
      obstacle.addImage(brickWall_image);
    } else if (r === 2) {
      obstacle.addImage (net_image);
    } else {
      obstacle.addImage (puddle_image);
    } 

    obstacle.velocityX = -(7+ (score/4));
    obstacle.setLifetime = 0.5;
    obstacleGroup.add(obstacle);
  }
}