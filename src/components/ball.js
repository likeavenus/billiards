import { ctx, getDistance, sizes, resolveCollision } from './constants';

export default class Ball {
    constructor(props) {
        this.x = props.x;
        this.y = props.y;
        this.radius = props.radius;
        this.color = props.color;
        this.mass = 1;

        this.velocity = !props.velocity ? {
            x: Math.random() - 1.5,
            y: Math.random() - 1.5,
        } : props.velocity;
    }

    update(balls) {
        this.render();

        for (let i = 0; i < balls.length; i++) {
            if (this === balls[i]) continue;
            if (getDistance(this.x, this.y, balls[i].x, balls[i].y) - this.radius * 2 < 0) {
                resolveCollision(this, balls[i]);
            }
        }

        if (this.x - this.radius <= 0 || this.x + this.radius >= sizes.width) {
            this.velocity.x = -this.velocity.x;
        }
        
        if (this.y - this.radius <= 0 || this.y + this.radius >= sizes.height) {
            this.velocity.y = -this.velocity.y;
        }

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