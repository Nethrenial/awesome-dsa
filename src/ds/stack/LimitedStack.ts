/**
 * Stack data structure.
 * @template T
 */
export class LimitedStack<T = number> {
  private _stack: Array<T | null>;
  private _size: number;
  private _max: number;
  private _top: number;

  constructor(capacity: number) {
    this._stack = [];
    this._size = 0;
    this._max = capacity;
    this._top = -1;
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
   * Returns the current filled size of the stack.
   * @example
   * ```typescript
   * const stack = new LimitedStack(5);
   * stack.push(1);
   * stack.push(2);
   * stack.push(3);
   * stack.push(4);
   * console.log(stack.size); // 4
   * ```
   */
  get size(): number {
    return this._size;
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
   * Returns true if the stack is empty, false otherwise.
   * @example
   * ```typescript
   * const stack = new LimitedStack(5);
   * console.log(stack.isEmpty()); // true
   * stack.push(1);
   * console.log(stack.isEmpty()); // false
   * ```
   */
  public isEmpty(): boolean {
    return this._top === -1;
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

  /**
   * Pops the last element from the stack and returns it.
   * @example
   * ```typescript
   * const stack = new LimitedStack<number>(10);
   * stack.push(1);
   * stack.push(2);
   * console.log(stack.pop()); // 2
   * ```
   * @throws Throws an error if the stack is empty.
   * @example
   * ```typescript
   * const stack = new LimitedStack<number>(10);
   * stack.pop(); // throws Error: Stack Underflow!
   * ```
   */
  public pop(): T {
    if (this.isEmpty()) {
      throw new Error("Stack Underflow!");
    }
    const item = this._stack[this._top];
    this._stack[this._top] = null;
    this._top--;
    this._size--;
    return item as T;
  }

  /**
   * Returns the last element from the stack without removing it, returns null if the stack is empty.
   * @example
   * ```typescript
   * const stack = new LimitedStack<number>(10);
   * stack.push(1);
   * stack.push(2);
   * console.log(stack.peek()); // 2
   * stack.pop();
   * stack.pop();
   * console.log(stack.peek()); // null
   * ```
   */
  public peek(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    return this._stack[this._top];
  }

  /**
   * Returns the available elements in stack as an array.
   * @example
   * ```typescript
   * const stack = new LimitedStack<number>(10);
   * stack.push(1);
   * stack.push(2);
   * console.log(stack.toArray()); // [1, 2]
   * ```
   * */
  public toArray(): Array<T | null> {
    return this._stack.slice(0, this._top + 1);
  }

  /**
   * Clears the stack.
   * @example
   * ```typescript
   * const stack = new LimitedStack<number>(10);
   * stack.push(1);
   * stack.push(2);
   * stack.clear();
   * console.log(stack.toArray()); // []
   * ```
   */
  public clear(): void {
    this._stack = [];
    this._top = -1;
    this._size = 0;
  }
}
