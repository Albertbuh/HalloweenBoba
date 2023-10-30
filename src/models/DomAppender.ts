import GameObject from "./GameObject.js";

class DomAppender {
  static elementsMap: Map<number, HTMLElement> = new Map();

  static addImage(obj: GameObject, parent: HTMLElement|null) {
    let img = document.createElement("img");
    img.style.position = "absolute";
    img.style.left = this.numToPx(obj.x);
    img.style.top = this.numToPx(obj.y);
    img.style.width = this.numToPx(obj.width);
    img.style.height = this.numToPx(obj.height);
    img.setAttribute("id", `${obj.id}`);
    img.setAttribute("src", `${obj.imageUrl}`);

    if(!parent)
      parent = document.body;
    parent.append(img);

    this.elementsMap.set(obj.id, img);
    obj.setView(img);
  }

  static removeElement(id:number) {
    this.elementsMap.get(id).remove();
    this.elementsMap.delete(id);
  }



  static numToPx(num: number) {
    return `${num}px`;
  }
}

export default DomAppender;
