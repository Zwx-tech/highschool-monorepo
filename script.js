import { Cart, Speedway } from './classes.js'

const canvas = document.querySelector('canvas');
console.log(document)
const ctx = canvas.getContext('2d');
const speedway = new Speedway(ctx, canvas.width, canvas.height);
const carts = [new Cart(ctx, {x: canvas.width / 2, y: canvas.height - 10 - 100})]


function update(step) {
    speedway.render();
    carts.forEach(c => {
        c.update()
        // chech every corner
        c.getRectBoundaries().forEach(p => {
            ctx.beginPath()
            ctx.fillStyle = "#f00";
            ctx.fillRect(p.x, p.y, 1, 1)
            ctx.closePath()
        })
        if(!speedway.arePointsInSpeedway(c.getRectBoundaries()))
            c.isEngineOn = false;
    
    });
    requestAnimationFrame(update)
}

requestAnimationFrame(update);