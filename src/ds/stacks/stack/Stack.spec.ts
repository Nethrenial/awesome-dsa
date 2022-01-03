import { TestSuite, Test, expect } from "testyts";
import { Stack } from "./Stack";

//write a test suite for the stack class
@TestSuite()
export class StackTestSuite {

  @Test()
  public sizeSet() {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect.toBeEqual(stack.size, 3);
    }

  @Test()
  public initializationTest() {
    const stack = new Stack();
    expect.toBeEqual(stack.size, 0);
  }

  @Test()
  public fromArrayTest() {
    const stack = Stack.fromArray([1, 2, 3]);
    expect.toBeEqual(stack.size, 3);
    expect.arraysToBeEqual(stack.toArray(), [1, 2, 3]);
  }

  @Test()
  public isEmptyTest() {
    const stack = new Stack<number>();
    expect.toBeEqual(stack.isEmpty(), true);
  }

  @Test()
  public isNotEmptyTest() {
    const stack = new Stack<number>();
    stack.push(1);
    expect.toBeEqual(stack.isEmpty(), false);
    }


  @Test()
  public peekTest() {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect.toBeEqual(stack.peek(), 3);
  }

  @Test()
  public peekWhenEmpty() {
    const stack = new Stack<number>();
    expect.toBeEqual(stack.peek(), null);
  }

  @Test()
  public pushTest() {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    expect.toBeEqual(stack.size, 2);
    expect.arraysToBeEqual(stack.toArray(), [1, 2]);
  }


  @Test()
  public popTest() {
    const stack = Stack.fromArray([1, 2, 3, 4 ,5]);
    expect.toBeEqual(stack.pop(), 5);
    expect.toBeEqual(stack.size, 4);
    expect.arraysToBeEqual(stack.toArray(), [1, 2, 3, 4]);
  }

  @Test()
  public popUnderflowTest() {
    const stack = new Stack<number>();
    expect.toThrow(() => stack.pop());
  }
}
