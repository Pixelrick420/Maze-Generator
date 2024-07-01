var start = grid[0][0];
var queue = [];
var visited = [];
var path = {};
path['0.0'] = 'end';
var pathblock = `${grid.length - 1}.${grid[0].length - 1}`
queue.push(start);
visited.push(start);

function draw() {
    background(51);

    for (var r = 0; r < grid.length; r++) {
        for (var c = 0; c < grid[r].length; c++) {
            grid[r][c].show();
        }
    }

    if (queue.length > 0) { 
        var current = queue.shift();
        current.inpath = 1;

        if (current.j < grid[0].length - 1 && !current.walls[1]) {
            var next = grid[current.i][current.j + 1];
            if (!visited.includes(next)) {
                visited.push(next);
                queue.push(next);
                path[`${next.i}.${next.j}`] = `${current.i}.${current.j}`;
            }
        }

        if (current.j > 0 && !current.walls[3]) {
            var next = grid[current.i][current.j - 1];
            if (!visited.includes(next)) {
                visited.push(next);
                queue.push(next);
                path[`${next.i}.${next.j}`] = `${current.i}.${current.j}`;
            }
        }

        if (current.i > 0 && !current.walls[0]) {
            var next = grid[current.i - 1][current.j];
            if (!visited.includes(next)) {
                visited.push(next);
                queue.push(next);
                path[`${next.i}.${next.j}`] = `${current.i}.${current.j}`;
            }
        }

        if (current.i < grid.length - 1 && !current.walls[2]) {
            var next = grid[current.i + 1][current.j];
            if (!visited.includes(next)) {
                visited.push(next);
                queue.push(next);
                path[`${next.i}.${next.j}`] = `${current.i}.${current.j}`;
            }
        }
    }

    if (current != undefined && current.i == grid.length - 1 && current.j == grid[0].length - 1) {
        queue = [];
        while (pathblock != 'end') {
            let [i, j] = pathblock.split('.').map(Number);
            grid[i][j].final = 1;
            pathblock = path[pathblock];
        }
    }
}
