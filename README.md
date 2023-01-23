
What is the Game of Life?
The Game of Life is not just a simple game, it's a simulation of cellular evolution. Its inventor is the mathematician John Conway.

It consists of a grid of cells which, based on a few mathematical rules, can live, die or multiply. Depending on the initial conditions, the cells form various patterns throughout the course of the game.

PROJECT STRUCTURE
This project consists in 2 folders: "mygame_back" is the backend component, with the routing logic with node.js and Express Framework, "mygame_front" is the frontend component with index.html, css and some javascripts file.

The game engine (frontend part) was developed 'from scratch' without the aid of frameworks, with simple Javascript, Jquery, CSS and HTML. The graphics automation part (grid and points) was developed using SVG elements. I decided to separate the backend part from the frontend one because of the different module management system: I used the commonJS module system with “require” for the backend routing logic and “ES6 import and export” for the frontend game engine and graphics management, to import the js modules directly into the html page.

Choosing a framework such as React would have greatly simplified the code structure, in this case I preferred to use a standard approach in order to work on a lower level of abstraction.

INSTALLATION ON LINUX SERVER
Be sure you have node.js already installed
$  git clone https://github.com/samugit83/myGameofLife.git


MIT LICENSE

