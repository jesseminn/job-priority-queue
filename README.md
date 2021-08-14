## What is it?

A data structure which do jobs one by one

## `JobPriorityQueue`

### Use case

A downside of event emitter pattern is all event listeners runs at the same time (actually _synchronously_). It would be hard for you to know the order of each event listener, you have to check every places you subscribe to the event listener to know that. Furthermore, event emitter don't care about async functions. It just trigger the event listener, then move to the next one. It become troublesome when you need to run a list of async functions one by one when an event emits.

## `PriorityQueue`

-   It's a `MinPriorityQueue` (smaller number, higher priority) because I think the priorities will easier to manage.
-   All the magic happens in the `enqueue` method. When enqueuing an item, the position to insert the item into the array is ready decided.

## TODO

-   Maybe I can use a `Map` instead of an array as the `queue`?
-   Try using `Promise.race` to abort an async function
