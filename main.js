//const Car = require('./car.js');
class Car{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0
        this.acceleration = 0.2
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.angle = 0;

        this.controls = new Controls()
    }

    update()
    {
        if(this.controls.forward)
        {
            this.speed+=this.acceleration;
        }
        if(this.controls.reverse)
        {
            this.speed-=this.acceleration;
        }
        if(this.speed>this.maxSpeed)
        {
            this.speed = this.maxSpeed;
        }
        if(this.speed<-this.maxSpeed/2)
        {
            this.speed = -this.maxSpeed/2;
        }
        if(this.speed>0)
        {
            this.speed-=this.friction;
        }
        if(this.speed<0)
        {
            this.speed+=this.friction;
        }
        if(Math.abs(this.speed)<this.friction)
        {
            this.speed = 0;
        }

        if(this.controls.left)
        {
            this.angle+=0.03;
        }
        if(this.controls.right)
        {
            this.angle-=0.03;
        }
        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
        this.y-=this.speed;
    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);
        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill();

        ctx.restore();
    }
}

class Controls
{
    constructor()
    {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;

        this.#addKeyboardListeners();
    }
    #addKeyboardListeners()
    {
        document.onkeydown = (event)=>{
            switch(event.key)
            {
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                        this.forward = true;
                        break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
            }
            console.table(this);
        }
        document.onkeyUp = (event)=>{
            switch(event.key)
            {
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowUp":
                        this.forward = false;
                        break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
            }
            console.table(this);
        }
    }
}

const canvas = document.getElementById("myCanvas");

canvas.width = 200;

const ctx = canvas.getContext("2d");
const car = new Car(100, 100, 30, 50);

animate();

function animate()
{
    car.update();
    canvas.height = window.innerHeight;
    car.draw(ctx);
    requestAnimationFrame(animate);
}