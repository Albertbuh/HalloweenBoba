import GameObject from "./GameObject.js";
import Randomizer from "./Randomizer.js";

class Shooter {
  timersMap: Map<number, number> = new Map(); private _accel: number;
  public get accel(): number {
      return this._accel;
  }

  constructor(accel: number) {
    this._accel = accel;
    // console.log(`shooter created with ${this.accel}`);
  }

  
  shootForward(obj: GameObject) {
    const angle = this.degToRad(Randomizer.randInt(55, 80));
    const v0Y = obj.speedY;
    const v0X = obj.speedX;
    let t = 0;
    let x0 = obj.x;
    let y0 = obj.y;
    let g = this._accel;
    
    let timerId = setInterval(function move() {
      obj.y = y0 - (v0Y * Math.sin(angle) * t - g / 2 * t * t);
      obj.x = x0 + v0X * Math.cos(angle) * t;
      t++;
    }, 20);
    this.timersMap.set(obj.id, timerId);
  }

  shootBackward(obj: GameObject) {
    const angle = this.degToRad(Randomizer.randInt(55, 80));
    const v0X = obj.speedX;
    const v0Y = obj.speedY;
    let t = 0;
    let x0 = obj.x;
    let y0 = obj.y;
    let g = this._accel;
    let timerId = setInterval(function move() {
      obj.y = y0 - (v0Y * Math.sin(angle) * t - g / 2 * t * t);
      obj.x = x0 - v0X * Math.cos(angle) * t;
      t++;
    }, 20);
    this.timersMap.set(obj.id, timerId);
  }

  stopShoot(id: number) {
    clearTimeout(this.timersMap.get(id));
    this.timersMap.delete(id);
  }

  pauseAllShoots() {
    for(let t of this.timersMap) {
      this.stopShoot(t[0]);
    }
  }


  degToRad(deg: number): number {
    return deg * (Math.PI / 180);
  }

}

export default Shooter;
