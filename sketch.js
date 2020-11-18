var monkey , monkey_running
var banana ,bananaImage
var ground
var obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survival_time = 0;
var score = 0;
var count = 0;
var gameState = "play";

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("Banana_single.png")
  bananaImageBunch = loadImage("Banana 2.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage = loadImage("Jungle.jpg");

}

function setup() {
  createCanvas(450,450);
  
  monkey = createSprite(200,365,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(225,420,1000,10);
  ground.velocityX = -3;
  ground.shapeColor = ("brown");
  ground.visible = false;
  
  bananaGroup = createGroup();
  bananaGroup2 = createGroup();
  obstaclesGroup = createGroup();
  
  Background = createSprite(225,225,450,450);
  Background.addImage(backgroundImage);
  Background.velocityX = -3;
  Background.scale = 0.65;
  
}

function draw() {
  
  background("black");
  
  if(gameState === "play"){
   
      if(ground.x<0){
    ground.x = ground.width/2;
  }
      if(keyDown("space")&&monkey.y>140){
    monkey.velocityY = -15;
  }
     if (Background.x < 0){
   Background.x = Background.width/4;
  }
    
    if(monkey.isTouching(bananaGroup)){
   bananaGroup.destroyEach();
   score = score + 1;
 }
  
   if(monkey.isTouching(bananaGroup2)){
  bananaGroup2.destroyEach();
  score = score + 2;
 }

  if(monkey.isTouching(obstaclesGroup)){
 monkey.scale = 0.09;
 count = count + 1;
  obstaclesGroup.destroyEach();
 }
  
  switch(score){
    case 10: monkey.scale = 0.12;
      break;
    case 20: monkey.scale = 0.14;
      break;
    case 30: monkey.scale = 0.16;
      break;
    case 40: monkey.scale = 0.18;
      break;
      default: break;
  }
   Food();
   Obstacles();
survival_time = survival_time+Math.round(getFrameRate()/62);
   monkey.velocityY = monkey.velocityY + 1;
    
   if(count >= 2){
   gameState = "end";
  }
}

  monkey.collide(ground);

 if(gameState === "end"){
   monkey.visible = false
   Background.visible = false
   bananaGroup2.setLifetimeEach(0);
   bananaGroup.setLifetimeEach(0);
   obstaclesGroup.setLifetimeEach(0);
   fill("yellow");
   stroke("yellow");
   textSize(40);
   text("GAME OVER",100,225);
   textSize(25);
   fill("orange");
   stroke("orange");
   text("Press R To Restart The Game",57,325);
    if(keyDown("R")){
      reset();
    }
 }

  drawSprites();
 
  fill("red");
  stroke("red");
  textSize(22);
  text("SURVIVAL TIME :- " + survival_time,200,35);
  
  text("SCORE - "+ score,200,65);
}

function Food(){
  if(frameCount % 80 === 0){
    var banana = createSprite(450,220,20,20);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.velocityX = -5;
    banana.scale = 0.1;
    banana.lifetime = 90;
    bananaGroup.add(banana);
    monkey.depth = banana.depth + 1;
  }
  if(frameCount % 150 === 0){
    var banana2 = createSprite(450,220,20,20);
    banana2.y = Math.round(random(120,200));
    banana2.addImage(bananaImageBunch);
    banana2.velocityX = -5;
    banana2.scale = 0.1;
    banana2.lifetime = 90;
    bananaGroup2.add(banana2);
    monkey.depth = banana2.depth+1
  }
    
}

function Obstacles(){
  if(frameCount % 200 === 0){
    var obstacle = createSprite(450,378,30,30);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    obstacle.scale = 0.16;
    obstacle.lifetime = 76;
    obstaclesGroup.add(obstacle);
    monkey.depth = obstacle.depth + 1;
  }
}

function reset(){
  gameState = "play";
  monkey.visible = true
  Background.visible = true
  score = 0;
  count = 0;
  survival_time = 0;
}