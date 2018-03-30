# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Dependencies](#dependencies)

## Instructions

This project is Memory Game which is an assignment for students from Udacity.

This will require modifying the HTML and CSS files, but primarily the JavaScript file `js/app.js`.

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

### How The Game Works
The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

Each turn:

- The player flips one card over to reveal its underlying symbol.
- The player then turns over a second card, trying to find the corresponding card with the same symbol.
- If the cards match, both cards stay flipped over.
- If the cards do not match, both cards are flipped face down.
- The game ends once all cards have been correctly matched.

![alt text](img/screenshot.jpg?raw=true "Screenshot")

## Dependencies

The project is cooperated with two libraries.

- The first library is sweetalert2. For details, check out [Sweet Alert 2](https://sweetalert2.github.io/).

- Another is Animate.css. For details, check out [Animate.css](https://github.com/daneden/animate.css).
