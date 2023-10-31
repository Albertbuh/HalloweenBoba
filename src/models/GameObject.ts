import DomViewer from "./DomViewer.js";

interface IPositioned {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface IMovable {
  speedX: number;
  speedY: number;
}

interface IDrawable {
  imageUrl: string|null;
  domView: DomViewer|null;
}

interface IScorable {
  score: number;
}

abstract class GameObject implements IPositioned, IMovable, IDrawable {
  protected static freeId: number = 0;
  
  
  private _id: number;
  public get id(): number {
        return this._id;
  }
  
  abstract speedX: number;
  abstract speedY: number;
  abstract x: number;
  abstract y: number;
  abstract width: number;
  abstract height: number;
  abstract imageUrl: string|null;

  abstract domView: DomViewer;
  
  constructor() {
    this._id = GameObject.freeId;
    console.log(`Created element with id: ${this._id}`);
    GameObject.freeId++;
  }

  abstract setView(element: HTMLElement):void;

  checkCollision(pos: IPositioned):boolean {
    return pos.x >= this.x && pos.x + pos.width <= this.x + this.width  
          && pos.y >= this.y && pos.y + pos.height <= this.y + this.height;
  }
}

export {IPositioned, IMovable, IDrawable, IScorable};
export default GameObject;
