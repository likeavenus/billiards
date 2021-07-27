import Ball from './ball';

export const canvas = document.querySelector('#canvas');
export const ctx = canvas.getContext('2d');

export const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

export let balls = [];

for (let i = 0; i < 100; i++) {
    const x = Math.random() * sizes.width;
    const y = Math.random() * sizes.height;
    const radius = 20;
    const color = 'white';
    balls.push(new Ball({ x, y, radius, color }));
} 