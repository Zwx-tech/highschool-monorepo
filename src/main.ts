import { Card } from "./Card"
import "./style.css"

// element refs
const appRef: HTMLDivElement | null = document.querySelector("#app");
// card vars
const countWrapperChildrenRef = document.querySelectorAll(".fridge-count__wrapper>*");
let cardCount = 0;
let cards: Card[] = [];

function updateCount() {
    const current = document.querySelectorAll(".card");
    countWrapperChildrenRef[0].innerHTML = `przebieg: ${cardCount}`
    countWrapperChildrenRef[1].innerHTML = `przebieg: ${current.length}`
}

// handle add button click
document.querySelector("button#addCardBtn")?.addEventListener("click", () => {
    cards.push(
        new Card(cardCount, () => {updateCount()})
    );
    cardCount += 1;
    updateCount();
});