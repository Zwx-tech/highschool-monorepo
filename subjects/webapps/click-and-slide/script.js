// global 
const images = 3;

// All helper functions 
// basically magic; at this point im not even sure hows it working 
// variable scope is so messed up here
function intervalLoop(callback, delay, repetitions, endCallback) {
    let i = 0;
    let intervalID;
    return intervalID = window.setInterval(function () {
       callback();
       if (++i === repetitions) {
           window.clearInterval(intervalID);
           endCallback();
       }
    }, delay);
}

function formantNum(n, d) {
    return n.toLocaleString('en-US', {minimumIntegerDigits: d, useGrouping:false})
}

function updateScoreboardCookie(scores, n) {
    const parsedScores = scores.map(e => encodeURIComponent(e));
    document.cookie = `scoreboard-${n}=`+ scores.join('|')+`"; max-age=" + ${(3*24*60*60)}`; 
}

function loadScoreboardCookie(n) {
    let response;
    document.cookie.split(';').forEach(c => {
            const parsedCookie = c.split("=");
            if(parsedCookie[0].trim() == `scoreboard-${n}`)
                response = parsedCookie[1].split("|").map(e => e.replace(`"`, ''));
            
    })
    return response;
    // return document.cookie = `scoreboard-${n}=`+ scores.join('|'); 
}

function openModal(time) {
    const modal = document.querySelector('.modal-container');
    const timeEl = document.querySelector('.modal > .modal__text')
    timeEl.innerText = `Twój czas to: ${time}`;
    modal.classList.add('visible')
}

// domain of f(n) being [2, inf)
function shuffleFormula(n) {
    // console.log(20 + ((70 + n) * (n-2)))
    return 10 + ((5 + n) * (n-2));
}

class Slider {
    constructor(id) {
        this.el = document.querySelector(`#${id}`);
        this.currentImg = 1;
        this.size = this.el.scrollWidth / (images + 1); // +1 cause of 'phantom image'
        this.el.scrollTo(this.size * 1, 0);
        this.active = false;
    }
    
    slideWithOutAnimation(slide) {
        this.el.setAttribute('style', 'scroll-behavior: unset;')
        slide();
        this.el.setAttribute('style', 'scroll-behavior: smooth;')
    }

    nextImg() {
        if (this.sliderActive) return;
        this.active = true;
        if(this.currentImg===images) {
            this.slideWithOutAnimation(() => this.el.scrollLeft = 0)
            setTimeout(() => this.el.scrollTo(this.size * 1, 0), 100);
            this.currentImg = 1;
            this.active = false;
            console.log(123)
            return;
        }
        this.el.scrollBy(this.size, 0);
        this.currentImg++;
        this.active = false;
        console.log(123)
    }
    
    prevImg() {
        this.active = true;
        if(this.currentImg==1) {
            this.el.scrollBy(-this.size, 0)
            setTimeout(() => this.slideWithOutAnimation(() => this.el.scrollLeft = this.size * (images + 1)), 170);
            this.currentImg = images
            this.active = false;
            return;
        }
        this.el.scrollBy(-this.size, 0);
        this.currentImg--;
        this.active = false;
    }
}

class Game {
    // our game element
    pf = document.querySelector("#pf");
    // our slider object
    slider = new Slider("slider");
    sliderActive = false;
    // game mechanics stuff
    prevPos = [-1, -1]; // default value is position that does not exist
    n;
    blank;
    startingTime;
    // we need those in case we want to shutdown an interval loop
    displayIntervalID; 
    shuffleIntervalID;
    // display stuff
    pause;
    scoreboard = []
    currentImg = 0;

    async nextImg() {
        document.querySelector("#next-btn").setAttribute('disabled', 'disabled');
        document.querySelector("#prev-btn").setAttribute('disabled', 'disabled');
        setTimeout(() => {
            document.querySelector("#next-btn").removeAttribute('disabled');
            document.querySelector("#prev-btn").removeAttribute('disabled');
        }, 220);
        await this.slider.nextImg();
        console.log(456)
    }
    
    prevImg() {
        document.querySelector("#next-btn").setAttribute('disabled', 'disabled');
        document.querySelector("#prev-btn").setAttribute('disabled', 'disabled');
        setTimeout(() => {
            document.querySelector("#next-btn").removeAttribute('disabled');
            document.querySelector("#prev-btn").removeAttribute('disabled');
        }, 220);
        this.currentImg = this.currentImg > 0 ? (this.currentImg - 1) % images : images - 1;
        this.slider.prevImg();
    }

    updateScoreboard(value) {
        const nickname = prompt("Podaj swój nick");
        this.scoreboard.push(`${value} - ${nickname}`);
        this.scoreboard.sort();
        if(this.scoreboard.length < 10)
            return;
        this.scoreboard = this.scoreboard.slice(0, 10);

    }

    updateScoreboardPreview() {
        const scoreboardList = document.querySelector(".scoreboard > ol")
        scoreboardList.innerHTML = `${
            this.scoreboard.map((v) => `<li>${v}</li>`).join("")
        }`
    }

    loadScoreBoard() {
        const scoreboard = loadScoreboardCookie(this.n);
        this.scoreboard = scoreboard ? scoreboard : [];
        this.updateScoreboardPreview();
    }

    updateDisplay() {
        if (this.pause)
            return;
        const dM = Date.now() - this.startingTime;
        const deltaTime = `${formantNum(parseInt(dM/ (1000 * 60 * 60)), 2)}${formantNum(parseInt(dM/ (1000 * 60)), 2)}${formantNum(parseInt(dM / 1000), 2)}${formantNum(dM % 1000, 3)}`;
        console.log(deltaTime)
        document.querySelectorAll('.timer > .timer__num').forEach((el, i) => {
            el.setAttribute('style', `background-image: url('font/cyferki/c${deltaTime[i]}.gif');`)
        })
    }

    swap(el) {
        const dy = Math.abs(el.dataset.j - this.blank.y);
        const dx = Math.abs(el.dataset.i - this.blank.x); 
        if ( (dx > 1 || dy > 1)  || dx==dy) // check if elements are next to each others
            return;
        let size = 1 / this.n * 100;
        size.toPrecision(2);
        const style = el.getAttribute ('style'); // change position of block
        const parsedStyles = style.substring(0, style.search("top"))
        el.setAttribute('style', `${parsedStyles}top: ${size * this.blank.y}%; left: ${size * this.blank.x}%;`);
        // swap ids
        [el.dataset.i, this.blank.x] = [this.blank.x, el.dataset.i];
        [el.dataset.j, this.blank.y] = [this.blank.y, el.dataset.j];
    }

    playerMove(el) {
        if(this.pause)
            return;
        this.swap(el);
        if(this.check()){
            setTimeout(() => {
                this.pause = true; // pause game
                // update display one more time and calculate the score
                const dM = Date.now() - this.startingTime;
                let deltaTime = `${formantNum(parseInt(dM/ (1000 * 60 * 60)), 2)}${formantNum(parseInt(dM/ (1000 * 60)), 2)}${formantNum(parseInt(dM/ 1000), 2)}${formantNum(dM % 1000, 3)}`;
                document.querySelectorAll('.timer > .timer__num').forEach((el, i) => {
                    el.setAttribute('style', `background-image: url('font/cyferki/c${deltaTime[i]}.gif');`)
                })
                deltaTime = `${formantNum(parseInt(dM/ (1000 * 60 * 60)), 2)}:${formantNum(parseInt(dM/ (1000 * 60)), 2)}:${formantNum(parseInt(dM/ 1000), 2)}.${formantNum(dM % 1000, 3)}`;
                // update scoreboard
                this.updateScoreboard(deltaTime);
                this.updateScoreboardPreview();
                updateScoreboardCookie(this.scoreboard, this.n);
                openModal(deltaTime); 
            }, 210)
        }
    }
    
    shuffle(s) {
        this.shuffleIntervalID = intervalLoop(() => this.randomSwap(), (200 - Math.min((this.n - 2) * 20, 200)), s, () => {});
        // start timer
        setTimeout(() => {
            this.startingTime = Date.now();
            this.displayIntervalID = setInterval(() => this.updateDisplay(), 1);
        }, (200 - Math.min((this.n - 2) * 20, 200)) * s + 300);
        this.pause = false;
        // in case shuffle ends up solving puzzle on its own   
        if(this.check) { 
            this.randomSwap();
        } 
    }

    check() {
        let response = true;
        document.querySelectorAll("#pf > *").forEach(el => {
            if(parseInt(el.dataset.j) * this.n + parseInt(el.dataset.i) != this.n * this.n - 1 - parseInt(el.dataset.startingPlace))
                response = false;
        })
        return response;
    }

    randomSwap() {
        // helper func
        const randomDirection = () => {
            const positions = [
                {i: parseInt(this.blank.x) + 1, j: parseInt(this.blank.y)},
                {i: parseInt(this.blank.x) - 1, j:parseInt(this.blank.y)},
                {i: parseInt(this.blank.x), j: parseInt(this.blank.y) + 1},
                {i: parseInt(this.blank.x), j: parseInt(this.blank.y) - 1},
            ]
            const legalPositions = positions.filter(shift =>
                (!(shift.i >= this.n || shift.i < 0 || shift.j >= this.n || shift.j < 0) && !(shift.i==this.prevPos[0] && shift.j==this.prevPos[1]))
            )
            
            return legalPositions[Math.floor(Math.random() * legalPositions.length)]
        }
        const shift = randomDirection();
        const el = document.querySelector(`[data-i="${shift.i}"][data-j="${shift.j}"]`);
        if(!el) 
            return; // if element is null
        this.prevPos = [parseInt(this.blank.x), parseInt(this.blank.y)]
        this.swap(el);
    }

    generate(n) {
        // reset
        if(this.shuffleIntervalID) 
            window.clearInterval(this.shuffleIntervalID);
        window.clearInterval(this.displayIntervalID);
        pf.setAttribute('style', `--img: url(img/${this.slider.currentImg-1}.webp);`);
        this.startingTime = Date.now();
        this.updateDisplay();
        this.pause = true;
        this.n=n;
        this.loadScoreBoard();
        this.blank = {x: n-1, y: n-1};
        this.pf.innerHTML = '';
        let size = 1 / n * 100;
        size.toPrecision(2);
        for(let j=0; j<n; j++) {
            for(let i=0; i<n; i++) {
                if(j==0 && i==0)
                    continue; // skip last block to create blank space
                const el = document.createElement('div');
                el.dataset.i = n-i-1;
                el.dataset.j = n-j-1;
                el.dataset.startingPlace = n * j + i;
                el.addEventListener('click', () => this.playerMove(el))
                el.setAttribute('style', `
                    --n: ${n};
                    width: ${size}%;
                    --bg-y: -${size  * (n-j-1)}%;
                    --bg-x: -${size  * (n-i-1)}%;
                    top: ${size * (n-j-1)}%;
                    left: ${size * (n-i-1)}%;
                `);
                this.pf.appendChild(el);
            }
        }
        setTimeout(() => this.shuffle(shuffleFormula(n)), 200);
    }

    // debug stuff
    toggleBlank() {
        this.pf.classList.toggle('red');
    }
}

game = new Game();
// game.generate(2);