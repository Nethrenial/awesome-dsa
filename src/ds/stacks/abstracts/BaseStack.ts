/**
 * Base class for all stacks.
 * @template T
 */
export class BaseStack<T = number> {
  protected _stack: Array<T | null>;
  protected _size: number;
  protected _top: number;

  constructor() {
    this._stack = [];
    this._size = 0;
    this._top = -1;
  }

  /**
   * Returns the current filled size of the stack.
   * @example
   * ```typescript
   * stack.push(1); // stack is an instance of a class inheriting from BaseStack
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
   * Returns true if the stack is empty, false otherwise.
   * @example
   * ```typescript
   * console.log(stack.isEmpty()); // true // stack is an instance of a class inheriting from BaseStack
   * stack.push(1);
   * console.log(stack.isEmpty()); // false
   * ```
   */
  public isEmpty(): boolean {
    return this._top === -1;
  }

  /**
   * Pops the last element from the stack and returns it.
   * @example
   * ```typescript
   * stack.push(1); // stack is an instance of a class inheriting from BaseStack
   * stack.push(2);
   * console.log(stack.pop()); // 2
   * ```
   * @throws Throws an error if the stack is empty.
   * @example
   * ```typescript
   * console.log(stack.size); // 0 // stack is an instance of a class inheriting from BaseStack
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
   * stack.push(1); // stack is an instance of a class inheriting from BaseStack
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
   * stack.push(1); // stack is an instance of a class inheriting from BaseStack
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
   * stack.push(1); // stack is an instance of a class inheriting from BaseStack
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
