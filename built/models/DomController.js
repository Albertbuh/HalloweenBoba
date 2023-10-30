class DomController {
    static addImage(obj, parent) {
        let img = document.createElement("img");
        img.style.position = "absolute";
        img.style.left = this.numToPx(obj.x);
        img.style.top = this.numToPx(obj.y);
        img.style.width = this.numToPx(obj.width);
        img.style.height = this.numToPx(obj.height);
        img.setAttribute("id", `${obj.id}`);
        img.setAttribute("src", `${obj.imageUrl}`);
        if (!parent)
            parent = document.body;
        parent.append(img);
        this.elementsMap.set(obj, img);
        obj.setView(img);
    }
    static moveImageX(view, x) {
        view.style.left = this.numToPx(x);
    }
    static moveImageY(view, y) {
        view.style.top = this.numToPx(y);
    }
    static numToPx(num) {
        return `${num}px`;
    }
}
DomController.elementsMap = new Map();
export default DomController;
