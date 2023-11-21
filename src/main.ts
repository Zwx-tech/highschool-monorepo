import { Card } from "./Card"
import "./style.css"

// element refs
const appRef: HTMLDivElement | null = document.querySelector("#app");
// card vars
let cardCount = 0;
let cards: Card[] = [];

// handle add button click
document.querySelector("button#addCardBtn")?.addEventListener("click", () => {
    cards.push(
        new Card(cardCount)
    )
    cardCount += 1;
    console.log(cardCount);
});