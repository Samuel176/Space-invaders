
export default class PowerUp {
    
    constructor(canvas, powerMeter) {
        this.canvas = canvas;
        this.maxPower = 200;
        this.powerMeter = powerMeter
        this.powerUsed = false;
        this.powerBarArray = [{ x: 130, y: 665, width: this.powerMeter.value, height: 30 }];
        document.addEventListener('keydown', (event) => this.handleKeyPress(event));
        this.powerBarDefaultMax = { x: 130, y: 665, width: 200, height: 30 };
        this.powerBarNew = { x: 130, y: 665, width: this.powerMeter.value, height: 30 };
    }
    draw(ctx) {
        this.powerBar(ctx); 
        console.log()
        
    }

    handleKeyPress(event) {
        if (event.code === 'KeyP') {
            if (this.powerMeter.value >= this.maxPower) {
                this.powerMeter.value -= 200;
               this.powerUsed = true
                console.log(this.powerMeter.value); 
            } else {
                console.log("Not enough power");
                console.log(this.powerMeter.value); 
            }
        }
    }
    
powerBar(ctx) {
    // Clear the previous bar before drawing
    ctx.clearRect(130, 665, this.maxPower, 30);
    if(this.powerBarArray[0].width <= 200){
        ctx.clearRect(130, 665, this.maxPower, 30);
        this.powerBarArray[0].width = this.powerMeter.value;
    }
    if(this.powerUsed){

    }
    this.powerBarArray.forEach(rect => {
        ctx.fillStyle = "blue"
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        
    })
        

}
powerBarReset(){
    this.powerUsed = false
}
}