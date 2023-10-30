import GameObject from "./GameObject";

export default interface Factory {
  create():GameObject;
}
