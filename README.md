<h1 style="color: #ff5566;text-align:center;font-weight: 200;font-size: 48px">Awesome-DSA</h1>

<h2>What is Awesome DSA?</h2>

Awesome DSA provides classic **_Data Structures & Algorithms_** to use in any of your projects
Currently provides,

- Data Structures

| Structure                                                                                  | Description                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [SinglyLinkedList](https://nethrenial.github.io/awesome-dsa/classes/SinglyLinkedList.html) | A linked list that has nodes which only has a reference to the next node.                                                                                                                                     |
| [DoublyLinkedList](https://nethrenial.github.io/awesome-dsa/classes/DoublyLinkedList.html) | Functionality is the same for the most part (there are two more methods in this class) as `SinglyLinkedList` for the end users but implemented with nodes that has references to both next and previous node. |
| [Stack](https://nethrenial.github.io/awesome-dsa/classes/Stack.html)                       | A more practical and useful implementation of a stack which grows as needed.                                                                                                                                  |
| [LimitedStack](https://nethrenial.github.io/awesome-dsa/classes/LimitedStack.html)         | A classic implementation of Stack that is limited to the size it's given at the initialization.                                                                                                               |
| [Queue](https://nethrenial.github.io/awesome-dsa/classes/Queue.html)                       | A Queue structure that can grow in size as needed.                                                                                                                                                            |
| [LinearQueue](https://nethrenial.github.io/awesome-dsa/classes/LinearQueue.html)           | Implementation of a linear queue, which is limited in size and can't recover space from dequeued items.                                                                                                       |
| [CircularQueue](https://nethrenial.github.io/awesome-dsa/classes/CircularQueue.html)       | Implementation of a circular queue, which is limited in size but can recover space from dequeued items.                                                                                                       |
| [Graph](https://nethrenial.github.io/awesome-dsa/classes/Graph.html)                       | Implementation of a graph with methods for different traversal methods and other useful algorithms.                                                                                                           |

Awesome DSA is released under the [MIT license](raw.githubusercontent.com/Nethrenial/awesome-dsa/doubly-linked-list/LICENSE).You are free to use the source code in anyway you want.Also contributions are much appreciated as I'm just doing this in my free time for fun 😉.

## Documentation

Visit the documentation here [&rightarrow;](https://nethrenial.github.io/awesome-dsa/modules.html) | Also you editor will give great suggestions because of extensive tsdoc comments.

## Installation

Using npm:

```shell
npm i awesome-dsa
```

Using yarn:

```shell
yarn add awesome-dsa
```

Note: add `--save` if you are using npm < 5.0.0

## Usage

In nodejs environment:

```js
const dsa = require("awesome-dsa");
const list = new dsa.DoublyLinkedList();
//or
const { SinglyLinkedList } = require("awesome-dsa");
const list = new SinglyLinkedList();
list.insertAtEnd(10);
```

In ES modules (Typescript or Javascript):

```ts
import dsa from "awesome-dsa";
const q = new dsa.LinearQueue();
//or
import { SinglyLinkedList } from "awesome-dsa";
const list = new SinglyLinkedList();
```

`Recommended to use {} syntax to leverage tree shaking capabilities of bundling tools.It will reduce you bundle size greatly.`

## Bugs & Feature Requests

## Written By

Nethsara Sandeepa Elvitigala
[Twitter](https://twitter.com/NethsaraE) | [linkedin](www.linkedin.com/in/nethsara-elvitigala) | [Github](https://github.com/Nethrenial) | [Facebook](https://facebook.com/nethsara.sandeepa)
