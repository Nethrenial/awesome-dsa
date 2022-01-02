import { LinkedList } from "./abstracts/LinkedList";
import { LLNode } from "./abstracts/LLNode";

class DLLNode<T> implements LLNode<T> {
  public value: T;
  public next: DLLNode<T> | null;
  public prev: DLLNode<T> | null;
  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

/**
 * Doubly Linked List, inherits from {@link LinkedList}
 */
export class DoublyLinkedList<T> extends LinkedList<T, DLLNode<T>> {
  constructor() {
    super();
  }
  /**
   * Returns a instance of {@link DoublyLinkedList} with the values in the given list
   * @param arr array of values to create the list from
   * @example
   * ```typescript
   * const list = DoublyLinkedList.fromArray([1, 2, 3, 4]);
   * console.log(list.length); // 4
   * console.log(list.getList()); // [1, 2, 3, 4]
   * ```
   */
  public static fromArray<T>(arr: T[]): DoublyLinkedList<T> {
    const list = new DoublyLinkedList<T>();
    arr.forEach((value) => list.insertAtEnd(value));
    return list;
  }

  /**
   * Insert the given value at the end of the list
   * @param value Value to be inserted at the end of the list
   * @example
   * ```typescript
   * const list = DoublyLinkedList.fromArray([1, 2, 3]);
   * list.insertAtEnd(4);
   * console.log(list.length); // 4
   * console.log(list.getList()); // [1, 2, 3, 4]
   * ```
   */
  public insertAtEnd(value: T): void {
    const node = new DLLNode(value);
    if (this._head === null || this._tail === null) {
      this._head = node;
      this._tail = node;
      this._tail.prev = this._head;
    } else {
      this._tail.next = node;
      node.prev = this._tail;
      this._tail = node;
    }
    this._length++;
  }
  /**
   * Insert the given value at the start of the list
   * @param value value to be inserted at the start of the list
   * @example
   * ```typescript
   * const list = DoublyLinkedList.fromArray([1, 2, 3]);
   * list.insertAtStart(4);
   * console.log(list.length); // 4
   * console.log(list.getList()); // [4, 3, 2, 1]
   * ```
   */
  public insertAtStart(value: T): void {
    const node = new DLLNode(value);
    if (this._head === null || this._tail === null) {
      this._head = node;
      this._tail = node;
      this._tail.prev = this._head;
    } else {
      node.next = this._head;
      this._head.prev = node;
      this._head = node;
    }
    this._length++;
  }

  /**
   * Insert the given value at the given index, throws an error if the index is out of bounds
   * @param index index at which the value should be inserted
   * @param value value to be inserted at the given index
   * @example
   * ```typescript
   * const list = DoublyLinkedList.fromArray([1, 2, 3]);
   * list.insertAtIndex(1, 4);
   * console.log(list.length); // 4
   * console.log(list.getList()); // [1, 4, 2, 3]
   * ```
   * @throws {@link Error} if the index is out of bounds
   * @example
   * ```typescript
   * const list = new DoublyLinkedList<number>();
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
      let current = this._head;
      for (let i = 0; i < index - 1; i++) {
        if (current) current = current.next;
      }
      const node = new DLLNode(value);
      if (current) {
        node.next = current.next;
        node.prev = current;
        current.next = node;
        this._length++;
      }
    }
  }
  /**
   * Insert the given value after the given target value, throws an error if the target value is not found
   * @param target The value to be searched for in the list to insert the value after it
   * @param value The value to be inserted after the target value
   * @example
   * ```typescript
   * const list = DoublyLinkedList.fromArray([1, 2, 3]);
   * list.insertAfter(2, 4);
   * console.log(list.length); // 4
   * console.log(list.getList()); // [1, 2, 4, 3]
   * ```
   * @throws {@link Error} if the target value is not found
   * @example
   * ```typescript
   * const list = new DoublyLinkedList<number>();
   * list.insertAfter(1, 1); // throws an error
   * ```
   * @throws {@link Error} if list is empty
   * @example
   * ```typescript
   * const list = new DoublyLinkedList<number>();
   * list.insertAfter(3); // throws an error
   * ```
   */
  public insertAfter(target: T, value: T): void {
    if (this._head === null || this._tail === null) {
      throw new Error("List is empty");
    }
    if (this._tail.value === target) {
      this.insertAtEnd(value);
      return;
    }
    let current: DLLNode<T> | null = this._head;
    while (current) {
      if (current.value === target) {
        const node = new DLLNode(value);
        node.next = current.next;
        if (current.next) current.next.prev = node;
        node.prev = current;
        current.next = node;
        this._length++;
        return;
      }
      current = current.next;
    }
    throw new Error("Target value not found");
  }

  /**
   * Insert the given value before the given target value, throws an error if the target value is not found
   * @param target The value to be searched for in the list to insert the value before it
   * @param value The value to be inserted before the target value
   * @example
   * ```typescript
   * const list = DoublyLinkedList.fromArray([1, 2, 3]);
   * list.insertBefore(2, 4);
   * console.log(list.length); // 4
   * console.log(list.getList()); // [1, 4, 2, 3]
   * ```
   * @throws {@link Error} if the target value is not found
   * @example
   * ```typescript
   * const list = new DoublyLinkedList<number>();
   * list.insertBefore(1, 1); // throws an error
   * ```
   */
  public insertBefore(target: T, value: T): void {
    if (this._head === null || this._tail === null) {
      throw new Error("List is empty");
    }
    if (this._head.value === target) {
      this.insertAtStart(value);
      return;
    }
    let current: DLLNode<T> | null = this._head;
    while (current) {
      if (current.value === target) {
        const node = new DLLNode(value);
        node.next = current;
        node.prev = current.prev as DLLNode<T>;
        node.prev.next = node;
        current.prev = node;
        this._length++;
        return;
      }
      current = current.next;
    }
    throw new Error("Target value not found");
  }

  /**
   * delete the first node from the list and return its value
   * @example
   * ```typescript
   * const list = DoublyLinkedList.fromArray([1, 2, 3]);
   * console.log(list.deleteFromStart()); // 1
   * console.log(list.length); // 2
   * console.log(list.getList()); // [2, 3]
   * ```
   * @throws {@link Error} if the list is empty
   * @example
   * ```typescript
   * const list = new DoublyLinkedList<number>();
   * list.deleteFromStart(); // throws an error
   * ```
   */

  public deleteFromStart(): T {
    if (this._head === null) {
      throw new Error("List is empty");
    }
    if (this._length === 1) {
      const value = this._head.value;
      this._head = null;
      this._tail = null;
      this._length--;
      return value;
    } else {
      const value = this._head.value;
      this._head = this._head.next as DLLNode<T>;
      this._head.prev = null;
      this._length--;
      return value;
    }
  }
  /**
   * Delete the last node from the list and return its value
   * @example
   * ```typescript
   * const list = DoublyLinkedList.fromArray([1, 2, 3]);
   * console.log(list.deleteFromEnd()); // 3
   * console.log(list.length); // 2
   * console.log(list.getList()); // [1, 2]
   * ```
   * @throws {@link Error} if the list is empty
   * @example
   * ```typescript
   * const list = new DoublyLinkedList<number>();
   * list.deleteFromEnd(); // throws an error
   * ```
   */
  public deleteFromEnd(): T {
    if (this._tail === null) {
      throw new Error("List is empty");
    }
    if (this._length === 1) {
      const value = this._tail.value;
      this._head = null;
      this._tail = null;
      this._length--;
      return value;
    } else {
      const value = this._tail.value;
      this._tail = this._tail.prev as DLLNode<T>;
      this._tail.next = null;
      this._length--;
      return value;
    }
  }

  /**
   * Delete the node at the given index and return its value
   * @param index The index of the node to be deleted
   * @example
   * ```typescript
   * const list = DoublyLinkedList.fromArray([1, 2, 3]);
   * console.log(list.deleteAtIndex(1)); // 2
   * console.log(list.length); // 2
   * console.log(list.getList()); // [1, 3]
   * ```
   * @throws {@link Error} if the index is out of bounds
   * @example
   * ```typescript
   * const list = new DoublyLinkedList<number>();
   * list.deleteAtIndex(1); // throws an error
   * ```
   * @throws {@link Error} if list is empty
   * @example
   * ```typescript
   * const list = new DoublyLinkedList<number>();
   * list.deleteAfter(3); // throws an error
   * ```
   */
  public deleteAtIndex(index: number): T {
    if (!this._head || !this._tail) {
      throw new Error("List is empty");
    }
    if (index < 0 || index >= this._length) {
      throw new Error("Index out of bounds");
    }
    if (index === 0) {
      return this.deleteFromStart();
    }
    if (index === this._length - 1) {
      return this.deleteFromEnd();
    }

    if (index == 1) {
      const value = this._head.next?.value;
      if (this._head.next?.next) this._head.next.next.prev = this._head;
      if (this._head.next) this._head.next = this._head.next.next;
      this._length--;
      return value as T;
    }

    let current: DLLNode<T> | null = this._head;
    let i = 0;
    while (i < index) {
      if (current) current = current.next;
      i++;
    }
    const value = current?.value as T;
    if (current && current.prev && current.next) {
      current.prev.next = current.next;
      current.next.prev = current.prev;
      this._length--;
    }
    return value;
  }

  /**
   * Delete the node before the given target value and return its value
   * @param target The value to be searched for in the list to delete the node before it
   * @example
   * ```typescript
   * const list = DoublyLinkedList.fromArray([1, 2, 3]);
   * list.insertBefore(2, 4);
   * console.log(list.deleteBefore(2)); // 1
   * console.log(list.length); // 3
   * console.log(list.getList()); // [2, 4, 3]
   * ```
   * @throws {@link Error} if the target value is not found
   * @example
   * ```typescript
   * const list = new DoublyLinkedList<number>();
   * list.deleteBefore(1); // throws an error
   * ```
   * @throws {@link Error} if list is empty
   * @example
   * ```typescript
   * const list = new DoublyLinkedList<number>();
   * list.deleteBefore(3); // throws an error
   * ```
   */
  public deleteBefore(target: T): T {
    if (this._head === null || this._tail === null) {
      throw new Error("List is empty");
    }
    if (this._head.value === target) {
      throw new Error("Can't delete before the first node");
    }
    if (this._head.next?.value === target) {
      return this.deleteFromStart();
    }
    let current: DLLNode<T> | null = this._head;
    while (current) {
      if (current.value === target) {
        if (current && current.prev) {
          const value = current.prev.value;
          if (current.prev.prev) current.prev.prev.next = current;
          current.prev = current.prev.prev;
          this._length--;
          return value;
        }
      }
      current = current.next;
    }
    throw new Error("Target value not found");
  }

  /**
   * Delete the node after the given target value and return its value
   * @param target The value to be searched for in the list to delete the node after it
   * @example
   * ```typescript
   * const list = DoublyLinkedList.fromArray([1, 2, 3]);
   * list.insertAfter(2, 4);
   * console.log(list.deleteAfter(2)); // 3
   * console.log(list.length); // 3
   * console.log(list.getList()); // [1, 2, 4]
   * ```
   * @throws {@link Error} if the target value is not found
   * @example
   * ```typescript
   * const list = new DoublyLinkedList<number>();
   * list.deleteAfter(1); // throws an error
   * ```
   * @throws {@link Error} if list is empty
   * @example
   * ```typescript
   * const list = new DoublyLinkedList<number>();
   * list.deleteAfter(3); // throws an error
   * ```
   */
  public deleteAfter(target: T): T {
    if (this._head === null || this._tail === null) {
      throw new Error("List is empty");
    }
    if (this._tail.value === target) {
      throw new Error("Can't delete after the last node");
    }
    if (this._tail.prev?.value === target) {
      const val = this.deleteFromEnd();
      console.log(val);
      return val;
    }
    let current: DLLNode<T> | null = this._head;
    while (current) {
      if (current.value === target) {
        if (current && current.next) {
          const value = current.next.value;
          if (current.next.next) current.next.next.prev = current;
          current.next = current.next.next;
          this._length--;
          return value;
        }
      }
      current = current.next;
    }
    throw new Error("Target value not found");
  }

  /**
   * Delete the node containing the given value and return its value
   * @param target The value to be searched for in the list to delete the node containing it
   * @example
   * ```typescript
   * const list = DoublyLinkedList.fromArray([1, 2, 3, 4]);
   * console.log(list.deleteValue(3)); // 3
   * console.log(list.length); // 3
   * console.log(list.getList()); // [1, 2, 4]
   * ```
   * @throws {@link Error} if the target value is not found
   * @example
   * ```typescript
   * const list = new DoublyLinkedList<number>();
   * list.deleteValue(1); // throws an error
   * ```
   * @throws {@link Error} if list is empty
   * @example
   * ```typescript
   * const list = new DoublyLinkedList<number>();
   * list.deleteValue(3); // throws an error
   * ```
   */
  public deleteValue(target: T): T {
    if (this._head === null || this._tail === null) {
      throw new Error("List is empty");
    }
    if (this._head.value === target) {
      return this.deleteFromStart();
    }
    if (this._tail.value === target) {
      return this.deleteFromEnd();
    }
    let current: DLLNode<T> | null = this._head;
    while (current) {
      if (current.value === target) {
        if (current && current.prev && current.next) {
          const value = current.value;
          current.prev.next = current.next;
          current.next.prev = current.prev;
          this._length--;
          return value;
        }
      }
      current = current.next;
    }
    throw new Error("Target value not found");
  }

  /**
   * Reverse the list, this mutates the list
   * @example
   * ```typescript
   * const list = DoublyLinkedList.fromArray([1, 2, 3]);
   * list.reverse();
   * console.log(list.getList()); // [3, 2, 1]
   * ```
   */
  public reverse(): void {
    if (this._head === null || this._tail === null) {
      return;
    }
    let current: DLLNode<T> | null = this._head;
    let prev = null;
    let next = null;
    while (current) {
      next = current.next;
      current.next = prev;
      current.prev = next;
      prev = current;
      current = next;
    }
    this._tail = this._head;
    this._head = prev;
  }

  /**
   * Display the list in normal order or reverse order
   * @param mode The mode to display the list in, either `n` for normal (optional) or `r` for reverse
   * @example
   * ```typescript
   * const list = DoublyLinkedList.fromArray([1, 2, 3, 4]);
   * list.display(); // 1 2 3 4
   * list.display('n'); // 1 2 3 4
   * list.display('r'); // 4 3 2 1
   * ```
   * @throws {@link Error} if the mode is not `n` or `r`
   * @example
   * ```typescript
   * const list = DoublyLinkedList.fromArray([1, 2, 3, 4]);
   * list.display('a'); // throws an error
   * ```
   */
  public display(mode: "n" | "r" = "n"): void {
    if (mode === "n") {
      let current = this._head;
      if (!current) return;
      while (current !== null) {
        console.log(current.value);
        current = current.next;
      }
    } else if (mode === "r") {
      let current = this._tail;
      if (!current) return;
      do {
        console.log(current?.value);
        if (current === this._head) break;
        current = current.prev;
      } while (current);
    } else {
      throw new Error("Invalid mode");
    }
  }

  /**
   * Get the list in a JS array in normal order or in reverse order
   * @param mode The mode to get the list in, either `n` for normal (optional) or `r` for reverse
   * @example
   * ```typescript
   * const list = DoublyLinkedList.fromArray([1, 2, 3, 4]);
   * console.log(list.getList('n')); // [1, 2, 3, 4]
   * console.log(list.getList('r')); // [4, 3, 2, 1]
   * ```
   * @throws {@link Error} if mode is not `n` or `r`
   * @example
   * ```typescript
   * const list = DoublyLinkedList.fromArray([1, 2, 3, 4]);
   * console.log(list.getList('a')); // throws an error
   * ```
   */
  public getList(mode: "n" | "r" = "n"): T[] {
    if (this._head === null) return [];
    const list: T[] = [];
    if (mode === "n") {
      let current: DLLNode<T> | null = this._head;
      while (current !== null) {
        list.push(current.value);
        current = current.next;
      }
    } else if (mode === "r") {
      let current: DLLNode<T> | null = this._tail;
      do {
        list.push(current?.value as T);
        if (current === this._head) break;
        current = current?.prev as DLLNode<T> | null;
      } while (current);
    } else {
      throw new Error("Invalid mode");
    }
    return list;
  }

  /**
   * Traverse the list and apply the given function to each node in normal order or reverse order
   * @param fn The function to apply to each node
   * @param mode The mode to traverse the list in, either `n` for normal (optional) or `r` for reverse
   * @example
   * ```typescript
   * const list = DoublyLinkedList.fromArray([1, 2, 3, 4]);
   * cons arr: number[] = [];
   * list.forEachApply(node => {arr.push(node.value*3) });
   * console.log(arr); // [3, 6, 9, 12]
   * list.forEachApply(node => {arr.push(node.value*3) }, 'r');
   * console.log(arr); // [12, 9, 6, 3]
   * ```
   * @throws {@link Error} if mode is not `n` or `r`
   * @example
   * ```typescript
   * const list = DoublyLinkedList.fromArray([1, 2, 3, 4]);
   */
  public forEachApply(
    callback: (value: DLLNode<T>) => void,
    mode: "r" | "n" = "n"
  ): void {
    if (this._head) {
      if (mode === "n") {
        let current: DLLNode<T> | null = this._head;
        while (current !== null) {
          callback(current);
          current = current.next;
        }
      } else if (mode === "r") {
        let current: DLLNode<T> | null = this._tail;
        do {
          callback(current as DLLNode<T>);
          if (current === this._head) break;
          current = current?.prev as DLLNode<T> | null;
        } while (current);
      } else {
        throw new Error("Invalid mode");
      }
    }
  }
}
