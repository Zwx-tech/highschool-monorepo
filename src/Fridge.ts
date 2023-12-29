import { CardData, FridgeData, APIData } from "../types/types";
import { Card } from "./Card";

export class Fridge {
    totalCards: number;
    id: number;
    cards: Card[];
    countWrapperChildrenRef: NodeListOf<Element>;

    constructor(id: number, totalCards: number, cardData: CardData[]) {
        // clean up previous fridge
        this.cleanUp();
        // setup 
        this.id = id;
        this.totalCards = totalCards;
        this.cards = this.createCards(cardData);
        this.countWrapperChildrenRef = document.querySelectorAll(".fridge-count__wrapper>*");
        
        // update counters so they will display correct data;
        this.updateCount();

        // setup eventListeners
        document.querySelector("button#addCardBtn")?.addEventListener("click", () => {
            this.addCard();
        });
    }

    createCards (cardsData: CardData[]) {
         return cardsData.map(cardData => {
            return Card.createFromCardData(cardData, () => this.updateCount());
        });
    }

    cleanUp() {
        document.querySelectorAll('.card').forEach( c => {
            c.remove();
        })
    }

    addCard() {
        const newCard = new Card(this.totalCards, () => {this.updateCount()})
        this.cards.push(newCard);
        Card.sendAddRequest(newCard, this.id);
        newCard.bringToFront();
        this.totalCards += 1;
        this.updateCount();
    }
    
    updateCount() {
        this.countWrapperChildrenRef[0].innerHTML = `Przebieg: ${this.totalCards}`;
        this.countWrapperChildrenRef[1].innerHTML = `Na lodówce: ${this.cards.length}`;
    }

    
    static createFromApiData(apiData: APIData): Fridge {
        const fridgeData: FridgeData = apiData.fridge;
        const cardsData: CardData[] = apiData.cards;
        const fridge = new Fridge(fridgeData.id, fridgeData.card_count, cardsData);
        return fridge;
    }
}
