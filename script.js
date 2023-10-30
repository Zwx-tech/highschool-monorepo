import { Cart, Speedway } from './classes.js'

const canvas = document.querySelector('canvas');
console.log(document)
const ctx = canvas.getContext('2d');
const speedway = new Speedway(ctx, canvas.width, canvas.height);
const carts = [new Cart(ctx, {x: canvas.width / 2, y: canvas.height - 10 - 100})]


function update(step) {
    speedway.render();
    carts.forEach(c => c.update());
    requestAnimationFrame(update)
}

requestAnimationFrame(update);