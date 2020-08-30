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

export const getTotalCount = (nodes: TreeNode[]) => {
  const countsForNodes = nodes.map(getCountForNode);
  return sum(countsForNodes);
};
