import DomViewer from "./DomViewer.js";
import GameObject from "./GameObject.js";
class Pumpkin extends GameObject {
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        if (this.domView) {
            this.domView.moveOnX(this._x);
        }
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        if (this.domView) {
            this.domView.moveOnY(this._y);
        }
    }
    constructor(x, y, width, height, imageUrl = null) {
        super(); //sets id of element;
        //id:number;
        this.speedX = 0;
        this.speedY = 0;
        this.rotateAngle = 0;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.imageUrl = imageUrl;
        this.score = 1;
    }
    rotate(inc = 1) {
        if (this.domView) {
            this.domView.rotate(this.rotateAngle);
            this.rotateAngle = (this.rotateAngle + inc) % 360;
        }
    }
    setSpeed(sX, sY) {
        if (sX) {
            this.speedX = sX;
        }
        if (sY) {
            this.speedY = sY;
        }
    }
    setView(view) {
        this.domView = new DomViewer(view);
    }
}
class LightPumpkin extends Pumpkin {
    constructor() {
        super(...arguments);
        this.soundEffect = new Audio("./src/music/lpumpkin.mp3");
        this.score = 3;
    }
    checkCollision(pos) {
        let collided = super.checkCollision(pos);
        if (collided) {
            let ind = Math.floor(1 + Math.random() * 3);
            this.domView.element.setAttribute("src", `./src/images/cutted_pumpkin/cut${ind}.png`);
            this.soundEffect.play();
        }
        return collided;
    }
}
class DarkPumpkin extends Pumpkin {
    constructor() {
        super(...arguments);
        this.basicSoundEffect = new Audio("./src/music/dpumpkin.wav");
        this.screamSoundEffect = new Audio("./src/music/scream.mp3");
        this.score = -4;
    }
    checkCollision(pos) {
        let collided = super.checkCollision(pos);
        if (collided) {
            DarkPumpkin.cuttedAmount++;
            if (DarkPumpkin.cuttedAmount % 5 == 0)
                this.screamSoundEffect.play();
            this.basicSoundEffect.play();
            this.domView.element.hidden = true;
            this.showBooAnimation();
        }
        return collided;
    }
    tryPlaySound() {
        if (!DarkPumpkin.isPlaying) {
            this.basicSoundEffect.play();
            DarkPumpkin.isPlaying = true;
            this.basicSoundEffect.addEventListener("ended", () => {
                DarkPumpkin.isPlaying = false;
            });
        }
    }
    showBooAnimation() {
        let img = document.createElement("img");
        img.classList.add("dark-boo");
        img.style.zIndex = "1000";
        img.setAttribute("src", "./src/images/dpumpkin_t.png");
        document.body.append(img);
        setTimeout(function resize() {
            let width = img.clientWidth;
            let height = img.clientHeight;
            img.style.width = `${width + 40}px`;
            img.style.height = `${height + 40}px`;
            if (width <= window.innerWidth * 3)
                setTimeout(resize, 20);
            else
                img.remove();
        });
    }
}
DarkPumpkin.isPlaying = false;
DarkPumpkin.cuttedAmount = 0;
class LightPumpkinFactory {
    create() {
        return new LightPumpkin(0, 0, 0, 0, "./src/images/lpumpkin.png");
    }
}
class DarkPumpkinFactory {
    create() {
        return new DarkPumpkin(0, 0, 0, 0, "./src/images/dpumpkin.png");
    }
}
export { DarkPumpkin, DarkPumpkinFactory, LightPumpkin, LightPumpkinFactory, Pumpkin, };
