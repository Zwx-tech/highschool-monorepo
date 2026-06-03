// helper func 
function clamp(num, min, max) {
    return num <= min 
        ? min 
        : num >= max 
        ? max 
        : num
}

class ScoreBoard {
    ref; // reference to DOM element
    maxLaps=5;
    constructor(elementID, maxLaps) {
        this.ref = document.querySelector(`#${elementID} .scoreboard__content > ul`);
        this.maxLaps = maxLaps;
    }   

    update(carts) {
        if(!this.ref)
            return;
        this.ref.innerHTML = ''
        carts.forEach(c => {
            if(c.currentLap > this.maxLaps) {
                this.ref.innerHTML += `<li>${c.name} - Winner</li>`
                return;
            }
            if(c.loser) {
                this.ref.innerHTML += `<li>${c.name} - N/A</li>`;
                return;
            }
            this.ref.innerHTML += `<li>${c.name} - Lap ${c.currentLap} / ${this.maxLaps}</li>`
        });
    }
}
class Cart {
    ctx; // current canvas context
    pos = { x: 0, y: 0 }; // pos {x, y}
    vel = 250; 
    angle = 0; // angle in radians
    angle_vel = 0;
    angle_acc = ((2 * Math.PI) / (360)) * 12;
    w = 34;
    h = 21;
    isEngineOn = true; 
    cartImg;
    name;
    trail;
    currentLap = 0;
    isPointOnFinishLine;
    loser=false;
    constructor(ctx, startingPos, keyLeft, keyRight, imgSrc, name) {
        this.ctx = ctx;
        this.pos = startingPos;
        this.trail = new Trail(ctx);
        this.cartImg = new Image();
        this.cartImg.src = imgSrc;
        this.name = name;
        document.addEventListener("keydown", (e) => {
            if(!this.isEngineOn) {
                return;
            }
            if(Math.abs(this.angle_vel) > this.angle_acc)
                return;
            if (e.key == keyRight) {
                this.angle += this.angle_acc;
                return;
            }
            if (e.key == keyLeft) {
                this.angle -= this.angle_acc;
                return;
            }
        });
    }

    update(dTime) {
        if (this.isEngineOn){
            // this.angle += this.angle_vel;
            // const speedReduction = Math.abs(clamp(((2 * Math.PI) / (360)) * 4 / this.angle_vel, 0.5, 0.7));
            // this.angle_vel *= speedReduction;
            this.pos.x += this.vel * Math.cos(this.angle) * dTime;
            this.pos.y += this.vel * Math.sin(this.angle) * dTime;
            this.trail.addPoint({x: this.pos.x, y: this.pos.y});
        }
        // console.log(dTime)
        this.draw();
    }


    draw() {
        this.trail.draw();
        this.ctx.save();
        this.ctx.translate(this.pos.x, this.pos.y); // 
        this.ctx.rotate(this.angle);
    
        // draw player
        // this.ctx.fillStyle = "#4287f5";
        // this.ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h); 
        this.ctx.drawImage(this.cartImg, -this.w / 2, -this.h / 2);
        this.ctx.restore();
    }
    

    getRectBoundaries() {
        // precalculate cos and sin to speed up the process
        const cosA = Math.cos(this.angle);
        const sinA = Math.sin(this.angle);
    
        // bounding points relative to current player pos
        const localPoints = [
            {x: this.w / 2, y: 0},
            { x: -this.w / 2, y: -this.h / 2 },
            { x: this.w / 2, y: -this.h / 2 },
            { x: this.w / 2, y: this.h / 2 },
            { x: -this.w / 2, y: this.h / 2 },
        ];
    
        // Translate each of points using our pos to get global coordinates
        const boundaries = localPoints.map(point => {
            const x = this.pos.x + cosA * point.x - sinA * point.y;
            const y = this.pos.y + sinA * point.x + cosA * point.y;
            return { x, y };
        });
    
        return boundaries;
    }
    
    updateCurrentLaps(isPointOnFinishLine) {
        if(isPointOnFinishLine && !this.isPointOnFinishLine) {
            this.currentLap += 1;
            this.isPointOnFinishLine = true;
            return;
        }
        if(!isPointOnFinishLine && this.isPointOnFinishLine) {
            this.isPointOnFinishLine = false;
        }

    }
}


class Speedway {
    ctx; // current canvas context
    w; // width of speedway
    h; // height of speedway
    groundPattern;
    grassPattern;
    constructor(ctx, w, h) {
        this.ctx = ctx;
        this.w = w;
        this.h = h;

        const grassImg = new Image();
        grassImg.src = "./img/grass.png";
        grassImg.onload = () => {
            this.grassPattern = this.ctx.createPattern(grassImg, 'repeat')
        }
        const groundImg = new Image();
        groundImg.src = "./img/ground.png";
        groundImg.onload = () => {
            this.groundPattern = this.ctx.createPattern(groundImg, 'repeat')
        }
    }

    render() {
        // outer part
        let offset = 10;
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.w, this.h);
        // this.ctx.fillStyle = "#474747";
        this.ctx.fillStyle = this.grassPattern;
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.arc(this.h / 2, this.h/2, this.h/2 - 2 * offset, Math.PI / 2, Math.PI / 2 + Math.PI);
        this.ctx.lineTo(this.w - this.h/2, 2 * offset);
        this.ctx.arc(this.w - this.h/2, this.h/2, this.h/2 - 2 * offset, Math.PI / 2 + Math.PI, Math.PI / 2);
        this.ctx.lineTo(this.h/2, this.h - offset * 2);
        // this.ctx.fillStyle = "#0aab23";
        this.ctx.fillStyle = this.groundPattern;
        this.ctx.fill();
        this.ctx.closePath();
        // inner part
        offset = 100;
        this.ctx.beginPath();
        this.ctx.arc(this.h / 2, this.h/2, this.h/2 - 2 * offset, Math.PI / 2, Math.PI / 2 + Math.PI);
        this.ctx.lineTo(this.w - this.h/2, 2 * offset);
        this.ctx.arc(this.w - this.h/2, this.h/2, this.h/2 - 2 * offset, Math.PI / 2 + Math.PI, Math.PI / 2);
        this.ctx.lineTo(this.h/2, this.h - offset * 2);
        this.ctx.fillStyle = this.grassPattern;
        this.ctx.fill();
        this.ctx.closePath();
         // finish line
         this.ctx.beginPath();
         this.ctx.beginPath();
         let finishLineX = this.w / 2 + 17;
         let squareSize = 10;
         let numSquares = Math.floor(180 / squareSize);
         let isWhiteSquare = true;
     
         for (let i = 0; i < numSquares; i++) {
             let startY = this.h - 200 + i * squareSize;
             if (isWhiteSquare) {
                 this.ctx.fillStyle = "#ddd";
             } else {
                 this.ctx.fillStyle = "#111";
             }
             this.ctx.fillRect(finishLineX, startY, squareSize, squareSize);
             isWhiteSquare = !isWhiteSquare;
         }
     
         this.ctx.closePath();
    }

    isPointOnFinishLine(x, y) {
        const path = new Path2D();
        path.rect(this.w / 2 + 17, this.h - 200, 10, 180)
        return this.ctx.isPointInPath(path, x, y);
    }

    isPointInSpeedway(x, y) {
        let offset = 100;
        const innerPath = new Path2D();
        innerPath.arc(this.h / 2, this.h/2, this.h/2 - 2 * offset, Math.PI / 2, Math.PI / 2 + Math.PI);
        innerPath.lineTo(this.w - this.h/2, 2 * offset);
        innerPath.arc(this.w - this.h/2, this.h/2, this.h/2 - 2 * offset, Math.PI / 2 + Math.PI, Math.PI / 2);
        innerPath.lineTo(this.h/2, this.h - offset * 2);
        innerPath.closePath();
        offset = 11;
        const outerPath = new Path2D();
        outerPath.arc(this.h / 2, this.h/2, this.h/2 - 2 * offset, Math.PI / 2, Math.PI / 2 + Math.PI);
        outerPath.lineTo(this.w - this.h/2, 2 * offset);
        outerPath.arc(this.w - this.h/2, this.h/2, this.h/2 - 2 * offset, Math.PI / 2 + Math.PI, Math.PI / 2);
        outerPath.lineTo(this.h/2, this.h - offset * 2);
        outerPath.closePath();
        return (!this.ctx.isPointInPath(innerPath, x, y) && this.ctx.isPointInPath(outerPath, x, y))
    }

    arePointsInSpeedway(points) {
        return points.every((p) => this.isPointInSpeedway(p.x, p.y))
    }
}

class Trail {
    ctx; // current canvas context
    points = []; // {x, y}
    maxLength = 100;

    constructor(ctx) {
        this.ctx = ctx;
    }

    draw() {
        // this.points = this.points.filter((p, i) => i < this.maxLength);

        if (this.points.length < 2) {
            return;
        }

        for (let i = 1; i < this.points.length; i++) {
            this.ctx.beginPath();
            const p1 = this.points[i - 1];
            const p2 = this.points[i];

            const alphaBase = (this.maxLength - i) / this.maxLength;
            const stroke = `rgba(0, 0, 0, ${alphaBase.toPrecision(3)})`
            this.ctx.strokeStyle = stroke;
            this.ctx.lineWidth = 20; // You can adjust the line width
            
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }

    addPoint(p) {
        this.points.unshift(p);
        if(this.points.length > this.maxLength)
            this.points.pop();
    }
}


export { Speedway, Cart, ScoreBoard };