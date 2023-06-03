export class NestedMap<T, U, V> {
  private m: Map<T, Map<U, V>> = new Map();
  get(key: T) {
    return this.m.get(key) ?? new Map<U, V>();
  }

  set(key: T, key2: U, value: V) {
    const m2 = this.get(key);
    m2.set(key2, value);
    this.m.set(key, m2);
  }
}

type Edge<NodeValue, EdgeValue> = {
  from: NodeValue;
  to: NodeValue;
  value: EdgeValue;
};

export class Graph<NodeValue, EdgeValue> {
  private nodes: Set<NodeValue> = new Set();
  private edges: NestedMap<NodeValue, NodeValue, Edge<NodeValue, EdgeValue>> =
    new NestedMap();

  public addNode(value: NodeValue) {
    this.nodes.add(value);
  }

  public getNodes(): NodeValue[] {
    return [...this.nodes.values()];
  }

  public addEdge(node1: NodeValue, node2: NodeValue, value: EdgeValue) {
    const edge: Edge<NodeValue, EdgeValue> = { from: node1, to: node2, value };
    this.edges.set(node1, node2, edge);
    this.edges.set(node2, node1, edge);
  }

  public getEdges(node: NodeValue) {
    const edges = [...(this.edges.get(node) ?? new Map()).values()];
    const set = new Set<[NodeValue, EdgeValue]>();
    edges.forEach((edge) => {
      if (edge.from !== node) {
        set.add([edge.from, edge.value]);
      }
      if (edge.to !== node) {
        set.add([edge.to, edge.value]);
      }
    });
    return set;
  }
}
