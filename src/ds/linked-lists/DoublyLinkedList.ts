import { LinkedList } from "./LinkedList";
import { LLNode } from "./LLNode";

class DLLNode<T> extends LLNode<T> {
  public prev: DLLNode<T> | null;
  constructor(value: T) {
    super(value);
    this.prev = null;
  }
}

export class DoublyLinkedList<T> extends LinkedList<T, DLLNode<T>> {
  constructor() {
    super();
  }
  public getList(): T[] {
    const list: T[] = [];
    let currentNode = this._head;
    while (currentNode) {
      list.push(currentNode.value);
      currentNode = currentNode.next as DLLNode<T>;
    }
    return list;
  }

  /**
   * Traverse the list and apply the given function to each node
   * @param fn The function to apply to each node
   * @example
   * ```typescript
   * const list = new DoublyLinkedList<number>();
   * list.insertAtEnd(1);
   * list.insertAtEnd(2);
   * list.insertAtEnd(3);
   * list.insertAtEnd(4);
   * cons arr: number[] = [];
   * list.traverse(node => {arr.push(node.value*3) });
   * console.log(arr); // [3, 6, 9, 12]
   * ```
   */
  public traverseAndApply(callback: (value: DLLNode<T>) => void) {
    let currentNode = this._head;
    while (currentNode) {
      callback(currentNode);
      currentNode = currentNode.next as DLLNode<T>;
    }
  }
}
