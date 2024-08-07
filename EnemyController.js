import Enemy from "./enemy.js";
import MovingDirection from "./MovingDirection.js";

export default class EnemyController{
    
    enemyMap = [
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        // [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        // [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      ];

      enemyRows = [];

      currentDirection = MovingDirection.right;
      xVelocity = 0;
      yVelocity = 0;
      defaultXVelocity = 0.8;
      defaultYVelocity = 0.8;
      moveDownTimerDefault = 50;
      moveDownTimer = this.moveDownTimerDefault;
      fireBulletTimerDefault = 60;
      fireBulletTimer = this.fireBulletTimerDefault


    constructor(canvas, enemyBulletController, playerBulletController){
        this.canvas = canvas;
        this.enemyBulletController = enemyBulletController;
        this.playerBulletController = playerBulletController;
        this.enemyDeathSound = new Audio("sounds/enemy-death.wav");
        this.enemyDeathSound.volume = 0.1;
        this.createEnemies();
        this.score = 0;
        this.currentLevel = 1;
        
        
    }
    draw(ctx){
        this.decrementMoveTimer();
        this.updateVelocityAndDirection();
        this.collisionDetection();
        this.drawEnemies(ctx);
        this.resetMoveDowmTimer();
        this.fireBullet()
       

    }
    levelMap(){
        if(this.currentLevel === 1){
       this.enemyMap = [
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
            [0, 2, 2, 3, 3, 3, 3, 2, 2, 0],
            // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            // [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
          ];
          this.fireBulletTimerDefault = 55;
          this.defaultXVelocity = 0.9;
          
        }
        if(this.currentLevel === 2){
            this.enemyMap = [
            [3, 1, 1, 1, 1, 1, 1, 1, 1, 3],
            [2, 1, 0, 1, 1, 1, 1, 1, 0, 2],
            [1, 2, 0, 3, 3, 3, 3, 2, 0, 1],
            [0, 2, 1, 0, 3, 0, 3, 0, 2, 0],
            [1, 1, 1, 1, 0, 3, 0, 1, 1, 1],
            // [2, 3, 2, 2, 2, 2, 2, 2, 3, 2],
          ];
          this.fireBulletTimerDefault = 55;
          this.defaultXVelocity = 1;
        }
        if(this.currentLevel === 3){
            this.enemyMap = [
            [3, 0, 1, 1, 3, 3, 1, 1, 0, 3],
            [2, 1, 1, 1, 3, 3, 1, 1, 1, 2],
            [1, 2, 1, 3, 0, 0, 3, 1, 2, 1],
            [1, 2, 1, 3, 0, 0, 3, 1, 2, 1],
            [1, 1, 1, 1, 3, 3, 1, 1, 1, 1],
            [2, 0, 2, 2, 3, 3, 2, 2, 0, 2],
          ];
          this.fireBulletTimerDefault = 45;
          this.defaultXVelocity = 0.8;
        }
        if(this.currentLevel === 4){
            this.enemyMap = [
            [3, 1, 1, 1, 3, 3, 1, 1, 1, 3],
            [2, 1, 1, 1, 3, 3, 1, 1, 1, 2],
            [1, 2, 1, 3, 2, 2, 3, 1, 2, 1],
            [1, 2, 1, 3, 1, 1, 3, 1, 2, 1],
            [1, 1, 1, 1, 3, 3, 1, 1, 1, 1],
            [2, 3, 2, 2, 3, 3, 2, 2, 3, 2],
          ];
          this.fireBulletTimerDefault = 45;
          this.defaultXVelocity = 1;
        }
        if(this.currentLevel === 5){
            this.enemyMap = [
            [3, 0, 1, 1, 0, 0, 1, 1, 0, 3],
            [2, 0, 1, 1, 0, 0, 1, 1, 0, 2],
            [0, 2, 0, 0, 0, 0, 0, 0, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 1, 0, 0, 1, 0, 1, 1],
            [2, 0, 2, 0, 0, 0, 0, 0, 3, 2],
          ];
          this.fireBulletTimerDefault = 20;
          this.defaultXVelocity = 0.7;
        }
        if(this.currentLevel === 5){
            this.enemyMap = [
                [0, 0, 0, 1, 3, 3, 1, 0, 0, 0],
                [0, 0, 1, 1, 3, 3, 1, 1, 0, 0],
                [0, 2, 1, 3, 2, 2, 3, 1, 2, 0],
                [0, 0, 1, 3, 1, 1, 3, 1, 0, 0],
                [0, 0, 0, 1, 3, 3, 1, 0, 0, 0],
                [0, 0, 0, 0, 3, 3, 0, 0, 0, 0],
          ];
          this.fireBulletTimerDefault = 10;
          this.defaultXVelocity = 2;
        }
    }
    collisionDetection(){
        
        this.enemyRows.forEach((enemyRow) => {
            enemyRow.forEach((enemy, enemyIndex) => {
                if (this.playerBulletController.collideWith(enemy)){
                    enemyRow.splice(enemyIndex, 1);
                    this.enemyDeathSound.currentTime = 0;
                    this.enemyDeathSound.play(); 
                    this.score += 100;
                    
                    
                }     
            });
        })

        this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0)
    }

    fireBullet(){
        this.fireBulletTimer--;
        if(this.fireBulletTimer <=0){
            this.fireBulletTimer = this.fireBulletTimerDefault;
            const allEnemies = this.enemyRows.flat()
            const enemyIndex = Math.floor(Math.random() * allEnemies.length);
            const enemy = allEnemies[enemyIndex];
            this.enemyBulletController.shoot(enemy.x + enemy.width/2, enemy.y, -4)
            
        }
    }
    resetMoveDowmTimer(){
        if(this.moveDownTimer <= 0){
            this.moveDownTimer = this.moveDownTimerDefault
        }
    }

    decrementMoveTimer(){
        if(this.currentDirection === MovingDirection.downLeft || this.currentDirection === MovingDirection.downRight){

        }
        this.moveDownTimer--;
    }

    updateVelocityAndDirection(){
        for(const enemyRow of this.enemyRows){
            if(this.currentDirection == MovingDirection.right){
                this.xVelocity = this.defaultXVelocity;
                this.yVelocity = 0;
                const rightMostEnemy = enemyRow[enemyRow.length - 1];
                if(rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width){
                    this.currentDirection = MovingDirection.downLeft;
                    break;
                }
            }else if(this.currentDirection === MovingDirection.downLeft){
                if(this.moveDown(MovingDirection.left)){
                    this.defaultXVelocity += 0.15;
                    this.defaultYVelocity += 0.15;
                    break;
                }
            }else if(this.currentDirection === MovingDirection.left){
                this.xVelocity = -this.defaultXVelocity;
                this.yVelocity = 0;
               
                const leftMostEnemy = enemyRow[0];
                if(leftMostEnemy.x <= 0){
                    this.currentDirection = MovingDirection.downRight;
                    break;
                }
            }else if(this.currentDirection === MovingDirection.downRight){
                if(this.moveDown(MovingDirection.right)){
                    
                    break;
                }
            }
        }
    };
    
    moveDown(newdirection){
        this.xVelocity = 0;
        this.yVelocity = this.defaultYVelocity;
        if(this.moveDownTimer <= 0){
            this.currentDirection = newdirection;
            return true;
        }
        return false;
    }

    drawEnemies(ctx){
        
        this.enemyRows.flat().forEach((enemy) => {
            enemy.move(this.xVelocity, this.yVelocity)
            
            enemy.draw(ctx);
        })
    }

    createEnemies(){ 
        
        this.enemyMap.forEach((row, rowIndex) => {
            this.enemyRows[rowIndex] = [];
            row.forEach((enemyNumber, enemyIndex) => {
                if(enemyNumber > 0){
                    this.enemyRows[rowIndex].push(
                        new Enemy(enemyIndex * 50, rowIndex * 35 , enemyNumber,) )
                }
            })
        })
    };

    collideWith(sprite){
        return this.enemyRows.flat().some((enemy) => enemy.collideWith(sprite))
    }
    reset(){
        this.xVelocity = this.defaultXVelocity;
        this.yVelocity = this.defaultYVelocity;
        this.defaultXVelocity = 0.9;
        this.defaultYVelocity = 0.9;
        this.moveDownTimer = this.moveDownTimerDefault;
        this.score = 0;
        this.createEnemies()
        this.resetMoveDowmTimer()
        this.decrementMoveTimer()
    }
    didWinReset(){
        this.currentLevel ++;
        this.xVelocity = this.defaultXVelocity;
        this.yVelocity = this.defaultYVelocity;
        
        this.defaultYVelocity = 0.7;
        this.moveDownTimer = this.moveDownTimerDefault;
        this.createEnemies()
        this.resetMoveDowmTimer()
        this.decrementMoveTimer()
    }
}