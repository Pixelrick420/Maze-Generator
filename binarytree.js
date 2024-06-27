var rows, cols;
var size = 20;
var grid = [];
var current;

function setup(){
    smooth();
    frameRate(140);
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

    current = grid[0][0]; 
    current.visited = 1; 
    current.iscurrent = 1;
}

function draw() {
    background(51);
    for (var r = 0; r < grid.length; r++) {
        for (var c = 0; c < grid[r].length; c++) {
            grid[r][c].show();
        }
    }

    if(current.j < (grid[0].length - 1) && current.i < (grid.length - 1)){
        if (Math.floor(Math.random() * 2)){
            current.walls[2] = 0;
            grid[current.i + 1][current.j].walls[0] = 0;
        }
        else{
            current.walls[1] = 0;
            grid[current.i][current.j + 1].walls[3] = 0;
        }
    }
    else if(current.j < (grid[0].length - 1)){
        current.walls[1] = 0;
        grid[current.i][current.j + 1].walls[3] = 0;
    }
    else{
        current.walls[2] = 0;
        grid[current.i + 1][current.j].walls[0] = 0; 
    }

    if (current.j < (grid[0].length - 1)){
        var next = grid[current.i][current.j + 1];
    }

    else{
        var next = grid[current.i + 1][0];
    }
    current.iscurrent = 0;
    next.visited = 1;
    next.iscurrent = 1
    current = next;
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
