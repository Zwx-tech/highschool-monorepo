class Cart {
    ctx; // current canvas context
    pos = {x: 0, y: 0}; // {x, y}
    vel = 2; // 
    angle = 0; // radians
    angle_vel = ((2 * Math.PI) / 360) * 5;


    constructor(ctx, startingPos) {
        this.ctx = ctx;
        this.pos = startingPos;
    }

    update() {
        this.pos.x += this.vel * Math.cos(this.angle);
        this.pos.y += this.vel * Math.sin(this.angle);
        this.draw();
    }

    draw() {
        const [w, h] = [24, 12]
        this.ctx.beginPath();
        this.ctx.rect(this.pos.x, this.pos.y, w, h);
        this.ctx.fillStyle = "#4287f5";
        this.ctx.fill();
        this.ctx.closePath();
    }

}

class Speedway {
    ctx; // current canvas context
    w; // width of speedway
    h; // height of speedway

    constructor(ctx, w, h) {
        this.ctx = ctx;
        this.w = w;
        this.h = h;
    }

    render() {
        let offset = 10;
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.w, this.h);
        this.ctx.fillStyle = "#474747";
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.arc(this.h / 2, this.h/2, this.h/2 - 2 * offset, Math.PI / 2, Math.PI / 2 + Math.PI);
        this.ctx.lineTo(this.w - this.h/2, 2 * offset);
        this.ctx.arc(this.w - this.h/2, this.h/2, this.h/2 - 2 * offset, Math.PI / 2 + Math.PI, Math.PI / 2);
        this.ctx.lineTo(this.h/2, this.h - offset * 2);
        this.ctx.fillStyle = "#0aab23";
        this.ctx.fill();
        this.ctx.closePath();
        offset = 100;
        this.ctx.beginPath();
        this.ctx.arc(this.h / 2, this.h/2, this.h/2 - 2 * offset, Math.PI / 2, Math.PI / 2 + Math.PI);
        this.ctx.lineTo(this.w - this.h/2, 2 * offset);
        this.ctx.arc(this.w - this.h/2, this.h/2, this.h/2 - 2 * offset, Math.PI / 2 + Math.PI, Math.PI / 2);
        this.ctx.lineTo(this.h/2, this.h - offset * 2);
        this.ctx.fillStyle = "#474747";
        this.ctx.fill();
        this.ctx.closePath();
    }
}

export { Speedway, Cart };