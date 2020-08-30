export type TreeNode = {
  name: string;
  payload:
    | { kind: "Leaf"; count: number }
    | { kind: "Container"; children: TreeNode[] };
};

const sum = (numbers: number[]) => numbers.reduce((a, b) => a + b, 0);

const getCountForNode = (node: TreeNode): number => {
  switch (node.payload.kind) {
    case "Leaf":
      return node.payload.count;
    case "Container":
      const countsForSubNodes = node.payload.children.map(getCountForNode);
      return sum(countsForSubNodes);
  }
};

const findNode = (path: string[], currentNode: TreeNode): TreeNode[] => {
  if (path.length === 0 || currentNode.name !== path[0]) return [];

  switch (currentNode.payload.kind) {
    case "Leaf":
      if (path.length === 1 && currentNode.name === path[0]) {
        return [currentNode];
      }
      return [];
    case "Container":
      if (path.length === 1 && currentNode.name === path[0]) {
        return [currentNode];
      }
      const nextPath = path.slice(1);
      const foundNodes = currentNode.payload.children.flatMap((c) =>
        findNode(nextPath, c)
      );
      return foundNodes;
  }
};

export const findInNodes = (path: string[], nodes: TreeNode[]): TreeNode[] =>
  nodes.flatMap((node) => findNode(path, node));

export const getTotalCount = (path: string[], nodes: TreeNode[]): number => {
  const nodesAtPath =
    path.length === 0 ? nodes : nodes.flatMap((n) => findNode(path, n));
  const countsForNodes = nodesAtPath.map(getCountForNode);

  return sum(countsForNodes);
};

const getPathForNode = (node: TreeNode): string[] => {
  switch (node.payload.kind) {
    case "Leaf":
      return [node.name];
    case "Container":
      const childPaths = node.payload.children.flatMap(getPathForNode);
      return childPaths.map((childPath) => `${node.name}.${childPath}`);
  }
};

export const getPaths = (nodes: TreeNode[]): string[] => {
  const allPaths = nodes.flatMap(getPathForNode);
  const sortedPaths = allPaths.slice().sort();
  return sortedPaths;
};

export const addAnimals = (
  path: string[],
  numberToAdd: number,
  nodes: TreeNode[]
) => {
  const animalNodes = findInNodes(path, nodes);
  for (const animalNode of animalNodes)
    if (animalNode.payload.kind === "Leaf") {
      animalNode.payload.count += numberToAdd;
    }
};
