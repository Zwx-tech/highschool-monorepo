// icons
const closeSvg = `
<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L6.75 17.25"/>
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75L17.25 17.25"/>
</svg>`
const resizeSvg = `
<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 7.75H15.25C15.8023 7.75 16.25 8.19772 16.25 8.75V19.25"/>
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 16.25H8.75C8.19772 16.25 7.75 15.8023 7.75 15.25V4.75"/>
</svg>`

class Card {
  width?: number;
  height?: number;
  minWidth = 100;
  minHeight = 100;
  ref?: HTMLDivElement;
  id?: number;
  isDragging: boolean = false;
  isResizing: boolean = false;
  offsetX: number = 0;
  offsetY: number = 0;
  updateCountCallback: () => void;

  constructor(id: number, updateCountCallback: () => void, width = 200, height = 200) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.updateCountCallback = updateCountCallback;
    // create html element that represents our card in dom
    this.create(this.width, this.height);
  }

  create(width: number, height: number) {
    this.ref = document.createElement("div");
    this.ref.className = "card";
    this.ref.style.width = `${width}px`;
    this.ref.style.height = `${height}px`;

    // create close button
    const closeButton = document.createElement("button");
    closeButton.innerHTML = closeSvg;
    closeButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.ref?.remove();
      this.updateCountCallback();
    });

    // create resize button
    const resizeButton = document.createElement("button");
    resizeButton.className = "resize-handle";
    resizeButton.innerHTML = resizeSvg;
    resizeButton.addEventListener(
      "mousedown",
      this.handleResizeStart.bind(this)
    );
    // add content div
    const contentDiv = document.createElement('div');
    contentDiv.className = 'card__content';

    this.ref.appendChild(closeButton);
    this.ref.appendChild(contentDiv)
    this.ref.appendChild(resizeButton);

    // Add event listeners for dragging and resizing
    this.ref.addEventListener("mousedown", this.handleDragStart.bind(this));
    //! we need add this one to the document so event won't end after our mouse leaves the card
    document.addEventListener("mousemove", this.handleMouseMove.bind(this));
    document.addEventListener("mouseup", this.handleMouseUp.bind(this));

    // add card to the dom
    const appContainer = document.querySelector("#app");
    appContainer?.appendChild(this.ref);
  }

  handleDragStart(event: MouseEvent) {
    this.pushToTheFront();
    console.log("mouse down");
    this.isDragging = true;
    this.offsetX = event.offsetX;
    this.offsetY = event.offsetY;
  }

  handleResizeStart(event: MouseEvent) {
    this.isResizing = true;
    this.offsetX = event.clientX - this.ref!.getBoundingClientRect().right;
    this.offsetY = event.clientY - this.ref!.getBoundingClientRect().bottom;
  }

  handleMouseUp() {
    console.log("mouse up");
    console.log(this.isDragging)
    this.isDragging = false;
    this.isResizing = false;
  }

  handleMouseMove(event: MouseEvent) {
    if (this.isResizing) {
        const newWidth =
          event.clientX - this.ref!.getBoundingClientRect().left + this.offsetX;
        const newHeight =
          event.clientY - this.ref!.getBoundingClientRect().top + this.offsetY;
  
        this.ref!.style.width = `${Math.max(newWidth, this.minWidth)}px`;
        this.ref!.style.height = `${Math.max(newHeight, this.minHeight)}px`;
        return;
    }

    if (this.isDragging) {
      const newX = event.clientX - this.offsetX;
      const newY = event.clientY - this.offsetY;

      this.ref!.style.left = `${newX}px`;
      this.ref!.style.top = `${newY}px`;
    }
  }

  pushToTheFront() {
    const highestZIndex = Math.max(
      ...Array.from(document.querySelectorAll(".card")).map((card) => {
        return parseFloat(window.getComputedStyle(card).zIndex) || 0;
      })
    );

    this.ref!.style.zIndex = `${(highestZIndex + 1)}`;
  }

}

export { Card };
