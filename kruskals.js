var rows, cols;
var size = 20;
var grid = [];
var walls = [];
var sets = [];
var current;

function setup() {
    smooth();
    frameRate(100);
    createCanvas(600, 600);
    cols = floor(width / size);
    rows = floor(height / size);

    for (var r = 0; r < rows; r++) {
        var row = [];
        for (var c = 0; c < cols; c++) {
            let cell = new Cell(r, c);
            row.push(cell);
            sets.push([cell]);
        }
        grid.push(row);
    }

    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols - 1; c++) {
            walls.push([grid[r][c], grid[r][c + 1]]);
        }
    }

    for (var c = 0; c < cols; c++) {
        for (var r = 0; r < rows - 1; r++) {
            walls.push([grid[r][c], grid[r + 1][c]]);
        }
    }
}

function draw() {
    background(51);
    for (var r = 0; r < grid.length; r++) {
        for (var c = 0; c < grid[r].length; c++) {
            grid[r][c].show();
        }
    }

    if (walls.length > 0) {
        var rand = Math.floor(Math.random() * walls.length);
        var currentwall = walls[rand];

        var set1, set2;
        for (var i = 0; i < sets.length; i++) {
            if (sets[i].includes(currentwall[0])) set1 = sets[i];
            if (sets[i].includes(currentwall[1])) set2 = sets[i];
        }

        if (set1 !== set2) {
            remwalls(currentwall[0], currentwall[1]);
            currentwall[0].visited = 1;
            currentwall[1].visited = 1;
            var mergedSet = set1.concat(set2);
            sets = sets.filter(set => set !== set1 && set !== set2);
            sets.push(mergedSet);
        }

        walls.splice(rand, 1);
    }
}

function remwalls(cell1, cell2) {
    if ((cell1.j == cell2.j) && (cell1.i > cell2.i)) {
        cell1.walls[0] = 0;
        cell2.walls[2] = 0;
    }

    if ((cell1.i == cell2.i) && (cell1.j < cell2.j)) {
        cell1.walls[1] = 0;
        cell2.walls[3] = 0;
    }

    if ((cell1.j == cell2.j) && (cell1.i < cell2.i)) {
        cell1.walls[2] = 0;
        cell2.walls[0] = 0;
    }

    if ((cell1.i == cell2.i) && (cell1.j > cell2.j)) {
        cell1.walls[3] = 0;
        cell2.walls[1] = 0;
    }
}

function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [1, 1, 1, 1]; // top, right, bottom, left
    this.visited = 0;

    this.show = function() {
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
    }
}