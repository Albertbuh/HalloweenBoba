class DomAppender {
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
        this.elementsMap.set(obj.id, img);
        obj.setView(img);
    }
    static removeElement(id) {
        this.elementsMap.get(id).remove();
        this.elementsMap.delete(id);
    }
    static numToPx(num) {
        return `${num}px`;
    }
}
DomAppender.elementsMap = new Map();
export default DomAppender;
