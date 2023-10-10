class Cart {

}

class Speedway {
    ctx; // curent canvas context
    w; // width of speedway
    h; // height of speedway
    constructor(ctx, w, h) {
        this.ctx = ctx;
        this.w = w;
        this.h = h;
    }

    render() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.h / 2, this.h/2 + 10);
    }
}