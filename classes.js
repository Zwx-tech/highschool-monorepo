class Cart {
    ctx; // current canvas context
    pos = { x: 0, y: 0 }; // pos {x, y}
    vel = 3; 
    angle = 0; // angle in radians
    angle_vel = 0;
    w = 24;
    h = 12;
    isEngineOn = true;

    constructor(ctx, startingPos) {
        this.ctx = ctx;
        this.pos = startingPos;
        document.addEventListener("keydown", (e) => {
            const angle_acc = ((2 * Math.PI) / (360)) * 4;
            if (e.key == "d") {
                this.angle_vel += angle_acc;
                return;
            }
            if (e.key == "a") {
                this.angle_vel -= angle_acc;
                return;
            }
        });
    }

    update() {
        if (this.isEngineOn){
            this.angle += this.angle_vel;
            this.angle_vel *= 0.7;
            this.pos.x += this.vel * Math.cos(this.angle);
            this.pos.y += this.vel * Math.sin(this.angle);
        }
        this.draw();
    }

    // draw() {

    //     this.ctx.save(); // save current ctx
    //     this.ctx.translate(this.pos.x + this.w / 2, this.pos.y + this.h / 2); // change projection matrix so it origin will be in pos of player
    //     this.ctx.rotate(this.angle);
    //     this.ctx.fillStyle = "#4287f5";
    //     this.ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h); // draw player (origin point of the cnavas is in poistion of player)
    //     this.ctx.restore(); // restore ctx
    // }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.pos.x, this.pos.y); // Przesunięcie do pozycji początkowej
        this.ctx.rotate(this.angle); // Obrót na podstawie kąta
    
        // Rysowanie prostokąta
        this.ctx.fillStyle = "#4287f5";
        this.ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h); 
    
        this.ctx.restore();
    }
    
    // getRectBounderies() {
    //     const d = Math.sqrt(Math.pow(this.w, 2) + Math.pow(this.h, 2));
    //     console.log(d);
    //     return [
    //         this.pos,
    //         {x: (this.pos.x) + this.w, y: (this.pos.y) + this.h},
    //         {x: this.pos.x + this.w, y: this.pos.y},
    //         {x: this.pos.x , y: this.pos.y + this.h},
    //     ]
    // }

    getRectBoundaries() {
        const cosA = Math.cos(this.angle);
        const sinA = Math.sin(this.angle);
    
        // Pobieramy współrzędne punktów w lokalnym układzie współrzędnych
        const localPoints = [
            { x: -this.w / 2, y: -this.h / 2 },
            { x: this.w / 2, y: -this.h / 2 },
            { x: this.w / 2, y: this.h / 2 },
            { x: -this.w / 2, y: this.h / 2 },
        ];
    
        // Transformacja każdego punktu z lokalnego układu współrzędnych do globalnego
        const boundaries = localPoints.map(point => {
            const x = this.pos.x + cosA * point.x - sinA * point.y;
            const y = this.pos.y + sinA * point.x + cosA * point.y;
            return { x, y };
        });
    
        return boundaries;
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

    isPointInSpeedway(x, y) {
        let offset = 100;
        const innerPath = new Path2D();
        innerPath.arc(this.h / 2, this.h/2, this.h/2 - 2 * offset, Math.PI / 2, Math.PI / 2 + Math.PI);
        innerPath.lineTo(this.w - this.h/2, 2 * offset);
        innerPath.arc(this.w - this.h/2, this.h/2, this.h/2 - 2 * offset, Math.PI / 2 + Math.PI, Math.PI / 2);
        innerPath.lineTo(this.h/2, this.h - offset * 2);
        innerPath.fillStyle = "#474747";
        innerPath.closePath();
        offset = 11;
        const outerPath = new Path2D();
        outerPath.arc(this.h / 2, this.h/2, this.h/2 - 2 * offset, Math.PI / 2, Math.PI / 2 + Math.PI);
        outerPath.lineTo(this.w - this.h/2, 2 * offset);
        outerPath.arc(this.w - this.h/2, this.h/2, this.h/2 - 2 * offset, Math.PI / 2 + Math.PI, Math.PI / 2);
        outerPath.lineTo(this.h/2, this.h - offset * 2);
        outerPath.fillStyle = "#474747";
        outerPath.closePath();
        return (!this.ctx.isPointInPath(innerPath, x, y) && this.ctx.isPointInPath(outerPath, x, y))
    }

    arePointsInSpeedway(points) {
        return points.every((p) => this.isPointInSpeedway(p.x, p.y))
    }
}

export { Speedway, Cart };