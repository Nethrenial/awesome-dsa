export { Stack } from "./ds/stacks/stack/Stack";
export { LimitedStack } from "./ds/stacks/limited-stack/LimitedStack";
export { SinglyLinkedList } from "./ds/linked-lists/singly-linked-list/SinglyLinkedList";
export { DoublyLinkedList } from "./ds/linked-lists/doubly-linked-list/DoublyLinkedList";
export { Graph } from "./ds/graphs/Graph";

import { Graph } from "./ds/graphs/Graph";

const graph = new Graph();
//1 => 2 => 7
//2 => 3 => 5
//3 => 4 => 6 => 1
// implement a graph from above data
graph.addDirectedEdge(1, 2);
graph.addDirectedEdge(1, 7);
graph.addDirectedEdge(2, 3);
graph.addDirectedEdge(2, 5);
graph.addDirectedEdge(3, 4);
graph.addDirectedEdge(3, 6);
graph.addDirectedEdge(3, 1);

console.log(graph.DFS(1, 6));
