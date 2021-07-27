import { canvas, ctx, sizes, balls } from './constants';
import Ball from './ball';

export default function Welcome() {
    canvas.width = sizes.width;
    canvas.height = sizes.height;
    const render = () => {
        requestAnimationFrame(render);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        balls.forEach(ball => {
            ball.update();
        });
    };

    const getDistance = (x1, y1, x2, y2) => {
        const distX = x2 - x1;
        const distY = y2 - y1;
        return Math.hypot(distX, distY);
    }; 

    render();
}
