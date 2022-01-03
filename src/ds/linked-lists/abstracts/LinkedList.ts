import { LLNode } from "./LLNode";

export abstract class LinkedList<T, U extends LLNode<T>> {
  protected _head: U | null;
  protected _tail: U | null;
  protected _length: number;

  constructor() {
    this._head = null;
    this._tail = null;
    this._length = 0;
  }

  /**
   * Returns the length of the list
   * @example
   * ```typescript
   * const list = new SinglyLinkedList<number>();
   * list.insertAtEnd(1);
   * list.insertAtEnd(2);
   * list.insertAtEnd(3);
   * console.log(list.length); // 3
   * list.deleteFromEnd();
   * console.log(list.length); // 2
   * ```
   */
  get length(): number {
    return this._length;
  }

  /**
   * Returns the head's value of the list if the list is not empty or returns undefined
   * @example
   * ```typescript
   * const list = new SinglyLinkedList<number>();
   * list.insertAtEnd(1);
   * list.insertAtEnd(2);
   * console.log(list.head); // 1
   * list.deleteFromStart();
   * console.log(list.head); // 2
   * ```
   */
  get head(): T | undefined {
    return this._head?.value;
  }

  /**
   * Returns the tail's value of the list if the list is not empty or returns undefined
   * @example
   * ```typescript
   * const list = new SinglyLinkedList<number>();
   * list.insertAtEnd(1);
   * list.insertAtEnd(2);
   * console.log(list.tail); // 2
   * list.deleteFromEnd();
   * console.log(list.tail); // 1
   * ```
   */
  get tail(): T | undefined | null {
    return this._tail?.value;
  }

  public abstract insertAtEnd(value: T): void;
  public abstract insertAtStart(value: T): void;
  public abstract insertAtIndex(index: number, value: T): void;
  public abstract insertAfter(target: T, value: T): void;
  public abstract insertBefore(target: T, value: T): void;
  public abstract deleteFromStart(): T;
  public abstract deleteFromEnd(): T;
  public abstract deleteAtIndex(index: number): T;
  public abstract deleteBefore(target: T): T;
  public abstract deleteAfter(target: T): T;
  public abstract deleteValue(target: T): T;
  public abstract reverse(): void;
  public abstract display(): void;
  public abstract toArray(): T[];
  public abstract forEachApply(callback: (value: U) => void): void;
}
