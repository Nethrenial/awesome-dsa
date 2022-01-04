import { TestSuite, Test, expect } from "testyts";
import { DoublyLinkedList } from "./DoublyLinkedList";

@TestSuite()
export class DoublyLinkedListTestSuite {
  @Test()
  public initializationTest(): void  {
    const list = new DoublyLinkedList<number>();
    expect.toBeEqual(list.length, 0);
    expect.arraysToBeEqual(list.toArray(), []);
  }

  @Test()
  public insertAtEndTest(): void  {
    const list = new DoublyLinkedList<number>();
    list.insertAtEnd(2);
    list.insertAtEnd(3);
    list.insertAtEnd(4);
    expect.toBeEqual(list.length, 3);
    expect.arraysToBeEqual(list.toArray(), [2, 3, 4]);
  }

  @Test()
  public insertAtStartTest(): void  {
    const list = new DoublyLinkedList<number>();
    list.insertAtStart(1);
    list.insertAtStart(2);
    list.insertAtStart(3);
    expect.toBeEqual(list.length, 3);
    expect.arraysToBeEqual(list.toArray(), [3, 2, 1]);
  }

  @Test()
  public insertAtIndexCorrectlyTest(): void  {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    list.insertAtIndex(1, 4);
    expect.toBeEqual(list.length, 4);
    expect.arraysToBeEqual(list.toArray(), [1, 4, 2, 3]);
  }

  @Test()
  public insertAtIndexIncorrectlyTest(): void  {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    expect.toThrow(() => list.insertAtIndex(4, 4));
    expect.toThrow(() => list.insertAtIndex(-1, 4));
    expect.toThrow(() => list.insertAtIndex(5, 4));
  }

  @Test()
  public insertAfterCorrectlyTest(): void  {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    list.insertAfter(2, 4);
    expect.toBeEqual(list.length, 4);
    expect.arraysToBeEqual(list.toArray(), [1, 2, 4, 3]);
  }

  @Test()
  public insertAfterIncorrectlyTest(): void  {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    expect.toThrow(() => list.insertAfter(4, 4));
    expect.toThrow(() => list.insertAfter(-1, 4));
    expect.toThrow(() => list.insertAfter(5, 4));
  }

  @Test()
  public insertBeforeCorrectlyTest(): void  {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    list.insertBefore(2, 4);
    expect.toBeEqual(list.length, 4);
    expect.arraysToBeEqual(list.toArray(), [1, 4, 2, 3]);
  }

  @Test()
  public insertBeforeIncorrectlyTest(): void  {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    expect.toThrow(() => list.insertBefore(4, 4));
    expect.toThrow(() => list.insertBefore(-1, 4));
    expect.toThrow(() => list.insertBefore(5, 4));
  }

  @Test()
  public deleteFromStartCorrectlyTest(): void  {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    expect.toBeEqual(list.deleteFromStart(), 1);
    expect.toBeEqual(list.length, 2);
    expect.arraysToBeEqual(list.toArray(), [2, 3]);
  }

  @Test()
  public deleteFromStartIncorrectlyTest(): void  {
    const list = new DoublyLinkedList<number>();
    expect.toThrow(() => list.deleteFromStart());
  }

  @Test()
  public deleteFromEndCorrectlyTest(): void  {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    expect.toBeEqual(list.deleteFromEnd(), 3);
    expect.toBeEqual(list.length, 2);
    expect.arraysToBeEqual(list.toArray(), [1, 2]);
  }

  @Test()
  public deleteFromEndIncorrectlyTest(): void  {
    const list = new DoublyLinkedList<number>();
    expect.toThrow(() => list.deleteFromEnd());
  }

  @Test()
  public deleteAtIndexCorrectlyTest(): void  {
    const list = DoublyLinkedList.fromArray([1, 2, 3, 4]);
    expect.toBeEqual(list.deleteAtIndex(2), 3);
    expect.toBeEqual(list.length, 3);
    expect.arraysToBeEqual(list.toArray(), [1, 2, 4]);
  }

  @Test()
  public deleteAtIndexIncorrectlyTest(): void  {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    expect.toThrow(() => list.deleteAtIndex(4));
    expect.toThrow(() => list.deleteAtIndex(-1));
    expect.toThrow(() => list.deleteAtIndex(5));
  }

  @Test()
  public deleteAfterCorrectlyTest(): void  {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    list.insertAfter(2, 4);
    expect.toBeEqual(list.deleteAfter(2), 4);
    expect.toBeEqual(list.length, 3);
    expect.arraysToBeEqual(list.toArray(), [1, 2, 3]);
  }

  @Test()
  public deleteAfterIncorrectlyTest(): void  {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    expect.toThrow(() => list.deleteAfter(4));
    expect.toThrow(() => list.deleteAfter(-1));
    expect.toThrow(() => list.deleteAfter(5));
  }

  @Test()
  public deleteBeforeCorrectlyTest(): void  {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    list.insertBefore(2, 4);
    expect.toBeEqual(list.deleteBefore(2), 4);
    expect.toBeEqual(list.length, 3);
    expect.arraysToBeEqual(list.toArray(), [1, 2, 3]);
  }

  @Test()
  public deleteBeforeIncorrectlyTest(): void  {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    expect.toThrow(() => list.deleteBefore(4));
    expect.toThrow(() => list.deleteBefore(-1));
    expect.toThrow(() => list.deleteBefore(5));
  }

  @Test()
  public deleteValueCorrectlyTest(): void  {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    list.insertAtEnd(4);
    list.insertAtEnd(5);
    expect.toBeEqual(list.deleteValue(3), 3);
    expect.toBeEqual(list.length, 4);
    expect.arraysToBeEqual(list.toArray(), [1, 2, 4, 5]);
  }

  @Test()
  public deleteValueIncorrectlyTest(): void  {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    list.insertAtEnd(4);
    list.insertAtEnd(5);
    expect.toThrow(() => list.deleteValue(6));
    expect.toThrow(() => list.deleteValue(-1));
    expect.toThrow(() => list.deleteValue(7));
  }

  @Test()
  public displayTest(): void  {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    list.display();
  }

  @Test()
  public displayReverseTest(): void  {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    list.display("r");
  }

  @Test()
  public toArrayTest(): void  {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    expect.arraysToBeEqual(list.toArray(), [1, 2, 3]);
  }

  @Test()
  public toArrayReverseTest(): void  {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    expect.arraysToBeEqual(list.toArray("r"), [3, 2, 1]);
  }

  @Test()
  public forEachApplyTest(): void  {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    const arr1: number[] = [];
    list.forEachApply((node) => {
      arr1.push(node.value * 2);
    });
    expect.arraysToBeEqual(arr1, [2, 4, 6]);

    const arr2: number[] = [];
    list.forEachApply((node) => {
      arr2.push(node.value * 3);
    });
    expect.arraysToBeEqual(arr2, [3, 6, 9]);
  }
  @Test()
  public forEachApplyReverseTest(): void  {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    const arr1: number[] = [];
    list.forEachApply((node) => {
      arr1.push(node.value * 2);
    }, "r");
    expect.arraysToBeEqual(arr1, [6, 4, 2]);

    const arr2: number[] = [];
    list.forEachApply((node) => {
      arr2.push(node.value * 3);
    }, "r");
    expect.arraysToBeEqual(arr2, [9, 6, 3]);
  }
}
