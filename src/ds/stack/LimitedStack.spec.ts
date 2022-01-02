import { TestSuite, Test, expect } from "testyts";
import { LimitedStack } from "./LimitedStack";

//write a test suite for the limited stack class
@TestSuite()
export class LimitedStackTestSuite {
  @Test()
  public initializationTest() {
    const stack = new LimitedStack<number>(5);
    expect.toBeEqual(stack.size, 0);
    expect.toBeEqual(stack.max, 5);
  }

  @Test()
  public fromArrayTest() {
    const stack = LimitedStack.fromArray([1, 2, 3]);
    expect.toBeEqual(stack.size, 3);
    expect.arraysToBeEqual(stack.toArray(), [1, 2, 3]);
  }

  @Test()
  public fromArrayOverflowTest() {
    expect.toThrow(() => LimitedStack.fromArray([1, 2, 3, 4, 5, 6], 3));
  }

  @Test()
  public sizeSet() {
    const stack = new LimitedStack<number>(5);
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect.toBeEqual(stack.size, 3);
  }

  @Test()
  public maxTest() {
    const stack = new LimitedStack<number>(5);
    expect.toBeEqual(stack.max, 5);
  }

  @Test()
  public isEmptyTest() {
    const stack = new LimitedStack<number>(5);
    expect.toBeEqual(stack.isEmpty(), true);
  }

  @Test()
  public isNotEmptyTest() {
    const stack = new LimitedStack<number>(5);
    stack.push(1);
    expect.toBeEqual(stack.isEmpty(), false);
  }
  @Test()
  public isFullTest() {
    const stack = new LimitedStack<number>(5);
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.push(4);
    stack.push(5);
    expect.toBeEqual(stack.isFull(), true);
  }
  @Test()
  public isNotFullTest() {
    const stack = new LimitedStack<number>(5);
    expect.toBeEqual(stack.isFull(), false);
  }

  @Test()
  public peekTest() {
    const stack = new LimitedStack<number>(5);
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect.toBeEqual(stack.peek(), 3);
  }

  @Test()
  public peekWhenEmpty() {
    const stack = new LimitedStack<number>(5);
    expect.toBeEqual(stack.peek(), null);
  }

  @Test()
  public pushTest() {
    const stack = new LimitedStack<number>(5);
    stack.push(1);
    stack.push(2);
    expect.toBeEqual(stack.size, 2);
    expect.arraysToBeEqual(stack.toArray(), [1, 2]);
  }

  @Test()
  public pushOverflowTest() {
    const stack = new LimitedStack<number>(5);
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.push(4);
    stack.push(5);
    expect.toThrow(() => stack.push(6));
  }

  @Test()
  public popTest() {
    const stack = new LimitedStack<number>(5);
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.push(4);
    stack.push(5);
    expect.arraysToBeEqual(stack.toArray(), [1, 2, 3, 4, 5]);
    expect.toBeEqual(stack.pop(), 5);
    expect.toBeEqual(stack.size, 4);
    expect.arraysToBeEqual(stack.toArray(), [1, 2, 3, 4]);
  }

  @Test()
  public popUnderflowTest() {
    const stack = new LimitedStack<number>(5);
    expect.toThrow(() => stack.pop());
  }
}
