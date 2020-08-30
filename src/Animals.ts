type TreeNode = {
  name: string;
  payload:
    | { kind: "Leaf"; count: number }
    | { kind: "Container"; children: TreeNode[] };
};

const fishesNode: TreeNode = {
  name: "Fishes",
  payload: { kind: "Leaf", count: 12 },
};

const spidersNode: TreeNode = {
  name: "Spiders",
  payload: { kind: "Leaf", count: 1 },
};

const aquariumNode: TreeNode = {
  name: "Aquarium",
  payload: { kind: "Container", children: [fishesNode, spidersNode] },
};

const zebrasNode: TreeNode = {
  name: "Zebras",
  payload: { kind: "Leaf", count: 7 },
};

const gnusNode: TreeNode = {
  name: "Gnus",
  payload: { kind: "Leaf", count: 8 },
};

const herbivoresNode: TreeNode = {
  name: "Herbivores",
  payload: { kind: "Container", children: [zebrasNode, gnusNode] },
};

const lionsNode: TreeNode = {
  name: "Lions",
  payload: { kind: "Leaf", count: 3 },
};

const tigersNode: TreeNode = {
  name: "Tigers",
  payload: { kind: "Leaf", count: 2 },
};

const carnivoresNode: TreeNode = {
  name: "Carnivores",
  payload: { kind: "Container", children: [lionsNode, tigersNode] },
};

const cagesNode: TreeNode = {
  name: "Cages",
  payload: { kind: "Container", children: [herbivoresNode, carnivoresNode] },
};

export const allNodes: TreeNode[] = [aquariumNode, cagesNode];
