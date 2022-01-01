import { TestSuite, Test, expect } from "testyts";
import { SinglyLinkedList } from "./SinglyLinkedList";

//write a test suite for the SinglyLinkedList class
@TestSuite()
export class SinglyLinkedListTestSuite {
  @Test()
  public initializationTest() {
    const list = new SinglyLinkedList<number>();
    expect.toBeEqual(list.length, 0);
    expect.arraysToBeEqual(list.getList(), []);
  }

  @Test()
  public insertAtEndTest() {
    const list = new SinglyLinkedList<number>();
    list.insertAtEnd(1);
    list.insertAtEnd(2);
    list.insertAtEnd(3);
    expect.toBeEqual(list.length, 3);
    expect.arraysToBeEqual(list.getList(), [1, 2, 3]);
  }

  @Test()
  public insertAtStartTest() {
    const list = new SinglyLinkedList<number>();
    list.insertAtStart(1);
    list.insertAtStart(2);
    list.insertAtStart(3);
    expect.toBeEqual(list.length, 3);
    expect.arraysToBeEqual(list.getList(), [3, 2, 1]);
  }

  @Test()
  public insertAtIndexCorrectlyTest() {
    const list = new SinglyLinkedList<number>();
    list.insertAtEnd(1);
    list.insertAtEnd(2);
    list.insertAtEnd(3);
    list.insertAtIndex(1, 4);
    expect.toBeEqual(list.length, 4);
    expect.arraysToBeEqual(list.getList(), [1, 4, 2, 3]);
  }

  @Test()
  public insertAtIndexIncorrectlyTest() {
    const list = new SinglyLinkedList<number>();
    list.insertAtEnd(1);
    list.insertAtEnd(2);
    list.insertAtEnd(3);
    expect.toThrow(() => list.insertAtIndex(4, 4));
    expect.toThrow(() => list.insertAtIndex(-1, 4));
    expect.toThrow(() => list.insertAtIndex(5, 4));
  }

  @Test()
  public insertAfterCorrectlyTest() {
    const list = new SinglyLinkedList<number>();
    list.insertAtEnd(1);
    list.insertAtEnd(2);
    list.insertAtEnd(3);
    list.insertAfter(2, 4);
    expect.toBeEqual(list.length, 4);
    expect.arraysToBeEqual(list.getList(), [1, 2, 4, 3]);
  }

  @Test()
  public insertAfterIncorrectlyTest() {
    const list = new SinglyLinkedList<number>();
    list.insertAtEnd(1);
    list.insertAtEnd(2);
    list.insertAtEnd(3);
    expect.toThrow(() => list.insertAfter(4, 4));
    expect.toThrow(() => list.insertAfter(-1, 4));
    expect.toThrow(() => list.insertAfter(5, 4));
  }

  @Test()
  public insertBeforeCorrectlyTest() {
    const list = new SinglyLinkedList<number>();
    list.insertAtEnd(1);
    list.insertAtEnd(2);
    list.insertAtEnd(3);
    list.insertBefore(2, 4);
    expect.toBeEqual(list.length, 4);
    expect.arraysToBeEqual(list.getList(), [1, 4, 2, 3]);
  }

  @Test()
  public insertBeforeIncorrectlyTest() {
    const list = new SinglyLinkedList<number>();
    list.insertAtEnd(1);
    list.insertAtEnd(2);
    list.insertAtEnd(3);
    expect.toThrow(() => list.insertBefore(4, 4));
    expect.toThrow(() => list.insertBefore(-1, 4));
    expect.toThrow(() => list.insertBefore(5, 4));
  }

  @Test()
  public deleteFromStartCorrectlyTest() {
    const list = new SinglyLinkedList<number>();
    list.insertAtEnd(1);
    list.insertAtEnd(2);
    list.insertAtEnd(3);
    expect.toBeEqual(list.deleteFromStart(), 1);
    expect.toBeEqual(list.length, 2);
    expect.arraysToBeEqual(list.getList(), [2, 3]);
  }

  @Test()
  public deleteFromStartIncorrectlyTest() {
    const list = new SinglyLinkedList<number>();
    expect.toThrow(() => list.deleteFromStart());
  }

  @Test()
  public deleteFromEndCorrectlyTest() {
    const list = new SinglyLinkedList<number>();
    list.insertAtEnd(1);
    list.insertAtEnd(2);
    list.insertAtEnd(3);
    expect.toBeEqual(list.deleteFromEnd(), 3);
    expect.toBeEqual(list.length, 2);
    expect.arraysToBeEqual(list.getList(), [1, 2]);
  }

  @Test()
  public deleteFromEndIncorrectlyTest() {
    const list = new SinglyLinkedList<number>();
    expect.toThrow(() => list.deleteFromEnd());
  }

  @Test()
  public deleteAtIndexCorrectlyTest() {
    const list = new SinglyLinkedList<number>();
    list.insertAtEnd(1);
    list.insertAtEnd(2);
    list.insertAtEnd(3);
    expect.toBeEqual(list.deleteAtIndex(1), 2);
    expect.toBeEqual(list.length, 2);
    expect.arraysToBeEqual(list.getList(), [1, 3]);
  }

  @Test()
  public deleteAtIndexIncorrectlyTest() {
    const list = new SinglyLinkedList<number>();
    list.insertAtEnd(1);
    list.insertAtEnd(2);
    list.insertAtEnd(3);
    expect.toThrow(() => list.deleteAtIndex(4));
    expect.toThrow(() => list.deleteAtIndex(-1));
    expect.toThrow(() => list.deleteAtIndex(5));
  }

  @Test()
  public deleteAfterCorrectlyTest() {
    const list = new SinglyLinkedList<number>();
    list.insertAtEnd(1);
    list.insertAtEnd(2);
    list.insertAtEnd(3);
    list.insertAfter(2, 4);
    expect.toBeEqual(list.deleteAfter(2), 4);
    expect.toBeEqual(list.length, 3);
    expect.arraysToBeEqual(list.getList(), [1, 2, 3]);
  }

  @Test()
  public deleteAfterIncorrectlyTest() {
    const list = new SinglyLinkedList<number>();
    list.insertAtEnd(1);
    list.insertAtEnd(2);
    list.insertAtEnd(3);
    expect.toThrow(() => list.deleteAfter(4));
    expect.toThrow(() => list.deleteAfter(-1));
    expect.toThrow(() => list.deleteAfter(5));
  }

  @Test()
  public deleteBeforeCorrectlyTest() {
    const list = new SinglyLinkedList<number>();
    list.insertAtEnd(1);
    list.insertAtEnd(2);
    list.insertAtEnd(3);
    list.insertBefore(2, 4);
    expect.toBeEqual(list.deleteBefore(2), 4);
    expect.toBeEqual(list.length, 3);
    expect.arraysToBeEqual(list.getList(), [1, 2, 3]);
  }

  // @Test()
  // public deleteBeforeIncorrectlyTest() {
  //   const list = new SinglyLinkedList<number>();
  //   list.insertAtEnd(1);
  //   list.insertAtEnd(2);
  //   list.insertAtEnd(3);
  //   expect.toThrow(() => list.deleteBefore(4));
  //   expect.toThrow(() => list.deleteBefore(-1));
  //   expect.toThrow(() => list.deleteBefore(5));
  // }

  @Test()
  public deleteValueCorrectlyTest() {
    const list = new SinglyLinkedList<number>();
    list.insertAtEnd(1);
    list.insertAtEnd(2);
    list.insertAtEnd(3);
    list.insertAtEnd(4);
    list.insertAtEnd(5);
    expect.toBeEqual(list.deleteValue(3), 3);
    expect.toBeEqual(list.length, 4);
    expect.arraysToBeEqual(list.getList(), [1, 2, 4, 5]);
  }

  @Test()
  public deleteValueIncorrectlyTest() {
    const list = new SinglyLinkedList<number>();
    list.insertAtEnd(1);
    list.insertAtEnd(2);
    list.insertAtEnd(3);
    list.insertAtEnd(4);
    list.insertAtEnd(5);
    expect.toThrow(() => list.deleteValue(6));
    expect.toThrow(() => list.deleteValue(-1));
    expect.toThrow(() => list.deleteValue(7));
  }

  @Test()
  public displayTest() {
    const list = new SinglyLinkedList<number>();
    list.insertAtEnd(1);
    list.insertAtEnd(2);
    list.insertAtEnd(3);
    list.display();
  }

  @Test()
  public getListTest() {
    const list = new SinglyLinkedList<number>();
    list.insertAtEnd(1);
    list.insertAtEnd(2);
    list.insertAtEnd(3);
    expect.arraysToBeEqual(list.getList(), [1, 2, 3]);
  }

  @Test()
  public traverseAndApplyTest() {
    const list = new SinglyLinkedList<number>();
    list.insertAtEnd(1);
    list.insertAtEnd(2);
    list.insertAtEnd(3);
    const arr1: number[] = [];
    list.traverseAndApply((node) => {
      arr1.push(node.value * 2);
    });
    expect.arraysToBeEqual(arr1, [2, 4, 6]);

    const arr2: number[] = [];
    list.traverseAndApply((node) => {
      arr2.push(node.value * 3);
    });
    expect.arraysToBeEqual(arr2, [3, 6, 9]);
  }
}
