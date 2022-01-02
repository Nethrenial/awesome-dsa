import { TestSuite, Test, expect } from "testyts";
import { DoublyLinkedList } from "./DoublyLinkedList";

@TestSuite()
export class DoublyLinkedListTestSuite {
  @Test()
  public initializationTest() {
    const list = new DoublyLinkedList<number>();
    expect.toBeEqual(list.length, 0);
    expect.arraysToBeEqual(list.getList(), []);
  }

  @Test()
  public insertAtEndTest() {
    const list = new DoublyLinkedList<number>();
    list.insertAtEnd(2);
    list.insertAtEnd(3);
    list.insertAtEnd(4);
    expect.toBeEqual(list.length, 3);
    expect.arraysToBeEqual(list.getList(), [2, 3, 4]);
  }

  @Test()
  public insertAtStartTest() {
    const list = new DoublyLinkedList<number>();
    list.insertAtStart(1);
    list.insertAtStart(2);
    list.insertAtStart(3);
    expect.toBeEqual(list.length, 3);
    expect.arraysToBeEqual(list.getList(), [3, 2, 1]);
  }

  @Test()
  public insertAtIndexCorrectlyTest() {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    list.insertAtIndex(1, 4);
    expect.toBeEqual(list.length, 4);
    expect.arraysToBeEqual(list.getList(), [1, 4, 2, 3]);
  }

  @Test()
  public insertAtIndexIncorrectlyTest() {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    expect.toThrow(() => list.insertAtIndex(4, 4));
    expect.toThrow(() => list.insertAtIndex(-1, 4));
    expect.toThrow(() => list.insertAtIndex(5, 4));
  }

  @Test()
  public insertAfterCorrectlyTest() {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    list.insertAfter(2, 4);
    expect.toBeEqual(list.length, 4);
    expect.arraysToBeEqual(list.getList(), [1, 2, 4, 3]);
  }

  @Test()
  public insertAfterIncorrectlyTest() {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    expect.toThrow(() => list.insertAfter(4, 4));
    expect.toThrow(() => list.insertAfter(-1, 4));
    expect.toThrow(() => list.insertAfter(5, 4));
  }

  @Test()
  public insertBeforeCorrectlyTest() {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    list.insertBefore(2, 4);
    expect.toBeEqual(list.length, 4);
    expect.arraysToBeEqual(list.getList(), [1, 4, 2, 3]);
  }

  @Test()
  public insertBeforeIncorrectlyTest() {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    expect.toThrow(() => list.insertBefore(4, 4));
    expect.toThrow(() => list.insertBefore(-1, 4));
    expect.toThrow(() => list.insertBefore(5, 4));
  }

  @Test()
  public deleteFromStartCorrectlyTest() {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    expect.toBeEqual(list.deleteFromStart(), 1);
    expect.toBeEqual(list.length, 2);
    expect.arraysToBeEqual(list.getList(), [2, 3]);
  }

  @Test()
  public deleteFromStartIncorrectlyTest() {
    const list = new DoublyLinkedList<number>();
    expect.toThrow(() => list.deleteFromStart());
  }

  @Test()
  public deleteFromEndCorrectlyTest() {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    expect.toBeEqual(list.deleteFromEnd(), 3);
    expect.toBeEqual(list.length, 2);
    expect.arraysToBeEqual(list.getList(), [1, 2]);
  }

  @Test()
  public deleteFromEndIncorrectlyTest() {
    const list = new DoublyLinkedList<number>();
    expect.toThrow(() => list.deleteFromEnd());
  }

  @Test()
  public deleteAtIndexCorrectlyTest() {
    const list = DoublyLinkedList.fromArray([1, 2, 3, 4]);
    expect.toBeEqual(list.deleteAtIndex(2), 3);
    expect.toBeEqual(list.length, 3);
    expect.arraysToBeEqual(list.getList(), [1, 2, 4]);
  }

  @Test()
  public deleteAtIndexIncorrectlyTest() {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    expect.toThrow(() => list.deleteAtIndex(4));
    expect.toThrow(() => list.deleteAtIndex(-1));
    expect.toThrow(() => list.deleteAtIndex(5));
  }

  @Test()
  public deleteAfterCorrectlyTest() {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    list.insertAfter(2, 4);
    expect.toBeEqual(list.deleteAfter(2), 4);
    expect.toBeEqual(list.length, 3);
    expect.arraysToBeEqual(list.getList(), [1, 2, 3]);
  }

  @Test()
  public deleteAfterIncorrectlyTest() {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    expect.toThrow(() => list.deleteAfter(4));
    expect.toThrow(() => list.deleteAfter(-1));
    expect.toThrow(() => list.deleteAfter(5));
  }

  @Test()
  public deleteBeforeCorrectlyTest() {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    list.insertBefore(2, 4);
    expect.toBeEqual(list.deleteBefore(2), 4);
    expect.toBeEqual(list.length, 3);
    expect.arraysToBeEqual(list.getList(), [1, 2, 3]);
  }

  @Test()
  public deleteBeforeIncorrectlyTest() {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    expect.toThrow(() => list.deleteBefore(4));
    expect.toThrow(() => list.deleteBefore(-1));
    expect.toThrow(() => list.deleteBefore(5));
  }

  @Test()
  public deleteValueCorrectlyTest() {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    list.insertAtEnd(4);
    list.insertAtEnd(5);
    expect.toBeEqual(list.deleteValue(3), 3);
    expect.toBeEqual(list.length, 4);
    expect.arraysToBeEqual(list.getList(), [1, 2, 4, 5]);
  }

  @Test()
  public deleteValueIncorrectlyTest() {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    list.insertAtEnd(4);
    list.insertAtEnd(5);
    expect.toThrow(() => list.deleteValue(6));
    expect.toThrow(() => list.deleteValue(-1));
    expect.toThrow(() => list.deleteValue(7));
  }

  @Test()
  public displayTest() {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    list.display();
  }

  @Test()
  public displayReverseTest() {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    list.display("r");
  }

  @Test()
  public getListTest() {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    expect.arraysToBeEqual(list.getList(), [1, 2, 3]);
  }

  @Test()
  public getListReverseTest() {
    const list = DoublyLinkedList.fromArray([1, 2, 3]);
    expect.arraysToBeEqual(list.getList("r"), [3, 2, 1]);
  }

  @Test()
  public forEachApplyTest() {
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
  public forEachApplyReverseTest() {
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
