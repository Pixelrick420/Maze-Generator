var rows, cols;
var size = 20;
var grid = [];
var current;
var frontier = [];
var maze = [];

function setup(){
    smooth();
    frameRate(80);
    createCanvas(600, 600);
    cols = floor(width / size);
    rows = floor(height / size);

    for (var r = 0; r < rows; r++) {
        var row = [];
        for (var c = 0; c < cols; c++) {
            let cell = new Cell(r, c);
            row.push(cell);
        }
        grid.push(row);
    }

    current = grid[10][10]; 
    current.visited = 1; 
    current.iscurrent = 1;
    frontier.push(...current.boundaries());
}

function draw() {
    background(51);
    for (var r = 0; r < grid.length; r++) {
        for (var c = 0; c < grid[r].length; c++) {
            grid[r][c].show();
        }
    }

    if (frontier.length > 0) {
        maze.push(current);
        for (var i = frontier.length - 1; i >= 0; i--) {
            var next = frontier[i][1];
            if (maze.includes(next)) {
                frontier.splice(i, 1);
            }
        }

        var nextwall = frontier.splice(Math.floor(Math.random() * frontier.length), 1)[0];
        var next = nextwall[1];
        remwalls(nextwall[0], next);
        current.iscurrent = 0;
        next.visited = 1;
        next.iscurrent = 1;
        current = next;
        frontier.push(...current.boundaries());
    }
}

function remwalls(cell1, cell2){
    if ((cell1.j == cell2.j) && (cell1.i > cell2.i)){
        cell1.walls[0] = 0;
        cell2.walls[2] = 0;
    }

    if ((cell1.i == cell2.i) && (cell1.j < cell2.j)){
        cell1.walls[1] = 0;
        cell2.walls[3] = 0;
    }

    if ((cell1.j == cell2.j) && (cell1.i < cell2.i)){
        cell1.walls[2] = 0;
        cell2.walls[0] = 0;
    }

    if ((cell1.i == cell2.i) && (cell1.j > cell2.j)){
        cell1.walls[3] = 0;
        cell2.walls[1] = 0;
    }
}

function Cell(i, j){
    this.i = i;
    this.j = j;
    this.walls = [1, 1, 1, 1]; // top, right, bottom, left
    this.visited = 0;
    this.iscurrent = 0;

    this.boundaries = function(){
        var bounds = [];
        if (this.i > 0 && !grid[this.i - 1][this.j].visited){
            bounds.push([grid[this.i][this.j], grid[this.i - 1][this.j]]);
        }
        if (this.j < cols - 1 && !grid[this.i][this.j + 1].visited){
            bounds.push([grid[this.i][this.j], grid[this.i][this.j + 1]]);
        }
        if (this.i < rows - 1 && !grid[this.i + 1][this.j].visited){
            bounds.push([grid[this.i][this.j], grid[this.i + 1][this.j]]);
        }
        if (this.j > 0 && !grid[this.i][this.j - 1].visited){
            bounds.push([grid[this.i][this.j], grid[this.i][this.j - 1]]);
        }
        return bounds;
    }

    this.show = function(){
        noFill();
        var x = this.j * size;
        var y = this.i * size;
        stroke(255);
        strokeWeight(2); 
        strokeCap(ROUND); 

        if (this.walls[0]) {
            line(x, y, x + size, y);
        }
        if (this.walls[1]) {
            line(x + size, y, x + size, y + size);
        }
        if (this.walls[2]) {
            line(x + size, y + size, x, y + size);
        }
        if (this.walls[3]) {
            line(x, y + size, x, y);
        }
        if (this.visited) {
            noStroke();
            fill(100, 15, 155);
            rect(x, y, size, size);
        }
        if (this.iscurrent){
            noStroke();
            fill(200, 162, 200);
            rect(x, y, size, size);
        }
    }
}
