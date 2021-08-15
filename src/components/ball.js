import { ctx, getDistance, sizes, resolveCollision } from './constants';

export default class Ball {
    constructor(props) {
        this.x = props.x;
        this.y = props.y;
        this.radius = props.radius;
        this.color = props.color;
        this.mass = 1;
        this.friction = 0.1;

        this.velocity = !props.velocity ? {
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1,
            // x: 0,
            // y: 0,
        } : props.velocity;
    }

    update(balls) {
        this.render();
        for (let i = 0; i < balls.length; i++) {
            if (this === balls[i]) continue;

            if (getDistance(this.x, this.y, balls[i].x, balls[i].y) - this.radius * 2 < 100) {
                ctx.beginPath();     
                ctx.moveTo(this.x, this.y); 
                ctx.lineWidth = 0.5;
                ctx.lineTo(balls[i].x, balls[i].y);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.stroke();
            }

            if (getDistance(this.x, this.y, balls[i].x, balls[i].y) - this.radius * 2 < 0) {
                resolveCollision(this, balls[i]);
                balls[i].color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
                this.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
            }
        }

        if (this.x - this.radius <= 0 || this.x + this.radius >= sizes.width) {
            this.velocity.x = -this.velocity.x;
        }
        
        if (this.y - this.radius <= 0 || this.y + this.radius >= sizes.height) {
            this.velocity.y = -this.velocity.y;
        }
        // this.velocity.x *= this.friction;
        // this.velocity.y *= this.friction;

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    render() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}