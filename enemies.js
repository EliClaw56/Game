class Enemy{
  constructor(){
    this.r = 50;
    this.x = random(w);
    this.y = 0 - this.r;
    this.speed= 3;
  }
  display(){
    image(enemyImage, this.x, this.y, this.r*2, this.r*2);
  }
  move(){
    this.y += this.speed;
  }
}
