import DomViewer from "./DomViewer.js";
import Factory from "./Factory.js";
import GameObject, { IPositioned, IScorable } from "./GameObject.js";
import Randomizer from "./Randomizer.js";

class Pumpkin extends GameObject implements IScorable {
  domView: DomViewer;
  //id:number;
  speedX: number = 0;
  speedY: number = 0;
  rotateAngle: number = 0;
  private _x: number;
  public get x(): number {
    return this._x;
  }
  public set x(value: number) {
    this._x = value;
    if (this.domView) {
      this.domView.moveOnX(this._x);
    }
  }

  private _y: number;
  public get y(): number {
    return this._y;
  }
  public set y(value: number) {
    this._y = value;
    if (this.domView) {
      this.domView.moveOnY(this._y);
    }
  }

  width: number;
  height: number;
  imageUrl: string | null;
  score: number;
  
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    imageUrl: string | null = null,
  ) {
    super(); //sets id of element;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.imageUrl = imageUrl;

    this.score = 1;
  }

  rotate(inc: number = 1) {
    if (this.domView) {
      this.domView.rotate(this.rotateAngle);
      this.rotateAngle = (this.rotateAngle + inc) % 360;
    }
  }

  setSpeed(sX: number | null, sY: number | null) {
    if (sX) {
      this.speedX = sX;
    }
    if (sY) {
      this.speedY = sY;
    }
  }

  setView(view: HTMLElement) {
    this.domView = new DomViewer(view);
  }
}

class LightPumpkin extends Pumpkin {
  private soundEffect = new Audio("./src/music/lpumpkin.mp3");
  public score = 2;
  
  checkCollision(pos: IPositioned): boolean {
    let collided = super.checkCollision(pos);
    if (collided) {
      let ind = Math.floor(1 + Math.random() * 3);
      this.domView.element.setAttribute(
        "src",
        `./src/images/cutted_pumpkin/cut${ind}.png`,
      );
      this.soundEffect.play();
    }
    return collided;
  }
}

class DarkPumpkin extends Pumpkin {
  private basicSoundEffect = new Audio("./src/music/dpumpkin.wav");
  private screamSoundEffect = new Audio("./src/music/scream.mp3");
  private static isPlaying = false;
  public score = -5;
  private static cuttedAmount = 0;


  checkCollision(pos: IPositioned): boolean {
    let collided = super.checkCollision(pos);
    if (collided) {
      DarkPumpkin.cuttedAmount++;
      if(DarkPumpkin.cuttedAmount % 5 == 0)
        this.screamSoundEffect.play();
      this.basicSoundEffect.play();
      this.domView.element.hidden = true;
      this.showBooAnimation();
    }
    return collided;
  }

  static countBooLimitWidth() {
    let winW = window.innerWidth;
    return winW > 800 ? winW * 3 : winW * 6;
  }

  
  showBooAnimation()
  {
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

      if(width <= DarkPumpkin.countBooLimitWidth())
        setTimeout(resize, 20);
      else
        img.remove();
    });
  }
}

class LightPumpkinFactory implements Factory {
  create(): LightPumpkin {
    return new LightPumpkin(0, 0, 0, 0, "./src/images/lpumpkin.png");
  }
}

class DarkPumpkinFactory implements Factory {
  create(): DarkPumpkin {
    return new DarkPumpkin(0, 0, 0, 0, "./src/images/dpumpkin.png");
  }
}

export {
  DarkPumpkin,
  DarkPumpkinFactory,
  LightPumpkin,
  LightPumpkinFactory,
  Pumpkin,
};
