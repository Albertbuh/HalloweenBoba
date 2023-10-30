class ElementsPainter {
    constructor(canvas) {
        this.canvas = canvas;
    }
    drawElement(element) {
        let img = document.createElement("img");
        img.classList.add("absolute");
        img.style.top = this.getPixelsFromNumber(element.x);
        img.style.left = this.getPixelsFromNumber(element.y);
        img.style.width = this.getPixelsFromNumber(element.width);
        img.style.height = this.getPixelsFromNumber(element.height);
        if (element.imageUrl)
            img.setAttribute("src", element.imageUrl);
        else
            img.style.backgroundColor = "black";
        if (this.canvas)
            this.canvas.append(img);
        return img;
    }
    getPixelsFromNumber(num) {
        return `${num}px`;
    }
}
export { ElementsPainter };
