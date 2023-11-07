import { Cart, Speedway } from './classes.js';

const canvas = document.querySelector('canvas');
const formElement = document.querySelector('#player-form');
const newPlayerButton = document.querySelector('.add-player__button');
const removeLastPlayerButton = document.querySelector('.remove-player__button');
const ctx = canvas.getContext('2d');
const speedway = new Speedway(ctx, canvas.width, canvas.height);
const carts = [new Cart(ctx, {x: canvas.width / 2, y: canvas.height - 10 - 100})]

let isGamePaused = true;
let prevStep = 0;
let playerCount = 1;

function addKeyDownListners() {
    const currentFieldset = document.querySelectorAll(`.key-input`);
    currentFieldset.forEach(el => {
        el.addEventListener('keydown', e => {
            e.preventDefault();
            e.target.value = e.key;
            e.target.dataset.key = e.key;
        })
    });
}
function createFieldSet(id) {
    const fieldsetElement = document.createElement('fieldset');
    fieldsetElement.className = "player player-card";
    fieldsetElement.id = `player-${id}`;
    fieldsetElement.innerHTML = `                              
        <h2>Player ${id}</h2>
        <h5>Player</h5>
        <div class="field-row">
            <label for="player-${id}-nickname">Nickname</label>
            <input id="player-${id}-nickname" type="text">
        </div>
        <h5>Controls</h5>
        <div class="field-row">
            <label for="player-${id}-l" style="width: max-content;">Key left</label>
            <input id="player-${id}-l" class="key-input" type="text">
        </div>
        <div class="field-row">
            <label for="player-${id}-r">Key right</label>
            <input id="player-${id}-r" class="key-input" type="text">
        </div>
    `.trim();
    return fieldsetElement;
}

formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const values = Array.from(e.target.querySelectorAll('input')).map(el => [el.id, el.value])
    if(!values.every(el => el[1])){
        return;
    }
    e.target.parentNode.parentNode.style.visibility = "hidden"; 
    carts.forEach(c => c.isEngineOn = false)
    isGamePaused = false;
    setTimeout(() => {
        carts.forEach(c => c.isEngineOn = true)
    }, 1000)
})

newPlayerButton.addEventListener("click", e => {
    if (playerCount > 3)
        return;
    const parent = document.querySelector(".taba__wrapper");
    const playerCards = document.querySelectorAll('.player:not(.player-card)');
    playerCards[playerCards.length - 1].remove();
    parent.appendChild(createFieldSet(playerCount+1));
    addKeyDownListners();
    playerCount++;
})

removeLastPlayerButton.addEventListener("click", e => {
    if (playerCount < 2)
        return;
    const parent = document.querySelector(".taba__wrapper");
    const playerCards = document.querySelectorAll('.player-card');
    playerCards[playerCards.length - 1].remove();
    const fieldsetElement = document.createElement('fieldset');
    fieldsetElement.className = "player"
    parent.appendChild(fieldsetElement);
    playerCount--;
})

function update(step) {
    // render track
    speedway.render();
    if(isGamePaused){
        prevStep = step;
        requestAnimationFrame(update);
        return;
    }

    const dTime = (step - prevStep)/1000;
    prevStep = step;
    carts.forEach(c => {
        c.update(dTime);
        // check every corner
        // c.getRectBoundaries().forEach(p => {
        //     ctx.beginPath();
        //     ctx.fillStyle = "#f00";
        //     ctx.fillRect(p.x, p.y, 1, 1);
        //     ctx.closePath();
        // })
        if(!speedway.arePointsInSpeedway(c.getRectBoundaries()))
            c.isEngineOn = false;
    
    });
    requestAnimationFrame(update);
}

addKeyDownListners()
requestAnimationFrame(update);