import { BaseStack } from "../abstracts/BaseStack";

/**
 * A Stack data structure that is unlimited in size.
 * @template T
 */
export class Stack<T> extends BaseStack<T> {
    constructor() {
        super();
    }
    /**
   * Returns a stack from the given array, this stack is unlimited in size
   * @param array Array to convert to a stack.
   * @example
   * ```typescript
   * const stack = Stack.fromArray([1, 2, 3]);
   * console.log(stack.pop()); // 3
   * console.log(stack.pop()); // 2
   * console.log(stack.pop()); // 1
   * ```
   * */
  public static fromArray<T>(
    arr: Array<T>
  ): Stack<T> {
      const stack = new Stack<T>();
      for (const item of arr) {
        stack.push(item);
      }
      return stack;
  }

  /**
   * Pushes an element to the stack.
   * @param item Item to be pushed into the stack.
   * @example
   * ```typescript
   * const stack = new Stack();
   * stack.push(1);
   * console.log(stack.size); // 1
   * ```
   */

  public push(item: T): void {
    this._stack.push(item);
    this._top++;
    this._size++;
  }

}
