class DomView {
    constructor(elem) {
        this.element = elem;
    }
    moveOnX(x) {
        this.element.style.left = `${x}px`;
    }
    moveOnY(y) {
        this.element.style.left = `${y}px`;
    }
}
export default DomView;
