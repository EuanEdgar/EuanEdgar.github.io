Recently I needed to generate some random colours to have some initial values for a new feature I was working on. I came up with this simple little snippet:
```js
const pad = (string, length, char) => {
  while(string.length < length) {
    string = `${char}${string}`
  }

  return string
}

const maxColourValue = 0xffffff
const generateColour = () => {
  // Generate number from 0x000000 - 0xffffff
  const value = Math.floor(Math.random() * maxColourValue + 1)
  // Ensure it matches the format #000000
  return `#${pad(value.toString(16), 6, '0')}`
}
```

Having this it was the work of but a moment to create what I dub the designer's nightmare - a beautiful cacophony of clashing colours:
```js
// Run this after the above snippet
setInterval(() => {
  document.querySelectorAll('*').forEach((el) => {
    el.style.backgroundColor = generateColour()
  })
}, 1000)
```

This randomises the background colour of every single element on the page every second. I do find it quite interesting how even in this total chaos it can seem as though patterns are emerging as portions of the page might shift brightness or hue together.

# Controlling the chaos

![Red-Green Example](red-green-banner.png)

Satisfied with this affront to all that is good in the world of web design, I wanted to play with a more ordered approach to generating colours. Specifically I wanted to look at ways of generating colours based on the coordinates of cells in a grid.
The [examples here]({"name":"ColourWave-Home"}) show the effect when two components of the colour (Red and green, green and blue, and red and blue) are changed across the page, with some transitions and pseudo-rotation done by changing the way coordinates are passed into the colour generation function.

## How it works

![Blue-Green Example](blue-green-banner.png)

This code is relatively simple, although it's best described as ugly. It [builds a table with cells](https://github.com/EuanEdgar/euanedgar.github.io/tree/913aa1df49e68fc7ac747637efbe09a7ac82e617/src/sites/colour_wave/utils/colourWave/base/createTable) of around 100px x 100px (They are allowed to grow slightly to fill the page), then [it sets up an interval of 500ms to calculate new colours for each of the cells](https://github.com/EuanEdgar/euanedgar.github.io/blob/913aa1df49e68fc7ac747637efbe09a7ac82e617/src/sites/colour_wave/utils/colourWave/base/index.js) in the table based on their coordinates. Every time the main loop completes it also loops a counter from 0 - 3 and based on the value of this number, the x and y values passed into the colour generators are manipulated so that the resulting pattern seems to originate from rotating corners.

There are three different colour generation functions on the [example page]({"name":"ColourWave-Home"}): red-green, red-blue, and blue-green. Which one it uses is randomly chosen when the page is loaded.

# Chaos is fun

![Panic Example](panic-banner.png)

Having started with chaos it is to chaos that we return.

[This example]({"name":"ColourWave-Panic"}) works much the same way its more orderly sibling but instead of carefully choosing a colour based on the coordinate of the cell, it [panics slightly and throws up whatever random colour it holds in its heart](https://github.com/EuanEdgar/euanedgar.github.io/blob/913aa1df49e68fc7ac747637efbe09a7ac82e617/src/sites/colour_wave/utils/colourWave/base/panic.js). This results in a patchwork creation likened to Elmer the Elephant of children's book fame.

# Next steps

![Red-Blue Example](red-blue-banner.png)

As I wrote above, the code is not particularly clean. The main loop of the pattern example is littered with some confusing business logic that should either have been cleaned up or moved elsewhere. It's also not ideal that the "panic" and patterned examples share so little code, outside of generating the initial table. Ideally they would each import a shared function which handles setting up the loop and applying generated colours to the table cells.

Something like this:

```js
loopColours(({ x, y, iterationCount }) => {
  // generate colour based on passed parameters
}, { interval: 500 /* Time between iterations (ms)*/ })
```

The reasons for these shortcomings are threefold:
1. I made this for fun as a plain JS/HTML project and have then modified it to be runnable as part of this site.
1. There was no planning involved in creating this - I just sat down and started to code. Ideas came and went and were abandoned on the side of the road.
1. This project was completed hurriedly. There's only so much time I can dedicate to things like this and this writeup was supposed to be done a week ago. I had to decide that what I had was interesting enough to stand if not alone then alongside this rambling explanation. If I had more time, I would have written less code.

If I do return to this project it might be interesting to implement it using the canvas element. If I were to do so I have no doubt that it could be more performant and allow for a higher resolution (Though I quite like its blocky nature), but that would only be the case if I implemented it correctly. I could just as easily spend days on code that is ultimately slower and produces a lower quality result than I have already. Also I am 100% sure that the background transitions would give me trouble.

For now, I am going to leave this project alone. I have more ideas that I'd like to implement but I'm going to leave that for another time. Maybe if I give it some time to brew I may come up with some more interesting things to do with it.
