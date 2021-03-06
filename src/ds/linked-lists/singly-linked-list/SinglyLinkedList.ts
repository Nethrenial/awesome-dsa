import { LinkedList } from "../abstracts/LinkedList";
import { LLNode } from "../abstracts/LLNode";

/**
 * SLLNode, implements {@link LLNode}
 * @extends LLNode
 * @template T
 * @param {T} value
 */
class SLLNode<T> implements LLNode<T> {
  public value: T;
  public next: SLLNode<T> | null;
  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

/**
 * A linked list that has nodes which only has a reference to the next node.Inherits from {@link LinkedList}
 * @extends LinkedList
 * @template T
 */
export class SinglyLinkedList<T> extends LinkedList<T, SLLNode<T>> {
  /**
   * Returns a instance of {@link SinglyLinkedList} with the values in the given list
   * @param arr array of values to create the list from
   * @example
   * ```typescript
   * const list = SinglyLinkedList.fromArray([1, 2, 3, 4]);
   * console.log(list.length); // 4
   * console.log(list.toArray()); // [1, 2, 3, 4]
   * ```
   */
  public static fromArray<T>(arr: T[]): SinglyLinkedList<T> {
    const list = new SinglyLinkedList<T>();
    arr.forEach((value) => list.insertAtEnd(value));
    return list;
  }

  /**
   * Insert the given value at the end of the list
   * @param value Value to be inserted at the end of the list
   * @example
   * ```typescript
   * const list = SinglyLinkedList.fromArray([1, 2, 3]);
   * list.insertAtEnd(4);
   * console.log(list.length); // 4
   * console.log(list.toArray()); // [1, 2, 3, 4]
   * ```
   */
  public insertAtEnd(value: T): void {
    const node = new SLLNode(value);
    if (this._head === null) {
      this._head = node;
      this._tail = node;
    } else {
      if (this._tail) this._tail.next = node;
      this._tail = node;
    }
    this._length++;
  }
  /**
   * Insert the given value at the start of the list
   * @param value value to be inserted at the start of the list
   * @example
   * ```typescript
   * const list = SinglyLinkedList.fromArray([1, 2, 3]);
   * list.insertAtStart(4);
   * console.log(list.length); // 4
   * console.log(list.toArray()); // [4, 3, 2, 1]
   * ```
   */
  public insertAtStart(value: T): void {
    const node = new SLLNode(value);
    if (this._head === null) {
      this._head = node;
      this._tail = node;
    } else {
      node.next = this._head;
      this._head = node;
    }
    this._length++;
  }

  /**
   * Insert the given value at the given index, throws an error if the index is out of bounds
   * @param index index at which the value should be inserted
   * @param value value to be inserted at the given index, should be of type {T}
   * @example
   * ```typescript
   * const list = SinglyLinkedList.fromArray([1, 2, 3]);
   * list.insertAtIndex(1, 4);
   * console.log(list.length); // 4
   * console.log(list.toArray()); // [1, 4, 2, 3]
   * ```
   * @throws {@link Error} if the index is out of bounds
   * @example
   * ```typescript
   * const list = new SinglyLinkedList<number>();
   * list.insertAtIndex(1, 1); // throws an error
   * ```
   */
  public insertAtIndex(index: number, value: T): void {
    if (index < 0 || index > this._length) {
      throw new Error("Index out of bounds");
    }
    if (index === 0) {
      this.insertAtStart(value);
    } else if (index === this._length) {
      this.insertAtEnd(value);
    } else {
      const node = new SLLNode(value);
      let current = this._head;
      let previous = this._head;
      for (let i = 0; i < index; i++) {
        previous = current;
        if (current) current = current.next;
      }
      if (previous) previous.next = node;
      node.next = current;
      this._length++;
    }
  }
  /**
   * Insert the given value after the given target value, throws an error if the target value is not found
   * @param target The value to be searched for in the list to insert the value after it
   * @param value The value to be inserted after the target value
   * @example
   * ```typescript
   * const list = SinglyLinkedList.fromArray([1, 2, 3]);
   * list.insertAfter(2, 4);
   * console.log(list.length); // 4
   * console.log(list.toArray()); // [1, 2, 4, 3]
   * ```
   * @throws {@link Error} if the target value is not found
   * @example
   * ```typescript
   * const list = new SinglyLinkedList<number>();
   * list.insertAfter(1, 1); // throws an error
   * ```
   */
  public insertAfter(target: T, value: T): void {
    if (this._head === null) {
      throw new Error("List is empty");
    }
    let current = this._head;
    while (current.value !== target && current.next !== null) {
      current = current.next;
    }
    if (current.value !== target) {
      throw new Error("Target not found");
    }
    const node = new SLLNode(value);
    node.next = current.next;
    current.next = node;
    this._length++;
  }

  /**
   * Insert the given value before the given target value, throws an error if the target value is not found
   * @param target The value to be searched for in the list to insert the value before it
   * @param value The value to be inserted before the target value
   * @example
   * ```typescript
   * const list = SinglyLinkedList.fromArray([1, 2, 3]);
   * list.insertBefore(2, 4);
   * console.log(list.length); // 4
   * console.log(list.toArray()); // [1, 4, 2, 3]
   * ```
   * @throws {@link Error} if the target value is not found
   * @example
   * ```typescript
   * const list = new SinglyLinkedList<number>();
   * list.insertBefore(1, 1); // throws an error
   * ```
   */
  public insertBefore(target: T, value: T): void {
    if (this._head === null) {
      throw new Error("List is empty");
    }
    let current = this._head;
    let previous = this._head;
    while (current.value !== target && current.next !== null) {
      previous = current;
      current = current.next;
    }
    if (current.value !== target) {
      throw new Error("Target not found");
    }
    const node = new SLLNode(value);
    previous.next = node;
    node.next = current;
    this._length++;
  }

  /**
   * delete the first node from the list and return its value
   * @example
   * ```typescript
   * const list = SinglyLinkedList.fromArray([1, 2, 3]);
   * console.log(list.deleteFromStart()); // 1
   * console.log(list.length); // 2
   * console.log(list.toArray()); // [2, 3]
   * ```
   * @throws {@link Error} if the list is empty
   * @example
   * ```typescript
   * const list = new SinglyLinkedList<number>();
   * list.deleteFromStart(); // throws an error
   * ```
   */

  public deleteFromStart(): T {
    if (this._head === null) {
      throw new Error("List is empty");
    }
    const value = this._head.value;
    this._head = this._head.next;
    this._length--;
    return value;
  }
  /**
   * Delete the last node from the list and return its value
   * @example
   * ```typescript
   * const list = SinglyLinkedList.fromArray([1, 2, 3]);
   * console.log(list.deleteFromEnd()); // 3
   * console.log(list.length); // 2
   * console.log(list.toArray()); // [1, 2]
   * ```
   * @throws {@link Error} if the list is empty
   * @example
   * ```typescript
   * const list = new SinglyLinkedList<number>();
   * list.deleteFromEnd(); // throws an error
   * ```
   */
  public deleteFromEnd(): T {
    if (this._head === null) {
      throw new Error("List is empty");
    }
    if (this._head === this._tail) {
      const value = this._head.value;
      this._head = null;
      this._tail = null;
      this._length--;
      return value;
    }
    let current = this._head;
    let previous = this._head;
    while (current.next !== null) {
      previous = current;
      current = current.next;
    }
    const value = current.value;
    previous.next = null;
    this._tail = previous;
    this._length--;
    return value;
  }

  /**
   * Delete the node at the given index and return its value
   * @param index The index of the node to be deleted
   * @example
   * ```typescript
   * const list = SinglyLinkedList.fromArray([1, 2, 3]);
   * console.log(list.deleteAtIndex(1)); // 2
   * console.log(list.length); // 2
   * console.log(list.toArray()); // [1, 3]
   * ```
   * @throws {@link Error} if the index is out of bounds
   * @example
   * ```typescript
   * const list = new SinglyLinkedList<number>();
   * list.deleteAtIndex(1); // throws an error
   * ```
   */
  public deleteAtIndex(index: number): T {
    if (index < 0 || index >= this._length) {
      throw new Error("Index out of bounds");
    }
    if (index === 0) {
      return this.deleteFromStart();
    } else if (index === this._length - 1) {
      return this.deleteFromEnd();
    } else {
      let current = this._head;
      let previous = this._head;
      for (let i = 0; i < index; i++) {
        previous = current;
        if (current) current = current.next;
      }
      const value = current?.value;
      (previous as SLLNode<T>).next = (current as SLLNode<T>).next;
      this._length--;
      return value as T;
    }
  }

  /**
   * Delete the node before the given target value and return its value
   * @param target The value to be searched for in the list to delete the node before it
   * @example
   * ```typescript
   * const list = SinglyLinkedList.fromArray([1, 2, 3]);
   * list.insertBefore(2, 4);
   * console.log(list.deleteBefore(2)); // 1
   * console.log(list.length); // 3
   * console.log(list.toArray()); // [2, 4, 3]
   * ```
   * @throws {@link Error} if the target value is not found
   * @example
   * ```typescript
   * const list = new SinglyLinkedList<number>();
   * list.deleteBefore(1); // throws an error
   * ```
   */
  public deleteBefore(target: T): T {
    if (this._head === null) {
      throw new Error("List is empty");
    }
    if (this._head.value === target) {
      throw new Error("Target is head");
    }

    if (this._head.next?.value === target) {
      return this.deleteFromStart();
    }

    let previous = this._head;
    let current = this._head;
    let next = this._head.next;
    while (next?.value !== target && next?.next !== null) {
      previous = current;
      current = next as SLLNode<T>;
      next = next?.next as SLLNode<T> | null;
    }
    if (next?.value !== target) {
      throw new Error("Target not found");
    }
    const value = current.value;
    previous.next = next;
    this._length--;
    return value;
  }

  /**
   * Delete the node after the given target value and return its value
   * @param target The value to be searched for in the list to delete the node after it
   * @example
   * ```typescript
   * const list = SinglyLinkedList.fromArray([1, 2, 3]);
   * list.insertAfter(2, 4);
   * console.log(list.deleteAfter(2)); // 3
   * console.log(list.length); // 3
   * console.log(list.toArray()); // [1, 2, 4]
   * ```
   * @throws {@link Error} if the target value is not found
   * @example
   * ```typescript
   * const list = new SinglyLinkedList<number>();
   * list.deleteAfter(1); // throws an error
   * ```
   */
  public deleteAfter(target: T): T {
    if (this._head === null) {
      throw new Error("List is empty");
    }
    if (this._tail?.value === target) {
      throw new Error("Target is tail");
    }
    let current = this._head;
    while (current.value !== target && current.next?.next !== null) {
      current = current.next as SLLNode<T>;
    }
    if (current.value !== target) {
      throw new Error("Target not found");
    }
    const value = current.next?.value;
    current.next = current.next?.next as SLLNode<T>;
    this._length--;
    return value as T;
  }

  /**
   * Delete the node containing the given value and return its value
   * @param target The value to be searched for in the list to delete the node containing it
   * @example
   * ```typescript
   * const list = SinglyLinkedList.fromArray([1, 2, 3, 4]);
   * console.log(list.deleteValue(3)); // 3
   * console.log(list.length); // 3
   * console.log(list.toArray()); // [1, 2, 4]
   * ```
   * @throws {@link Error} if the target value is not found
   * @example
   * ```typescript
   * const list = new SinglyLinkedList<number>();
   * list.deleteValue(1); // throws an error
   * ```
   */
  public deleteValue(target: T): T {
    if (this._head === null) {
      throw new Error("List is empty");
    }
    if (this._head.value === target) {
      return this.deleteFromStart();
    }
    if (this._tail?.value === target) {
      return this.deleteFromEnd();
    }
    let current = this._head;
    let previous = this._head;
    while (current.value !== target && current.next !== null) {
      previous = current;
      current = current.next;
    }
    if (current.value !== target) {
      throw new Error("Target not found");
    }
    const value = current.value;
    previous.next = current.next;
    this._length--;
    return value;
  }

  /**
   * Reverse the list, this mutates the list
   * @example
   * ```typescript
   * const list = SinglyLinkedList.fromArray([1, 2, 3]);
   * list.reverse();
   * console.log(list.toArray()); // [3, 2, 1]
   * ```
   */
  public reverse(): void {
    if (this._head) {
      let current: SLLNode<T> | null = this._head;
      let previous = null;
      while (current) {
        const next: SLLNode<T> | null = current.next;
        current.next = previous;
        previous = current;
        current = next;
      }
      this._tail = this._head;
      this._head = previous;
    }
  }

  /**
   * Display the list
   * @example
   * ```typescript
   * const list = SinglyLinkedList.fromArray([1, 2, 3, 4]);
   * list.display(); // 1 2 3 4
   * ```
   */
  public display(): void {
    let current = this._head;
    while (current !== null) {
      current = current.next;
    }
  }

  /**
   * Get the list in a JS array
   * @example
   * ```typescript
   * const list = SinglyLinkedList.fromArray([1, 2, 3, 4]);
   * console.log(list.toArray()); // [1, 2, 3, 4]
   * ```
   */
  public toArray(): T[] {
    let current = this._head;
    const list: T[] = [];
    while (current !== null) {
      list.push(current.value);
      current = current.next;
    }
    return list;
  }
  /**
   * Traverse the list and apply the given function to each node
   * @param fn The function to apply to each node
   * @example
   * ```typescript
   * const list = SinglyLinkedList.fromArray([1, 2, 3, 4]);
   * cons arr: number[] = [];
   * list.forEachApply(node => {arr.push(node.value*3) });
   * console.log(arr); // [3, 6, 9, 12]
   * ```
   */
  public forEachApply(callback: (value: SLLNode<T>) => void): void {
    let current = this._head;
    while (current !== null) {
      callback(current);
      current = current.next;
    }
  }
}
