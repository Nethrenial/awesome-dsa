class SllNode<T> {
  public value: T;
  public next: SllNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class SinglyLinkedList<T> {
  private _head: SllNode<T> | null;
  private _tail: SllNode<T> | null;
  private _length: number;

  constructor() {
    this._head = null;
    this._tail = null;
    this._length = 0;
  }

  get length(): number {
    return this._length;
  }

  get head(): SllNode<T> | null {
    return this._head;
  }

  get tail(): SllNode<T> | null {
    return this._tail;
  }

  public insertAtEnd(value: T): void {
    const node = new SllNode(value);
    if (this._head === null) {
      this._head = node;
      this._tail = node;
    } else {
      if (this._tail) this._tail.next = node;
      this._tail = node;
    }
    this._length++;
  }
  public insertAtStart(value: T): void {
    const node = new SllNode(value);
    if (this._head === null) {
      this._head = node;
      this._tail = node;
    } else {
      node.next = this._head;
      this._head = node;
    }
    this._length++;
  }

  public insertAtIndex(index: number, value: T): void {
    if (index < 0 || index > this._length) {
      throw new Error("Index out of bounds");
    }
    if (index === 0) {
      this.insertAtStart(value);
    } else if (index === this._length) {
      this.insertAtEnd(value);
    } else {
      const node = new SllNode(value);
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
    const node = new SllNode(value);
    node.next = current.next;
    current.next = node;
    this._length++;
  }

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
    const node = new SllNode(value);
    previous.next = node;
    node.next = current;
    this._length++;
  }

  public deleteFromStart(): T {
    if (this._head === null) {
      throw new Error("List is empty");
    }
    const value = this._head.value;
    this._head = this._head.next;
    this._length--;
    return value;
  }

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
      (previous as SllNode<T>).next = (current as SllNode<T>).next;
      this._length--;
      return value as T;
    }
  }

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

  public deleteAfter(target: T): T {
    if (this._head === null) {
      throw new Error("List is empty");
    }
    if (this._tail?.value === target) {
      throw new Error("Target is tail");
    }
    let current = this._head;
    while (current.value !== target && current.next?.next !== null) {
      current = current.next as SllNode<T>;
    }
    if (current.value !== target) {
      throw new Error("Target not found");
    }
    const value = current.next?.value;
    current.next = current.next?.next as SllNode<T>;
    this._length--;
    return value as T;
  }

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

  public display(): void {
    let current = this._head;
    while (current !== null) {
      console.log(current.value);
      current = current.next;
    }
  }

  public getList(): T[] {
    let current = this._head;
    let list: T[] = [];
    while (current !== null) {
      list.push(current.value);
      current = current.next;
    }
    return list;
  }
  public traverseAndApply(callback: (value: SllNode<T>) => void): void {
    let current = this._head;
    while (current !== null) {
      callback(current);
      current = current.next;
    }
  }
}
