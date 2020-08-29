module Animals

type AnimalEntry = { Name: string; Count: int }

type AnimalCollection =
    { Name: string
      Entries: AnimalEntry List }

type Cage =
    { Name: string
      Collections: AnimalCollection List }

let spiders: AnimalEntry = { Name = "Spiders"; Count = 1 }
let lizards: AnimalEntry = { Name = "Lizards"; Count = 15 }
let fishes: AnimalEntry = { Name = "Fishes"; Count = 17 }

let aquarium: AnimalCollection =
    { Name = "Aquarium"
      Entries = [ spiders; lizards; fishes ] }

let zebras: AnimalEntry = { Name = "Zebras"; Count = 7 }
let gnus: AnimalEntry = { Name = "Gnus"; Count = 8 }

let herbivoreCage: AnimalCollection =
    { Name = "Herbivores"
      Entries = [ zebras; gnus ] }

let tigers: AnimalEntry = { Name = "Tigers"; Count = 2 }
let lions: AnimalEntry = { Name = "Lions"; Count = 3 }

let carnivoreCage: AnimalCollection =
    { Name = "Carnivores"
      Entries = [ tigers; lions ] }

type Node =
    | AnimalCollection of AnimalCollection
    | Container of name: string * AnimalCollection List

let root: Node List =
    [ AnimalCollection(aquarium)
      Container("Cages", [ herbivoreCage; carnivoreCage ]) ]

let getCountInAnimalCollection (animalCollection: AnimalCollection) =
    animalCollection.Entries
    |> List.sumBy (fun e -> e.Count)

let getCountInNode (node: Node) =
    match node with
    | AnimalCollection animalCollection -> getCountInAnimalCollection animalCollection
    | Container (_, animalCollections) ->
        animalCollections
        |> List.sumBy getCountInAnimalCollection

let getTotalCount = List.sumBy getCountInNode
