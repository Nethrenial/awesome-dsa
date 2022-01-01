export abstract class LLNode<T> {
  public value: T;
  public next: LLNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}
