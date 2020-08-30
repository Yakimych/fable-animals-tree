module Animals

type AnimalEntry = { Name: string; Count: int }

type Node =
    | Leaf of AnimalEntry List // TODO: Leaf of count: int?
    | SingleNode of Node
    | Nodes of NamedNode List

and NamedNode = { Name: string; Node: Node }

let spiders: AnimalEntry = { Name = "Spiders"; Count = 1 }
let lizards: AnimalEntry = { Name = "Lizards"; Count = 15 }
let fishes: AnimalEntry = { Name = "Fishes"; Count = 17 }

let aquarium: NamedNode =
    { Name = "Aquarium"
      Node = Leaf([ spiders; lizards; fishes ]) }

let zebras: AnimalEntry = { Name = "Zebras"; Count = 7 }
let gnus: AnimalEntry = { Name = "Gnus"; Count = 8 }

let herbivoreCage: NamedNode =
    { Name = "Herbivores"
      Node = Leaf([ zebras; gnus ]) }

let tigers: AnimalEntry = { Name = "Tigers"; Count = 2 }
let lions: AnimalEntry = { Name = "Lions"; Count = 3 }

let carnivoreCage: NamedNode =
    { Name = "Carnivores"
      Node = Leaf([ tigers; lions ]) }

let cages: NamedNode =
    { Name = "Cages"
      Node = Nodes([ herbivoreCage; carnivoreCage ]) }

let root: Node = Nodes([ aquarium; cages ])

let getCountInLeaf (animalEntries: AnimalEntry list) =
    animalEntries |> List.sumBy (fun e -> e.Count)

let rec getCountInNode (node: Node): int =
    match node with
    | Leaf animalEntries -> getCountInLeaf animalEntries
    | SingleNode node -> getCountInNode node
    | Nodes nodes ->
        nodes
        |> List.sumBy (fun namedNode -> getCountInNode namedNode.Node)

let getPathsForLeaf (name: string) (animalEntries: AnimalEntry List) =
    animalEntries
    |> List.map (fun e -> sprintf "%s.%s" name e.Name)

let concatPaths (currentSegment: string) (restOfPath: string) =
    match currentSegment with
    | "" -> restOfPath
    | nonEmptySegment -> sprintf "%s.%s" nonEmptySegment restOfPath

let rec getPathsForNamedNode (namedNode: NamedNode) =
    getPathsForNode namedNode.Name namedNode.Node

and getPathsForNode (name: string) (node: Node) =
    match node with
    | Leaf animalEntries -> getPathsForLeaf name animalEntries
    | SingleNode singleNode -> getPathsForNode name singleNode
    | Nodes nodes ->
        let concatWithName = concatPaths name
        nodes
        |> List.collect getPathsForNamedNode
        |> List.map concatWithName
