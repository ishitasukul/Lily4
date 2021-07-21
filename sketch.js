var bkgImg, lily, butterfly,invisground,edges;
var score=0;
var gamestate= "PLAY";
var jumpSound, yaySound, scoreSound, walkSound;

function preload(){
  bkgImg= loadImage("images/skybkg.png");
  lilyFImg= loadImage("images/front.png");
  lily_right= loadAnimation("images/rightfrightleg.png","images/rightfleftleg.png");
  lily_left= loadAnimation("images/leftfrightleg.png", "images/leftfleftleg.png");
  lily_jump= loadImage("images/jump.png");

  butterfly1= loadImage("images/bluebutterfly.png");
  butterfly2= loadImage("images/pinkbutterfly.png");
  butterfly3= loadImage("images/purplebutterfly.png");
  butterfly4= loadImage("images/greenbutterfly.png");
  butterfly5= loadImage("images/orangebutterfly.png");

  jumpSound= loadSound("jump.mp3");
  yaySound= loadSound("yay.mp3");
  scoreSound= loadSound("score.mp3");
  walkSound= loadSound("walk.mp3");

}



function setup() {
  createCanvas(1000,500);
  lily= createSprite(500, 400, 50, 80);
  lily.addImage("front", lilyFImg);
  lily.addAnimation("right", lily_right);
  lily.addAnimation("left", lily_left);
  lily.addImage("jump", lily_jump);
  lily.scale=0.5;

  invisground= createSprite(500,510,1000,10);
  invisground.visibile=false;

  edges = createEdgeSprites();


  butterflyGroup= new Group ();

  
}

function draw() {
  background(bkgImg);

  if (gamestate==="PLAY"){

  if (keyDown(LEFT_ARROW)){
    lily.changeAnimation("left", lily_left);
    lily.x= lily.x-7;
    

  } else {
    lily.changeImage("front", lilyFImg);
  }
  
  if (keyDown(RIGHT_ARROW)){
    lily.changeAnimation("right", lily_right);
    lily.x= lily.x+7;
    

  } else {
    lily.changeImage("front", lilyFImg);
  }

  if (keyDown("space")&& lily.y>350){
    lily.changeImage("jump", lily_jump);
    lily.velocityY= lily.velocityY-5;
    jumpSound.play();

  } else {
    lily.changeImage("front", lilyFImg);
  }
  
  lily.velocityY=lily.velocityY+0.8;
  lily.collide(invisground);
  

  spawnButterflies();

  


  if (butterflyGroup.isTouching(lily)){
    score= score+1;
    scoreSound.play();
    textSize(20);
    stroke("black");
    strokeWeight(2);
    fill("white");
    text("+16", 790, 40)
  }

  textSize(20);
  stroke("black");
  strokeWeight(2);
  fill("white");
  text("Score:"+ score, 870, 40 );

}

drawSprites();

if (score===700){
  gamestate="END";
}

if (gamestate==="END"){
 
  butterflyGroup.destroyEach();
  lily.x= 500;
  lily.y=400;
  score=700;
  yaySound.play();

  textSize(35);
  stroke("black");
  strokeWeight(2);
  fill("white");
  text("Mission Successfully Completed!", 250,220);


  textSize(20);
  stroke("black");
  strokeWeight(2);
  fill("white");
  text("Score:"+ score, 870, 40 );

}
}

function spawnButterflies(){
  if (frameCount%50===0){
    butterfly= createSprite(random(426,850), 0, 30,30);
    butterfly.scale= 0.1;

    
    var rand =Math.round (random(1,5));
    
    switch(rand) {
      case 1: butterfly.addImage(butterfly1);
              break;
      case 2: butterfly.addImage(butterfly2);
              break;
      case 3: butterfly.addImage(butterfly3);
              break;
      case 4: butterfly.addImage(butterfly4);
              break;
      case 5: butterfly.addImage(butterfly5);
              break;
      default: break;
    }
    

    butterfly.y= Math.round(random(50,250));
    butterfly.lifetime=120;
   
   position=Math.round(random(1,2));
    
    if (position===1){
    butterfly.x=900;
    butterfly.velocityX=-8;    
  } else if (position===2){
      butterfly.x=10
      butterfly.velocityX=8;
    }   
    
    
    
    butterflyGroup.add(butterfly);
    butterfly.depth= lily.depth;
    butterfly.depth=butterfly.depth+1;
  }
}