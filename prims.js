var grid = [];
var current;
var frontier = [];
var maze = [];
var generated = false;
var clickedButton = undefined;

const urlParams = new URLSearchParams(window.location.search);
const cols = parseInt(urlParams.get('width'));
const rows = parseInt(urlParams.get('height'));
var size = Math.min(Math.floor(700 / rows), Math.floor(1000 / cols));
const framerate = parseInt(urlParams.get('framerate'));


function setup(){
    smooth();
    frameRate(framerate);
    canvas = createCanvas(cols*size, rows*size);
    canvas.parent('CanvasContainer');

    for (var r = 0; r < rows; r++) {
        var row = [];
        for (var c = 0; c < cols; c++) {
            let cell = new Cell(r, c);
            row.push(cell);
        }
        grid.push(row);
    }

    var randrow = Math.floor(Math.random() * rows);
    var randcol = Math.floor(Math.random() * cols);
    current = grid[randrow][randcol]; 
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
        if(nextwall != undefined){
            var next = nextwall[1];
            remwalls(nextwall[0], next);
            current.iscurrent = 0;
            next.visited = 1;
            next.iscurrent = 1;
            current = next;
            frontier.push(...current.boundaries());
        }
        else{
            current.iscurrent = 0;
        }
    }
    else{
        generated = true;
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
    this.inpath = 0;
    this.final = 0;

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
        stroke("#f4f1e9;");
        strokeWeight(3); 
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
            fill('#188be9');
            rect(x, y, size, size);
        }
        if (this.iscurrent){
            noStroke();
            fill(245,121,58);
            rect(x, y, size, size);
        }
        if (this.inpath){
            noStroke();
            fill(245,121,58);
            rect(x, y, size, size);
        }
        if (this.final){
            noStroke();
            fill (66, 66, 66);
            rect(x, y, size, size);
        }
    }
}
function solve(){
    if(generated){
        if(clickedButton == undefined){
            alert('Select an algorithm');
        }
        else{
            const script = document.createElement('script');
            script.src = clickedButton.getAttribute('data-algorithm') + '.js'; 
            script.async = true;
    
            script.onload = function() {
                console.log('Script loaded successfully');
            };
    
            script.onerror = function() {
                console.error('Script load error');
            };
    
            document.body.appendChild(script);
        }
        
    }
    else{
        alert("Wait for the maze to be generated")
    }
}


function handleAlgorithmClick(algorithm) {
    selected = algorithm.toLowerCase(); 

    const algorithmButtons = document.querySelectorAll('.algorithm .option');
    algorithmButtons.forEach(button => {
        button.classList.remove('selected');
    });

    clickedButton = document.querySelector(`.algorithm .option[data-algorithm="${selected}"]`);
    if (clickedButton) {
        clickedButton.classList.add('selected');
    }
}