'use strict';

let state = 'title';
let cnv;
let points = 0;
let lives = 3;
let w = 1160;
let h = 550;
let player;
let coins = [];
let enemies = [];
let playerImageC;
let coinImage;
let coinImage2;
let enemyImage;
let coin = [];
let i;
let bite;
let tpir;
let bonk;
let jungle;

// Sprite Sheets and animations
// let playerSS;
// let playerJSON;
// let playerAnimation = [];

function preload(){
  soundFormats("mp3");
  // bonk = loadSound("https://rmfleath.sirv.com/Cartoon%20Klonk%20Sound%20Effect.mp3");
  // bite = loadSound("https://rmfleath.sirv.com/Cartoon%20Bite%20sound%20effect.mp3");
  // jungle = loadSound("https://rmfleath.sirv.com/jungle.mp3");
  tpir = loadSound("TPIR.mp3");
  jungle = loadSound("jungle.mp3");
  bonk = loadSound("Cartoon Klonk Sound Effect.mp3");
  bite = loadSound("Cartoon Bite sound effect.mp3");


  // for (let i = 0; i <=6; i++){
    // coinImage[i] = loadImage(`https://rmfleath.sirv.com/food/food_${i}.png`);
  // }

  playerImageC = loadImage('https://rmfleath.sirv.com/Monkey.png');
  coinImage = loadImage(`https://rmfleath.sirv.com/food/food_1.png`);
  enemyImage = loadImage(`https://rmfleath.sirv.com/trash_0.png`);

  // playerSS = loadImage('https://rmfleath.sirv.com/spritesheet.png');
  // playerJSON = loadJSON('https://rmfleath.sirv.com/spritesheet.json');
}

function setup() {
  cnv = createCanvas(w, h);
  textFont('monospace');
  // imageMode(CENTER);
  rectMode(CENTER);
  jungle.loop();

  // let playerFrames = playerJSON.frames;
  //
  // for (let i = 0; i < playerFrames.length; i++){
  //   let pos = playerFrames[i].frames;
  //   let img = playerSS.get(pos.x, pos.y, pos.w, pos.h);
  //   playerAnimation.push(img);
  // }
  player = new Player();
  coins.push(new Coin());
  enemies.push(new Enemy());

}

function draw() {

  switch (state){
    case 'title':
    title();
    title();
    cnv.mouseClicked(titleMouseClicked);
    break;
    case 'level 1':
    level1();
    break;
    case 'You Win':
    youWin();
    cnv.mouseClicked(youWinMouseClicked);
    break;
    case 'Game Over':
    gameOver();
    cnv.mouseClicked(gameOverMouseClicked);
    break;
  default:
    break;
  }
}

function keyPressed(){
  if (keyCode == LEFT_ARROW){
    player.direction = 'left'
  } else if (keyCode == RIGHT_ARROW){
    player.direction = 'right'
  } else if (keyCode == UP_ARROW){
    player.direction = 'up'
  } else if (keyCode == DOWN_ARROW){
    player.direction = 'down'
  } else if (key = ' '){
    player.direction = 'still'
  }
}

function keyReleased(){
  let numberKeysPressed = 0;

  if (keyIsDown(LEFT_ARROW)){
    numberKeysPressed++;
  }
  if (keyIsDown(RIGHT_ARROW)){
    numberKeysPressed++;
  }
  if (keyIsDown(DOWN_ARROW)){
    numberKeysPressed++;
  }
  if (keyIsDown(UP_ARROW)){
    numberKeysPressed++;
  }
  if (numberKeysPressed == 0){
    player.direction = 'still';
  }
}

function title() {
  background(119, 189, 142);
  textSize(50);
  fill(255);
  textAlign(CENTER, CENTER);
  text('Welcome', w / 2, h / 3);
  text('Click anywhere to start', w / 2, h / 2);
}

function titleMouseClicked() {
  state = 'level 1'
}

function level1() {
  background(76, 89, 110);


  if (random(1) <= 0.008){
    coins.push(new Coin());
  }
  if (random(1) <= 0.05){
    enemies.push(new Enemy());
  }

  player.display();
  player.move();

  for (let i = 0; i < coins.length; i++){
    coins[i].display();
    coins[i].move();
  }
  for (let i = 0; i < enemies.length; i++){
    enemies[i].display();
    enemies[i].move();
  }
  for (let i = enemies.length - 1; i >= 0; i--){
    if (dist(player.x, player.y, enemies[i].x, enemies[i].y) <= (player.r + enemies[i].r)/2){
      points--;
      enemies.splice(i, 1);
      bonk.play();
  } else if (enemies[i].y > h){
    enemies.splice(i, 1);
  }
  }
  for (let i = coins.length - 1; i >= 0; i--){
    if (dist(player.x, player.y, coins[i].x, coins[i].y) <= (player.r + coins[i].r)/2){
      points++;
      coins.splice(i, 1);
      bite.play();
  } else if (coins[i].y > h){
    coins.splice(i, 1);
  }
}
  text(`Points: ${points}`, w / 2, h / 2);

  // text(`Lives left: ${lives}`, w / 2, h / 3);

  if (points >= 5){
    state = 'You Win';
  } else if (points <= -1){
    state = 'Game Over';
    // tpir.play();
  }
}

function youWin(){
  background(255,255,255);
  fill(0);
  textSize(50);
  textAlign(CENTER, CENTER);
  text('YOU WIN', w / 2, h / 3);
  text('Click anywhere to restart', w / 2, h / 2);
}

function youWinMouseClicked(){
  state = 'title';
  points = 0;
}

function gameOver(){
  background(255,50,80);
  textSize(50);
  textAlign(CENTER, CENTER);

  if (lives >= 0){
    lives--;
    text(`Lives left: ${lives}`, w / 2, h / 3);
    text('Click anywhere to play again', w / 2, h / 2);
  } else {
    text('GAME OVER', w / 2, h / 3);
    text('Click anywhere to restart', w / 2, h / 2);

  }
}
function gameOverMouseClicked(){
  if (lives >= 0){
  lives--;
  state = 'level 1';
} else {
  state = 'title';
}
  points = 0;
}
