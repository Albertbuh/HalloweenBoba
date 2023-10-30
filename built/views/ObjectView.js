import { ElementsPainter } from "../models/Paint.js";
class Viewer {
    constructor(painter = null) {
        this.painter = painter;
        this.viewMap = new Map();
        if (!painter)
            this.painter = new ElementsPainter(document.body);
        console.log(this.painter.canvas);
    }
    createView(element) {
        if (!this.viewMap.has(element)) {
            return this.painter.drawElement(element);
            // this.viewMap.set(element, domEl);
            console.log("new element created " + element);
        }
    }
    moveView(element, byX = 0, byY = 0) {
        element.x += byX;
        element.y += byY;
        console.log(element.x);
        let view = this.viewMap.get(element);
        view.style.top = this.painter.getPixelsFromNumber(element.x);
        view.style.left = this.painter.getPixelsFromNumber(element.y);
    }
}
export { Viewer };
