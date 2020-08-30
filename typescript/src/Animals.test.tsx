import { getTotalCount, TreeNode, getPaths, findInNodes } from "./Animals";

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
  payload: {
    kind: "Container",
    children: [fishesNode, spidersNode],
  },
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

test("getTotalCount [] should return 33", () => {
  const totalCount = getTotalCount([], allNodes);
  expect(totalCount).toBe(33);
});

test("getTotalCount [ Aquarium, Fishes ] should return 12", () => {
  const fishesCount = getTotalCount(["Aquarium", "Fishes"], allNodes);
  expect(fishesCount).toBe(12);
});

test("getTotalCount [ Cages, Carnivores ] should return 5", () => {
  const carnivoresCount = getTotalCount(["Cages", "Carnivores"], allNodes);
  expect(carnivoresCount).toBe(5);
});

test("getPaths should return correct paths", () => {
  const allPaths = getPaths(allNodes);
  const expectedPaths = [
    "Aquarium.Fishes",
    "Aquarium.Spiders",
    "Cages.Carnivores.Lions",
    "Cages.Carnivores.Tigers",
    "Cages.Herbivores.Gnus",
    "Cages.Herbivores.Zebras",
  ];

  expect(allPaths).toEqual(expectedPaths);
});

test("getPaths should return correct node", () => {
  const actualFishesNode = findInNodes(["Aquarium", "Fishes"], allNodes);
  console.log("Found nodes: ", actualFishesNode);

  expect(actualFishesNode).toEqual([fishesNode]);
});
