import Bullet from "./Bullets.js";
export default class BulletController{
    bullets = [];
    timeTillNextBulletAllowed = 1;
    
    
constructor(canvas, maxBulletAtATime, bulletColor, soundEnabled){
    this.canvas = canvas;
    this.maxBulletAtATime = maxBulletAtATime;
    this.maxBulletAtATimeDefault = maxBulletAtATime;
    this.bulletColor =bulletColor;
    this.soundEnabled = soundEnabled;
   
    this.ammo = this.ammoDefault;
    this.ammoDefault = 0 ;
    this.powerUped()
    this.shootSound = new Audio("sounds/shoot.wav");
    this.shootSound.volume = 0.5;
    this.powerUp = 0;
    

}


draw(ctx){
    this.bullets = this.bullets.filter((bullet)=> bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height);

    
  
    this.bullets.forEach((bullet) => bullet.draw(ctx))
    if(this.timeTillNextBulletAllowed >  0){
        this.timeTillNextBulletAllowed--;
    }
};

powerUped(){
        document.addEventListener('keydown', (event) => {
            if (event.code === 'KeyP') {
                if(this.powerUp >= 200){
                this.ammo = 50;
                this.timeTillNextBulletAllowed = 0.5;
                this.maxBulletAtATime = this.ammo;

                setTimeout(() => {
                    this.maxBulletAtATime = this.maxBulletAtATimeDefault;
                    this.timeTillNextBulletAllowed = 1;
                    }, 3000);
                    this.powerUp = 0;
                }
            }     
            
        })
    
    
    
}

collideWith(sprite){
    const bulletThatHitSpriteIndex = this.bullets.findIndex((bullet) => bullet.collideWith(sprite))
    if(bulletThatHitSpriteIndex >= 0){
        this.bullets.splice(bulletThatHitSpriteIndex,1);
        this.powerUp += 10;
        return true;
        
    }
    return false;

}



shoot(x,y, velocity, timeTillNextBulletAllowed = 0){
    if(this.timeTillNextBulletAllowed <= 0 && 
        this.bullets.length < this.maxBulletAtATime ) {
        const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor );
        this.bullets.push(bullet);
        if(this.soundEnabled){
            this.shootSound.currentTime = 0;
            this.shootSound.play();
        }
        this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
        
    } 

}
};