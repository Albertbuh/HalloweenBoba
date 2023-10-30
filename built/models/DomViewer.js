class DomViewer {
    constructor(elem) {
        this.element = elem;
    }
    moveOnX(x) {
        this.element.style.left = `${x}px`;
    }
    moveOnY(y) {
        this.element.style.top = `${y}px`;
    }
    rotate(angle) {
        this.element.style.transform = `rotate(${angle}deg)`;
    }
}
export default DomViewer;
