var grid = [];
var current;
var stack = [];
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
}

function draw() {
    background(51);
    for (var r = 0; r < grid.length; r++) {
        for (var c = 0; c < grid[r].length; c++) {
            grid[r][c].show();
        }
    }

    stack.push(current);
    var neib = current.neighbours();

    if (neib && neib[0]) { 
        var next = neib[0];
        current.walls[neib[1]] = 0;
        next.walls[(neib[1] + 2) % 4] = 0;

        next.visited = 1;
        next.iscurrent = 1;
        current.iscurrent = 0;
        current = next; 
    } 
    else{ 
        while (stack.length > 0 && stack[stack.length - 1].neighbours() == undefined) {
            current.iscurrent = 0;
            current = stack.pop();
        }

        if (stack.length > 0) {
            current = stack[stack.length - 1];
        }
    }
    if(next == undefined && stack.length == 0){
        generated = true;
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

    this.neighbours = function(){
        var nbours = [];
        var dir = [];
        if (this.i > 0 && !grid[this.i - 1][this.j].visited){
            nbours.push(grid[this.i - 1][this.j]);
            dir.push(0);
        }
        if (this.j < cols - 1 && !grid[this.i][this.j + 1].visited){
            nbours.push(grid[this.i][this.j + 1]);
            dir.push(1);
        }
        if (this.i < rows - 1 && !grid[this.i + 1][this.j].visited){
            nbours.push(grid[this.i + 1][this.j]);
            dir.push(2);
        }
        if (this.j > 0 && !grid[this.i][this.j - 1].visited){
            nbours.push(grid[this.i][this.j - 1]);
            dir.push(3);
        }
        
        
        if (nbours.length > 0){
            var rand = Math.floor(Math.random() * nbours.length);
            return [nbours[rand], dir[rand]];
        } else {
            return undefined;
        }
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
            fill(107,161,221);
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