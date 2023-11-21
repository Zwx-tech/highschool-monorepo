class Card {
    width?: number;
    height?: number;
    ref?: HTMLDivElement;
    id?: number;

    constructor(id: number, width = 100, height = 100) {
        this.id = id;
        this.width = width;
        this.height = height;
        // create html element that represents our card in dom
        this.create(this.width, this.height)
    }

    create(width: number, height: number) {
        this.ref = document.createElement("div");
        this.ref.className = "card";
        this.ref.style.width = `${width}px`;
        this.ref.style.height = `${height}px`;
        const closeButton = document.createElement("button");
        closeButton.addEventListener("click", () => {
            console.log(123);
            this.ref?.remove();
        })
        closeButton.innerText = "Close";
        this.ref.appendChild(closeButton);
        // add it to the dom
        document.querySelector("#app")?.appendChild(this.ref);
    }

}

export { Card }