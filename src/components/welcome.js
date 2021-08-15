import { canvas, ctx, sizes, balls, randomIntFromRange, getDistance } from './constants';
import Ball from './ball';

export default function Welcome() {
    canvas.width = sizes.width;
    canvas.height = sizes.height;
    const mouseVelocity = {
        x: null,
        y: null,
    };

    const mouse = {
        x: 0,
        y: 0,
    }

    var totalX = 0;
    var totalY = 0;
    var moveX = 0;
    var moveY = 0;

    canvas.addEventListener('mousemove', (e) => {
        // totalX += Math.abs(e.movementX);
        // totalY += Math.abs(e.movementY);
        // moveX += e.movementX;
        // moveY += e.movementY;
        // mouseVelocity.x = moveX;
        // mouseVelocity.y = moveY;

        // mouse.x = e.clientX;
        // mouse.y = e.clientY;
    })
    // setInterval(function(){
    //     console.log(`Speed X: ${totalX}px/s, Y: ${totalY}px/s`);
    //     console.log(`Movement X: ${moveX}px/s, Y: ${moveY}px/s`);
    //     moveX = moveY = totalX = totalY = 0;
    // }, 200);

   
    const userBall = new Ball({ x: innerWidth/2, y: innerHeight/2, radius: 10, color: 'green'});
    // balls.push(userBall);

    const init = () => {
        const radius = 10;
        
        for (let i = 0; i < 80; i++) {
            let x = randomIntFromRange(radius, canvas.width - radius);
            let y = randomIntFromRange(radius, canvas.height - radius);
            const color = 'white';
            balls.push(new Ball({ x, y, radius, color }));
    
            if (i !== 0) {
                for (let j = 0; j < balls.length; j++) {
                    if (getDistance(x, y, balls[j].x, balls[j].y) - radius * 2 < 0) {
                        x = randomIntFromRange(radius, canvas.width - radius);
                        y = randomIntFromRange(radius, canvas.height - radius);
                
                        j = -1;
                    }
                }
            }
        }
    }

    const render = () => {
        requestAnimationFrame(render);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        balls.forEach(ball => {
            ball.update(balls);
        });

        userBall.update(userBall);
        userBall.x = mouse.x;
        userBall.y = mouse.y;
        userBall.velocity.x = moveX / 20;
        userBall.velocity.y = moveY / 20;
    };
    init();
    render();
}
 