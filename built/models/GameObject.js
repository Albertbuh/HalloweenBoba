class GameObject {
    get id() {
        return this._id;
    }
    constructor() {
        this._id = GameObject.freeId;
        console.log(`Created element with id: ${this._id}`);
        GameObject.freeId++;
    }
    checkCollision(pos) {
        return pos.x >= this.x && pos.x + pos.width <= this.x + this.width
            && pos.y >= this.y && pos.y + pos.height <= this.y + this.height;
    }
}
GameObject.freeId = 0;
export default GameObject;
