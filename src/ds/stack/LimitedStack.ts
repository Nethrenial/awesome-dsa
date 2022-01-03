import {BaseStack} from './abstracts/BaseStack'

/**
 * A Stack data structure that is limited in size.
 * @template T
 */
export class LimitedStack<T = number> extends BaseStack<T> {
  private _max: number;

  constructor(capacity: number) {
    super()
    this._max = capacity;
  }

  /**
   * Returns a stack from the given array, optionally with a max siz
   * @param array Array to convert to a stack.
   * @param capacity (optional) Maximum size of the stack.
   * @example
   * ```typescript
   * const stack = LimitedStack.fromArray([1, 2, 3]);
   * console.log(stack.pop()); // 3
   * console.log(stack.pop()); // 2
   * console.log(stack.pop()); // 1
   * ```
   * @throws if given an array with more elements than the max size specified.
   * @example
   * ```typescript
   * const stack = LimitedStack.fromArray([1, 2, 3], 2); // throws Error: Stack capacity cannot be smaller than the array size!
   * ```
   * */
  public static fromArray<T>(
    arr: Array<T>,
    capacity?: number
  ): LimitedStack<T> {
    if (capacity === undefined) {
      const stack = new LimitedStack<T>(arr.length);
      for (const item of arr) {
        stack.push(item);
      }
      return stack;
    } else if (capacity < arr.length) {
      throw new Error("Stack capacity cannot be smaller than the array size!");
    } else {
      const stack = new LimitedStack<T>(capacity);
      for (const item of arr) {
        stack.push(item);
      }
      return stack;
    }
  }

  /**
   * Returns the max allowed size of the stack.
   * @example
   * ```typescript
   * const stack = new LimitedStack(5);
   * console.log(stack.max); // 5
   * ```
   */
  get max(): number {
    return this._max;
  }


  /**
   * Returns true if the stack is full, false otherwise.
   * @example
   * ```typescript
   * const stack = new LimitedStack(3);
   * stack.push(1);
   * stack.push(2);
   * stack.push(3);
   * console.log(stack.isFull()); // true
   * stack.pop();
   * console.log(stack.isFull()); // false
   * ```
   */
  public isFull(): boolean {
    return this._top === this._max - 1;
  }

  /**
   * Pushes an element to the stack.
   * @param item Item to be pushed into the stack.
   * @example
   * ```typescript
   * const stack = new LimitedStack<number>(10);
   * stack.push(1);
   * stack.size(); // 1
   * ```
   * @throws Throws an error if the stack is full.
   * @example
   * ```typescript
   * const stack = new LimitedStack<number>(1);
   * stack.push(1);
   * stack.push(2); // throws Error: Stack Overflow!
   * ```
   */

  public push(item: T): void {
    if (this.isFull()) {
      throw new Error("Stack Overflow!");
    }
    this._stack[++this._top] = item;
    this._size++;
  }

}
