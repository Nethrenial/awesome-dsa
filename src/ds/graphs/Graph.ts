class Edge<T = number> {
  public from: T;
  public to: T;
  public weight?: number;
  constructor(from: T, to: T, weight?: number) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}

/**
 * Implementation of a graph with methods for different traversal methods and other useful algorithms.
 */
export class Graph<T = number> {
  #_graph: Map<T, Set<T>>;

  constructor() {
    this.#_graph = new Map<T, Set<T>>();
  }

  /**
   * Returns true if the graph contains the vertex, false otherwise.
   * @param vertex Vertex to check if it exists in the graph
   * @example
   * ```typescript
   * const graph = new Graph<number>();
   * graph.addVertex(1);
   * graph.hasVertex(1); // true
   * graph.hasVertex(2); // false
   * ```
   */
  public hasVertex(vertex: T): boolean {
    return this.#_graph.has(vertex);
  }

  /**
   * Adds a directed edge from one vertex to another.
   * If the vertices do not exist in the graph, they will be added.
   * @param from Starting vertex
   * @param to Ending vertex
   * @example
   * ```typescript
   * const graph = new Graph<number>();
   * graph.addVertex(1);
   * graph.addVertex(2);
   * graph.addVertex(3);
   * graph.addDirectedEdge(1, 2);
   * graph.addDirectedEdge(2, 3);
   * graph.addDirectedEdge(3, 1);
   * graph.getNeighbors(1); // Set { 2 }
   * graph.getNeighbors(2); // Set { 3 }
   * graph.getNeighbors(3); // Set { 1 }
   * ```
   * @see {@link addUndirectedEdge}
   */
  public addDirectedEdge(from: T, to: T): void {
    if (!this.hasVertex(from)) {
      this.#_graph.set(from, new Set<T>());
    }
    if (!this.hasVertex(to)) {
      this.#_graph.set(to, new Set<T>());
    }
    this.#_graph.get(from)?.add(to);
  }

  /**
   * Adds an undirected edge between two vertices.
   * If the vertices do not exist in the graph, they will be added.
   * @param from Starting vertex
   * @param to Ending vertex
   * @example
   * ```typescript
   * const graph = new Graph<number>();
   * graph.addUndirectedEdge(1, 2);
   * graph.addUndirectedEdge(2, 3);
   * graph.addUndirectedEdge(3, 1);
   * graph.getNeighbors(1); // Set { 2, 3 }
   * graph.getNeighbors(2); // Set { 1, 3 }
   * graph.getNeighbors(3); // Set { 1, 2 }
   * ```
   * @see {@link addDirectedEdge}
   */
  public addUndirectedEdge(v1: T, v2: T): void {
    this.addDirectedEdge(v1, v2);
    this.addDirectedEdge(v2, v1);
  }

  /**
   * Adds a vertex to the graph if it does not already exist.
   * @param vertex Vertex to add
   * @example
   * ```typescript
   * const graph = new Graph<number>();
   * graph.addVertex(1);
   * graph.addVertex(2);
   * graph.getNeighbors(1); // Set { }
   * graph.getNeighbors(2); // Set { }
   * ```
   */
  public addVertex(vertex: T): void {
    if (!this.hasVertex(vertex)) {
      this.#_graph.set(vertex, new Set<T>());
    }
  }

  /**
   * Returns the neighbors of a vertex.
   * @param vertex Vertex to get neighbors of
   * @example
   * ```typescript
   * const graph = new Graph<number>();
   * graph.addVertex(1);
   * graph.addVertex(2);
   * graph.addVertex(3);
   * graph.addUndirectedEdge(1, 2);
   * graph.addUndirectedEdge(2, 3);
   * graph.addDirectedEdge(3, 1);
   * graph.getNeighbors(1); // Set { 2 }
   * graph.getNeighbors(2); // Set { 3, 1 }
   * graph.getNeighbors(3); // Set { 2, 1 }
   * ```
   */
  public getNeighbors(vertex: T): Set<T> {
    if (this.#_graph.has(vertex)) {
      return this.#_graph.get(vertex) as Set<T>;
    }
    throw new Error(`Vertex ${vertex} not found in graph`);
  }

  /**
   * Returns the set of vertices in the graph.
   * @example
   * ```typescript
   * const graph = new Graph<number>();
   * graph.addVertex(1);
   * graph.addVertex(2);
   * graph.addVertex(3);
   * graph.getVertices(); // Set { 1, 2, 3 }
   * ```
   * @see {@link getNeighbors}
   * @see {@link addVertex}
   */
  public getVertices(): Set<T> {
    return new Set<T>(this.#_graph.keys());
  }

  /**
   * Traverses the graph in breadth-first order and returns the vertices in the order they were visited.
   * @param start Starting vertex
   * @example
   * If the graph is like this,
   * ```typescript
   * 1 => 2 => 7
   * 2 => 3 => 5
   * 3 => 4 => 6 => 1
   * ```
   * Then the traversal will be: [1, 2, 7, 3, 5, 4, 6]
   * @see {@link BFS}
   * @see {@link DFS}
   * @see {@link DFT}
   */
  public BFT(start: T): T[] {
    const queue: T[] = [];
    const visited: Set<T> = new Set<T>();
    const path: T[] = [];
    queue.push(start);
    while (queue.length > 0) {
      const vertex = queue.shift() as T;
      if (!visited.has(vertex)) {
        visited.add(vertex);
        const neighbors: Set<T> = this.getNeighbors(vertex);
        for (const neighbor of neighbors) {
          queue.push(neighbor);
        }
        path.push(vertex);
      }
    }
    return path;
  }

  /**
   * Searches the graph for a path from the starting vertex to the ending vertex in breadth-first order.
   * And returns the path if it exists.(excluding the finish vertex)
   * Returns false if no path exists.
   * @param start Starting vertex
   * @param finish Ending vertex
   * @example
   * If the graph is like this, and we search for a path from 1 to 6,
   * ```typescript
   * 1 => 2 => 7
   * 2 => 3 => 5
   * 3 => 4 => 6 => 1
   * ```
   * Then the path will be: [1, 2, 7, 3, 5, 4]
   * @see {@link BFT}
   * @see {@link DFS}
   * @see {@link DFT}
   */
  public BFS(start: T, finish: T): T[] | false {
    const queue: T[] = [];
    const visited: Set<T> = new Set<T>();
    const path: T[] = [];
    queue.push(start);
    while (queue.length > 0) {
      const vertex = queue.shift() as T;
      if (vertex === finish) {
        return path;
      }
      if (!visited.has(vertex)) {
        visited.add(vertex);
        const neighbors: Set<T> = this.getNeighbors(vertex);
        for (const neighbor of neighbors) {
          queue.push(neighbor);
        }
        path.push(vertex);
      }
    }
    return false;
  }

  /**
   * Traverses the graph in depth-first order and returns the vertices in the order they were visited.
   * @param start Starting vertex
   * @example
   * If the graph is like this,
   * ```typescript
   * 1 => 3
   * 2 => 5 => 8
   * 3 => 2
   * 4 => 1
   * 5 => 7
   * ```
   * Then the DFT of 1 would be [ 1, 3, 2, 8, 5, 7 ]
   * @see {@link BFS}
   * @see {@link DFS}
   * @see {@link DFT}
   */
  public DFT(start: T): T[] {
    const stack: T[] = [];
    const visited: Set<T> = new Set<T>();
    const path: T[] = [];
    stack.push(start);
    while (stack.length > 0) {
      const vertex = stack.pop() as T;
      console.log(`Popped ${vertex}`);
      if (!visited.has(vertex)) {
        visited.add(vertex);
        const neighbors: Set<T> = this.getNeighbors(vertex);
        for (const neighbor of neighbors) {
          console.log(`Pushing ${neighbor}`);
          stack.push(neighbor);
        }
        path.push(vertex);
      }
    }
    return path;
  }
  /**
   * Searches the graph for a path from the starting vertex to the ending vertex in depth-first order.
   * And returns the path if it exists.(excluding the finish vertex)
   * Returns false if no path exists.
   * @param start Starting vertex
   * @param finish Ending vertex
   * @example
   * If the graph is like this, and we search for a path from 1 to 6,
   * ```typescript
   * 1 => 2 => 7
   * 2 => 3 => 5
   * 3 => 4 => 6 => 1
   * ```
   * Then the path will be: [ 1, 7, 2, 5, 3 ]
   * @see {@link BFT}
   * @see {@link DFS}
   * @see {@link DFT}
   */
  public DFS(start: T, finish: T): T[] | false {
    const stack: T[] = [];
    const visited: Set<T> = new Set<T>();
    const path: T[] = [];
    stack.push(start);
    while (stack.length > 0) {
      const vertex = stack.pop() as T;
      console.log(`Popped ${vertex}`);
      if (vertex === finish) {
        return path;
      }
      if (!visited.has(vertex)) {
        visited.add(vertex);
        const neighbors: Set<T> = this.getNeighbors(vertex);
        for (const neighbor of neighbors) {
          console.log(`Pushing ${neighbor}`);
          stack.push(neighbor);
        }
        path.push(vertex);
      }
    }
    return false;
  }

  public Dijkstra(start: T, finish: T): T[] | false {
    const queue: T[] = [];
    const visited: Set<T> = new Set<T>();
    const path: T[] = [];
    queue.push(start);
    while (queue.length > 0) {
      const vertex = queue.shift() as T;
      if (vertex === finish) {
        return path;
      }
      if (!visited.has(vertex)) {
        visited.add(vertex);
        const neighbors: Set<T> = this.getNeighbors(vertex);
        for (const neighbor of neighbors) {
          queue.push(neighbor);
        }
        path.push(vertex);
      }
    }
    return false;
  }

  public FloydWarshall(): void {
    const vertices: Set<T> = this.getVertices();
    const distances: Map<T, Map<T, number>> = new Map<T, Map<T, number>>();
    for (const vertex of vertices) {
      distances.set(vertex, new Map<T, number>());
      for (const neighbor of this.getNeighbors(vertex)) {
        distances.get(vertex)?.set(neighbor, 1);
      }
    }
    for (const vertex of vertices) {
      for (const neighbor of this.getNeighbors(vertex)) {
        for (const other of vertices) {
          if (other !== vertex && other !== neighbor) {
            const distance: number =
              (distances.get(vertex)?.get(neighbor) as number) +
              (distances.get(neighbor)?.get(other) as number);
            if (
              !distances.get(vertex)?.has(other) ||
              distance < (distances.get(vertex)?.get(other) as number)
            ) {
              (distances.get(vertex) as Map<T, number>).set(other, distance);
            }
          }
        }
      }
    }
  }

  public Prim(start: T): T[] {
    const queue: T[] = [];
    const visited: Set<T> = new Set<T>();
    const path: T[] = [];
    queue.push(start);
    while (queue.length > 0) {
      const vertex = queue.shift() as T;
      if (!visited.has(vertex)) {
        visited.add(vertex);
        const neighbors: Set<T> = this.getNeighbors(vertex);
        for (const neighbor of neighbors) {
          queue.push(neighbor);
        }
        path.push(vertex);
      }
    }
    return path;
  }

  public Kruskal(): void {
    const vertices: Set<T> = this.getVertices();
    const edges: Set<Edge<T>> = new Set<Edge<T>>();
    for (const vertex of vertices) {
      for (const neighbor of this.getNeighbors(vertex)) {
        edges.add(new Edge<T>(vertex, neighbor));
      }
    }
    const tree: Set<Edge<T>> = new Set<Edge<T>>();
    while (edges.size > 0) {
      const edge: Edge<T> = edges.values().next().value;
      const [v1, v2]: [T, T] = [edge.from, edge.to];
      if (!tree.has(edge) && !tree.has(new Edge<T>(v2, v1))) {
        tree.add(edge);
        edges.delete(edge);
      }
    }
  }

  public isBipartite(): boolean {
    const vertices: Set<T> = this.getVertices();
    const visited: Set<T> = new Set<T>();
    const queue: T[] = [];
    const color: Map<T, boolean> = new Map<T, boolean>();
    queue.push(vertices.values().next().value);
    while (queue.length > 0) {
      const vertex = queue.shift() as T;
      if (!visited.has(vertex)) {
        visited.add(vertex);
        const neighbors: Set<T> = this.getNeighbors(vertex);
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
            color.set(neighbor, !color.get(vertex));
          }
        }
      }
    }
    for (const vertex of vertices) {
      if (!color.has(vertex)) {
        return false;
      }
    }
    return true;
  }

  public isConnected(): boolean {
    const vertices: Set<T> = this.getVertices();
    const visited: Set<T> = new Set<T>();
    const queue: T[] = [];
    queue.push(vertices.values().next().value);
    while (queue.length > 0) {
      const vertex = queue.shift() as T;
      if (!visited.has(vertex)) {
        visited.add(vertex);
        const neighbors: Set<T> = this.getNeighbors(vertex);
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        }
      }
    }
    return visited.size === vertices.size;
  }

  public isCyclic(): boolean {
    const vertices: Set<T> = this.getVertices();
    const visited: Set<T> = new Set<T>();
    const queue: T[] = [];
    queue.push(vertices.values().next().value);
    while (queue.length > 0) {
      const vertex = queue.shift() as T;
      if (!visited.has(vertex)) {
        visited.add(vertex);
        const neighbors: Set<T> = this.getNeighbors(vertex);
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        }
      }
    }
    return visited.size !== vertices.size;
  }

  public isTree(): boolean {
    const vertices: Set<T> = this.getVertices();
    const visited: Set<T> = new Set<T>();
    const queue: T[] = [];
    queue.push(vertices.values().next().value);
    while (queue.length > 0) {
      const vertex = queue.shift() as T;
      if (!visited.has(vertex)) {
        visited.add(vertex);
        const neighbors: Set<T> = this.getNeighbors(vertex);
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        }
      }
    }
    return visited.size === vertices.size;
  }

  public isEulerian(): boolean {
    const vertices: Set<T> = this.getVertices();
    const visited: Set<T> = new Set<T>();
    const queue: T[] = [];
    queue.push(vertices.values().next().value);
    while (queue.length > 0) {
      const vertex = queue.shift() as T;
      if (!visited.has(vertex)) {
        visited.add(vertex);
        const neighbors: Set<T> = this.getNeighbors(vertex);
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        }
      }
    }
    return visited.size === vertices.size;
  }

  public isHamiltonian(): boolean {
    const vertices: Set<T> = this.getVertices();
    const visited: Set<T> = new Set<T>();
    const queue: T[] = [];
    queue.push(vertices.values().next().value);
    while (queue.length > 0) {
      const vertex = queue.shift() as T;
      if (!visited.has(vertex)) {
        visited.add(vertex);
        const neighbors: Set<T> = this.getNeighbors(vertex);
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        }
      }
    }
    return visited.size === vertices.size;
  }

  public isRegular(): boolean {
    const vertices: Set<T> = this.getVertices();
    const visited: Set<T> = new Set<T>();
    const queue: T[] = [];
    queue.push(vertices.values().next().value);
    while (queue.length > 0) {
      const vertex = queue.shift() as T;
      if (!visited.has(vertex)) {
        visited.add(vertex);
        const neighbors: Set<T> = this.getNeighbors(vertex);
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        }
      }
    }
    return visited.size === vertices.size;
  }

  public isComplete(): boolean {
    const vertices: Set<T> = this.getVertices();
    const visited: Set<T> = new Set<T>();
    const queue: T[] = [];
    queue.push(vertices.values().next().value);
    while (queue.length > 0) {
      const vertex = queue.shift() as T;
      if (!visited.has(vertex)) {
        visited.add(vertex);
        const neighbors: Set<T> = this.getNeighbors(vertex);
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        }
      }
    }
    return visited.size === vertices.size;
  }

  public isCompleteBipartite(): boolean {
    const vertices: Set<T> = this.getVertices();
    const visited: Set<T> = new Set<T>();
    const queue: T[] = [];
    queue.push(vertices.values().next().value);
    let color: boolean = false;
    while (queue.length > 0) {
      const vertex = queue.shift() as T;
      if (!visited.has(vertex)) {
        visited.add(vertex);
        const neighbors: Set<T> = this.getNeighbors(vertex);
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
            color = !color;
          }
        }
      }
    }
    return visited.size === vertices.size;
  }
}
