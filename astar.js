openList = [grid[0][0]];
closedList = [];
gCost = {};
gCost[`${grid[0][0].i}.${grid[0][0].j}`] = 0;
path = {};
path['0.0'] = 'start';
var pathBlock = `${grid.length - 1}.${grid[0].length - 1}`;

function draw() {
    background(51);

    for (var r = 0; r < grid.length; r++) {
        for (var c = 0; c < grid[r].length; c++) {
            grid[r][c].show();
        }
    }

    if (openList.length > 0) {
        var current = openList[0];
        current.inpath = 1;
        for (var i = 1; i < openList.length; i++) {
            if (fCost(openList[i]) < fCost(current)) {
                current = openList[i];
            }
        }

        if (current.i == grid.length - 1 && current.j == grid[0].length - 1) {
            reconstructPath();
            openlist = [];
        }

        openList = openList.filter(cell => cell !== current);
        closedList.push(current);

        var neighbors = getNeighbors(current);

        for (var neighbor of neighbors) {
            if (closedList.includes(neighbor)) {
                continue;
            }

            var tempG = gCost[`${current.i}.${current.j}`] + 1;

            if (!openList.includes(neighbor)) {
                openList.push(neighbor);
            } else if (tempG >= gCost[`${neighbor.i}.${neighbor.j}`]) {
                continue;
            }

            gCost[`${neighbor.i}.${neighbor.j}`] = tempG;
            path[`${neighbor.i}.${neighbor.j}`] = `${current.i}.${current.j}`;
        }
    } 
}

function fCost(cell) {
    return gCost[`${cell.i}.${cell.j}`] + heuristic(cell);
}

function heuristic(cell) {
    return abs(grid.length - 1 - cell.i) + abs(grid[0].length - 1 - cell.j);
}

function getNeighbors(cell) {
    var neighbors = [];

    if (cell.j < grid[0].length - 1 && !cell.walls[1]) {
        neighbors.push(grid[cell.i][cell.j + 1]);
    }

    if (cell.j > 0 && !cell.walls[3]) {
        neighbors.push(grid[cell.i][cell.j - 1]);
    }

    if (cell.i > 0 && !cell.walls[0]) {
        neighbors.push(grid[cell.i - 1][cell.j]);
    }

    if (cell.i < grid.length - 1 && !cell.walls[2]) {
        neighbors.push(grid[cell.i + 1][cell.j]);
    }

    return neighbors;
}

function reconstructPath() {
    var temp = pathBlock;
    while (true){
        var coordinates = temp.split('.');
        grid[parseInt(coordinates[0])][parseInt(coordinates[1])].final = 1;
        temp = path[temp];
        if (temp == 'start'){
            break;
        }
    }

    for (var r = 0; r < grid.length; r++) {
        for (var c = 0; c < grid[r].length; c++) {
            grid[r][c].show();
        }
    }
    noLoop();  
}

