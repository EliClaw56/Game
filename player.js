
class Player {
  constructor() {
    this.r = 60;
    this.x = w / 2;
    this.y = h - this.r;
    this.direction = 'still';
    this.speed = 4;
  }
  display() {
    image(playerImageC, this.x-70, this.y-50, this.r*3.5, this.r*3.5);
    // image(playerAnimation[frameCount % playerAnimation.length], this.x-70, this.y-50, this.r*2.5, this.r*2.5);
  }
  move() {
    switch (this.direction) {
      case 'still':
        break;
      case 'up':
      if (this.y - this.r/100 > 0){
        this.y -=this.speed;
      }
        break;
      case 'down':
      if (this.y < h - this.r /1.3){
        this.y +=this.speed;
      }
        break;
      case 'right':
      if (this.x < w - this.r/1.5){
        this.x +=this.speed;
      }
        break;
      case 'left':
      if (this.x - this.r/2 > 0){
        this.x -=this.speed;
      }
        break;
      default:
        break;
    }
  }
}
