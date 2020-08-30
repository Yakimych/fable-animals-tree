module App

open Browser.Dom
open Animals

// Mutable variable to count the number of times we clicked the button
let mutable count = 0

// Get a reference to our button and cast the Element to an HTMLButtonElement
let myButton =
    document.querySelector (".my-button") :?> Browser.Types.HTMLButtonElement

// Register our listener
myButton.onclick <-
    fun _ ->
        count <- count + 1
        myButton.innerText <- sprintf "You clicked: %i time(s)" count

Browser.Dom.console.log (sprintf "Root: %A" Animals.root)
let totalCount = getCountInNode root
Browser.Dom.console.log (sprintf "Total count: %A" totalCount)
let allPaths = getPathsForNode "" root
Browser.Dom.console.log (sprintf "Paths: %A" allPaths)
