import { CardData } from "../types/types";
import { closeSvg, resizeSvg } from "./icons";
import editor from "./tinyMC";

// env
const env = import.meta.env;

class Card {
  id: number; 
  width: number;
  height: number;
  minWidth = 150;
  minHeight = 150;
  zIndex: number;
  content: string;
  private ref?: HTMLDivElement;
  private isDragging: boolean = false;
  private isResizing: boolean = false;
  private dragOffsetX: number = 0;
  private dragOffsetY: number = 0;
  private readonly updateCountCallback: () => void;
  private resizeOffsetX: number = 0;
  private resizeOffsetY: number = 0;

  constructor(id: number, updateCountCallback: () => void, width = 200, height = 200, topPos = 100, leftPos = 100, zIndex=0, content = '') {
    this.id = id;
    this.width = width;
    this.height = height;
    this.updateCountCallback = updateCountCallback; 
    this.content = content;
    this.zIndex = zIndex;
    // create html element that represents our card in dom
    this.create(this.width, this.height, topPos, leftPos);
  }

  static createFromCardData(cardData: CardData, updateCountCallback: () => void): Card {
    return new Card(
      cardData.id,
      updateCountCallback,
      cardData.width,
      cardData.height,
      cardData.top_pos,
      cardData.left_pos,
      cardData.z_index,
      cardData.content
    );

  }

  get top(): number {
    return this.ref?.getBoundingClientRect().top || 0;
  }

  get left(): number {
    return this.ref?.getBoundingClientRect().left || 0;
  }

  create(width: number, height: number, topPos: number, leftPos: number) {
    this.ref = document.createElement("div");
    this.ref.className = "card";
    this.ref.style.width = `${width}px`;
    this.ref.style.height = `${height}px`;
    this.ref.style.top = `${topPos}px`
    this.ref.style.left = `${leftPos}px`
    this.ref.style.zIndex = `${this.zIndex}`;

    // create close button
    const closeButton = document.createElement("button");
    closeButton.innerHTML = closeSvg;
    closeButton.addEventListener("mousedown", e => {
      e.preventDefault();
      this.ref?.remove();
      this.sendDeleteReq();
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
    contentDiv.addEventListener('click', async (e) => {
      e.preventDefault();
      const value = await editor.open(contentDiv.innerHTML);
      if(value) {
        this.content = value;
        contentDiv.innerHTML = value;
        await this.sendUpdateReq();
      }
    })
    contentDiv.className = 'card__content';
    contentDiv.innerHTML = this.content;

    this.ref.appendChild(closeButton);
    this.ref.appendChild(contentDiv)
    this.ref.appendChild(resizeButton);

    // Add event listeners for dragging and resizing
    this.ref.addEventListener("mousedown", this.handleDragStart.bind(this));
    //! we need add this onto the document so event won't end after our mouse leaves the card
    document.addEventListener("mousemove", this.handleMouseMove.bind(this));
    document.addEventListener("mouseup", this.handleMouseUp.bind(this));

    // add card to the dom
    const appContainer = document.querySelector("#app");
    appContainer?.appendChild(this.ref);
  }

  async sendUpdateReq() {
    const getRequest = `mode=update&id=${this.id}&width=${this.width}&height=${this.height}&topPos=${this.ref!.getBoundingClientRect().top}&leftPos=${this.ref!.getBoundingClientRect().left}&zIndex=${this.zIndex}&content=${this.content}`
    try {
        const req = await fetch(`http://${env.VITE_ENDPOINT_URL}/fridge/update.php?${getRequest}`);
        if(!req.ok) {
            throw new Error("")
        }
        console.log(await req.json());
    } catch(e) {
        console.log(e);
    }
  }

  async sendDeleteReq() {
    const getRequest = `mode=delete&id=${this.id}`
    try {
        const req = await fetch(`http://${env.VITE_ENDPOINT_URL}/fridge/update.php?${getRequest}`);
        if(!req.ok) {
            throw new Error("")
        }
        console.log(await req.json());
    } catch(e) {
        console.log(e);
    }
  }

  static async sendAddRequest(card: Card, id: number): Promise<{ status: string, message: string }> {
    const getRequest = `mode=add&width=${card.width}&height=${card.height}&topPos=${card.top}&leftPos=${card.left}&zIndex=${card.zIndex}&content=${card.content}&fridgeID=${id}`;

    try {
      const req = await fetch(`http://${env.VITE_ENDPOINT_URL}/fridge/update.php?${getRequest}`);
      
      if (!req.ok) {
        throw new Error("Add request failed");
      }

      return await req.json();
    } catch (e) {
      console.log(e);
      return { status: 'error', message: 'Error sending add request' };
    }
  }

  handleDragStart(event: MouseEvent) {
    this.sendUpdateReq();
    this.isDragging = true;
    this.dragOffsetX = event.clientX - this.ref!.getBoundingClientRect().left;
    this.dragOffsetY = event.clientY - this.ref!.getBoundingClientRect().top;
    this.bringToFront();
    this.addGlowEffect();
  }
  
  handleResizeStart(event: MouseEvent) {
    event.stopPropagation();
    this.isResizing = true;
    this.resizeOffsetX = event.clientX;
    this.resizeOffsetY = event.clientY;
    this.bringToFront();
    this.addGlowEffect();
  }
  
  handleMouseUp(event: MouseEvent) {
    event.stopPropagation();
    this.sendUpdateReq();
    this.isDragging = false;
    this.isResizing = false;
    this.removeGlowEffect();
  }

  handleMouseMove(event: MouseEvent) {
    if (this.isResizing) {
      const currentWidth = this.ref!.offsetWidth;
      const currentHeight = this.ref!.offsetHeight;
      const newWidth = currentWidth + (event.clientX - this.resizeOffsetX);
      const newHeight = currentHeight + (event.clientY - this.resizeOffsetY);
      this.width = Math.max(newWidth, this.minWidth);
      this.height = Math.max(newHeight, this.minHeight);
      
      // Update size and resize offset for next calculation
      this.ref!.style.width = `${this.width}px`;
      this.ref!.style.height = `${this.height}px`;
      this.resizeOffsetX = event.clientX;
      this.resizeOffsetY = event.clientY;
      return;
    }

    if (this.isDragging) {
      const newX = event.clientX - this.dragOffsetX;
      const newY = event.clientY - this.dragOffsetY;

      this.ref!.style.left = `${newX}px`;
      this.ref!.style.top = `${newY}px`;
    }
  }

  bringToFront(): void {
    // Find the maximum zIndex among all cards
    const maxZIndex = Math.max(...Array.from(document.querySelectorAll('.card')).map(card => parseInt((card as HTMLDivElement).style.zIndex)) || 0);
    console.log()
    // if(this.zIndex >= maxZIndex && maxZIndex > 0) return;
    
    this.zIndex = maxZIndex + 1;
    // Update the card's appearance
    this.ref!.style.zIndex = `${this.zIndex}`;
  }

  private addGlowEffect(): void {
    // Add a glowing effect using box-shadow
    this.ref!.style.boxShadow = '0 0 10px rgba(143, 149, 255, 0.7)';
  }

  private removeGlowEffect(): void {
    // Remove the glowing effect
    this.ref!.style.boxShadow = 'none';
  }
}

export { Card };
