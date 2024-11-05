import Player from "./player.js";
import EnemyController from "./EnemyController.js";
import BulletController from "./BulletController.js";
import Bullet from "./Bullets.js";
import PowerUp from "./Powerup.js";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let newTotal = 10
let ammo = 6
canvas.width = 600;
canvas.height = 700;
let powerMeter = {value : 0 };



const background = new Image();
background.src = "images/space.png";

const playerBulletController = new BulletController(canvas, ammo,"blue",true)
const enemyBulletController = new BulletController(canvas, newTotal , "red", false)
const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController);
const player = new Player(canvas, 3, playerBulletController)
const powerUp = new PowerUp(canvas,powerMeter);


let isGameOver = false;
let didWin = false;


function game(){
   checkGameOver()
   ctx.drawImage(background,0,0,canvas.width,canvas.height)
   displayGameOver()
   displayScore()
   displayPower()
   
  

   if(!isGameOver){
   enemyController.draw(ctx);
   player.draw(ctx);
   playerBulletController.draw(ctx);
   enemyBulletController.draw(ctx); 
   powerUp.draw(ctx)
   PowerScore()
   };
}
function bulletLevel(){
   let bullet = 10;
   let thisLevel = enemyController.currentLevel * 2 + 2;
   newTotal = bullet + thisLevel;
   return newTotal;
   
}
function PowerScore(){
      powerMeter.value =  enemyController.powerUpScore / 10;
      if(powerMeter.value >= 200){
         powerMeter.value = 200;
      }
      if(powerUp.powerUsed){
         enemyController.powerUpUsed()
         powerUp.powerBarReset()
         console.log("this is going")
      }
     
}


function displayScore(){
   let score = `Level: ${enemyController.currentLevel}       Score: ${enemyController.score}  `
   let scoreOffSet = 1  ;
   ctx.fillStyle = "white";
      ctx.font = "30px Arial";
      ctx.fillText(score, scoreOffSet, canvas.height /20);
   
}
function displayPower(){
   let score = `Charge:  `
   let scoreOffSet = 1  ;
   ctx.fillStyle = "white";
      ctx.font = "30px Arial";
      ctx.fillText(score, 5, 690);
   
}




function displayGameOver(){
   if(isGameOver || didWin){
      let text = didWin ? "Winner!" : "Game Over"
      let textOffSet = didWin ? 3.5 : 5;
      ctx.fillStyle = "white";
      ctx.font = "70px Arial";
      ctx.fillText(text, canvas.width / textOffSet, canvas.height /2)
   }
   if(isGameOver || didWin){
      let text = "Press R To Continue"
      let textOffSet = 3.1
      ctx.fillStyle = "white";
      ctx.font = "22px Arial";
      ctx.fillText(text, canvas.width / textOffSet, canvas.height /1.5)
   }
}
function reset(){
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   clearInterval(game);
   enemyController.reset();
   powerUp.powerBarReset();
   playerBulletController.bullets = [];
   enemyBulletController.bullets = [];
   
}
function didWinReset(){
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   clearInterval(game);
   enemyController.levelMap();
   enemyController.didWinReset();
   powerUp.powerBarReset();
   playerBulletController.bullets = [];
   enemyBulletController.bullets = [];
   
}

function gameOverToggle(){
   if(isGameOver && didWin === false){
      document.addEventListener('keydown', function(event) {
         if (event.code === 'KeyR' && isGameOver) {
             isGameOver = false;
             didWin = false;
             reset()
             
         }
     });
   }
   if(didWin){
      document.addEventListener('keydown', function(event) {
         if (event.code === 'KeyR' && didWin) {
             isGameOver = false;
             didWin = false;
             didWinReset()
             bulletLevel()
             console.log(newTotal)
             
             
         }
     });
   }
}

function checkGameOver(){
   if(isGameOver){ 
      return ;
   }
   if(enemyBulletController.collideWith(player)){
      isGameOver =  true;
      gameOverToggle()

   }
   if(enemyController.collideWith(player)){
      isGameOver = true;
      gameOverToggle()
   }
   if(enemyController.enemyRows.length === 0){
      didWin = true;
      isGameOver = true;
      gameOverToggle()
      
   }
}

setInterval(game, 1000/60);