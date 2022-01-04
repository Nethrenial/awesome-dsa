import { TestSuite, Test, expect } from "testyts";
import { Stack } from "./Stack";

//write a test suite for the stack class
@TestSuite()
export class StackTestSuite {
  @Test()
  public sizeSet(): void {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect.toBeEqual(stack.size, 3);
  }

  @Test()
  public initializationTest(): void {
    const stack = new Stack();
    expect.toBeEqual(stack.size, 0);
  }

  @Test()
  public fromArrayTest(): void {
    const stack = Stack.fromArray([1, 2, 3]);
    expect.toBeEqual(stack.size, 3);
    expect.arraysToBeEqual(stack.toArray(), [1, 2, 3]);
  }

  @Test()
  public isEmptyTest(): void {
    const stack = new Stack<number>();
    expect.toBeEqual(stack.isEmpty(), true);
  }

  @Test()
  public isNotEmptyTest(): void {
    const stack = new Stack<number>();
    stack.push(1);
    expect.toBeEqual(stack.isEmpty(), false);
  }

  @Test()
  public peekTest(): void {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect.toBeEqual(stack.peek(), 3);
  }

  @Test()
  public peekWhenEmpty(): void {
    const stack = new Stack<number>();
    expect.toBeEqual(stack.peek(), null);
  }

  @Test()
  public pushTest(): void {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    expect.toBeEqual(stack.size, 2);
    expect.arraysToBeEqual(stack.toArray(), [1, 2]);
  }

  @Test()
  public popTest(): void {
    const stack = Stack.fromArray([1, 2, 3, 4, 5]);
    expect.toBeEqual(stack.pop(), 5);
    expect.toBeEqual(stack.size, 4);
    expect.arraysToBeEqual(stack.toArray(), [1, 2, 3, 4]);
  }

  @Test()
  public popUnderflowTest(): void {
    const stack = new Stack<number>();
    expect.toThrow(() => stack.pop());
  }
}
