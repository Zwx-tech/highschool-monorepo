class Cart {
    ctx; // Obecny kontekst płótna
    pos = { x: 0, y: 0 }; // Pozycja {x, y}
    vel = 1; // Prędkość
    angle = 0; // Kąt w radianach
    angle_vel = 0;

    constructor(ctx, startingPos) {
        this.ctx = ctx;
        this.pos = startingPos;

        document.addEventListener("keydown", (e) => {
            if (e.key == "d") {
                this.angle_vel += ((2 * Math.PI) / (360 * 2));
                return;
            }
            if (e.key == "a") {
                this.angle_vel -= ((2 * Math.PI) / (360 * 2));
                return;
            }
        });
    }

    update() {
        this.angle += this.angle_vel;
        this.angle_vel *= 0.7;
        this.pos.x += this.vel * Math.cos(this.angle);
        this.pos.y += this.vel * Math.sin(this.angle);
        this.draw();
    }

    draw() {
        const [w, h] = [24, 12];

        this.ctx.save(); // Zapisz obecny stan kontekstu
        this.ctx.translate(this.pos.x + w / 2, this.pos.y + h / 2);
        this.ctx.rotate(this.angle);
        this.ctx.fillStyle = "#4287f5";
        this.ctx.fillRect(-w / 2, -h / 2, w, h); // Rysuj koszyk
        this.ctx.restore(); // Przywróć poprzedni stan kontekstu
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