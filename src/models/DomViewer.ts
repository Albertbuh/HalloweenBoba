class DomViewer {
  element: HTMLElement;
  constructor(elem: HTMLElement) {
    this.element = elem;
  }
  
  moveOnX(x:number) {
    this.element.style.left = `${x}px`;
  }
  
  moveOnY(y:number) {
    this.element.style.top = `${y}px`;
  }

  rotate(angle: number) {
    this.element.style.transform = `rotate(${angle}deg)`;
  }
}

export default DomViewer;
