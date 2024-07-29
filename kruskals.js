var grid1 = [];
var walls = [];
var parent = [];
var rank = [];
var grid = [];
var generated = false;
var clickedButton = undefined;

const urlParams = new URLSearchParams(window.location.search);
const cols = parseInt(urlParams.get('width'));
const rows = parseInt(urlParams.get('height'));
var size = Math.min(Math.floor(700 / rows), Math.floor(1000 / cols));
const framerate = parseInt(urlParams.get('framerate'));


function setup() {
    smooth();
    frameRate(framerate);
    canvas = createCanvas(cols*size, rows*size);
    canvas.parent('CanvasContainer');

    for (var r = 0; r < rows; r++) {
        var row = [];
        for (var c = 0; c < cols; c++) {
            let cell = new Cell(r, c);
            row.push(cell);
            grid1.push(cell);
            parent[cell.id] = cell.id;
            rank[cell.id] = 0;
        }
    }

    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols - 1; c++) {
            walls.push([grid1[r * cols + c], grid1[r * cols + c + 1]]);
        }
    }

    for (var c = 0; c < cols; c++) {
        for (var r = 0; r < rows - 1; r++) {
            walls.push([grid1[r * cols + c], grid1[(r + 1) * cols + c]]);
        }
    }

    shuffleArray(walls); 
}

function draw() {
    background(51);
    for (var r = 0; r < grid1.length; r++) {
        grid1[r].show();
    }

    if (walls.length > 0) {
        var set1 = 0;
        var set2 = 0;
        while(set1 == set2){
            var currentwall = walls.pop(); 
            if(currentwall == undefined){
                generated = true;
                break
            }
            set1 = find(currentwall[0].id);
            set2 = find(currentwall[1].id);
        }
        
        if (! generated){
            remwalls(currentwall[0], currentwall[1]);
            union(set1, set2);

            currentwall[0].visited = 1;
            currentwall[1].visited = 1;
        }   
    }

}

function remwalls(cell1, cell2) {
    if (cell1.j === cell2.j && cell1.i > cell2.i) {
        cell1.walls[0] = 0;
        cell2.walls[2] = 0;
    }

    if (cell1.i === cell2.i && cell1.j < cell2.j) {
        cell1.walls[1] = 0;
        cell2.walls[3] = 0;
    }

    if (cell1.j === cell2.j && cell1.i < cell2.i) {
        cell1.walls[2] = 0;
        cell2.walls[0] = 0;
    }

    if (cell1.i === cell2.i && cell1.j > cell2.j) {
        cell1.walls[3] = 0;
        cell2.walls[1] = 0;
    }
}

function union(x, y) {
    var rootX = find(x);
    var rootY = find(y);

    if (rootX !== rootY) {
        if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }
    }
}

function find(x) {
    if (parent[x] !== x) {
        parent[x] = find(parent[x]);
    }
    return parent[x];
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.id = i * cols + j;
    this.walls = [1, 1, 1, 1]; // top, right, bottom, left
    this.visited = 0;
    this.inpath = 0;
    this.final = 0;

    this.show = function() {
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
        for (var i = 0; i < grid1.length; i += cols) {
            grid.push(grid1.slice(i, i + cols));
        }
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