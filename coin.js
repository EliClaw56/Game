class Coin{
  constructor(){
    this.r = 50;
    this.x = random(w);
    this.y = 0 - this.r;
    this.speed = 2;
  }
  display(){
    // image(coinImage, this.x, this.y, this.r*2, this.r*2);
    image(coinImage, this.x, this.y, this.r*2, this.r*2);
  }
  move(){
    this.y += this.speed;
  }
}
