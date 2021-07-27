import { ctx } from './constants';

export default class Ball {
    constructor(props) {
        this.x = props.x;
        this.y = props.y;
        this.radius = props.radius;
        this.color = props.color;

        this.velocity = {
            x: Math.random() - 0.5,
            y: Math.random() - 0.5,
        };
    }

    update() {
        this.render();
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