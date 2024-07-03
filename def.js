var current = grid[0][0];
var currentRow = 0;
var changed = false;

function draw() {
    background(51);
    for (var r = 0; r < grid.length; r++) {
        for (var c = 0; c < grid[r].length; c++) {
            grid[r][c].show();
        }
    }

    for (var c = 0; c < grid[currentRow].length; c++) {
        var current = grid[currentRow][c];
        
        if(current.i == 0 && current.j == 0){
            //do nothing
        }

        else if (current.i == (grid.length - 1) && current.j == (grid[0].length - 1)) {
            // also do nothing
        } 

        else {
            var count = 0;
            if (current.inpath == 1){
                //also also do nothing (this is starting to sound like a 5 star advert)
            }

            else{
                if (current.i > 0 && (current.walls[0] == 0) && (grid[current.i - 1][current.j].inpath == 1)) {
                    count++;
                }
                if (current.i < grid.length - 1 && (current.walls[2] == 0) && (grid[current.i + 1][current.j].inpath == 1)) {
                    count++;
                }
                if (current.j < grid[0].length - 1 && (current.walls[1] == 0) && (grid[current.i][current.j + 1].inpath == 1)) {
                    count++;
                }
                if (current.j > 0 && (current.walls[3] == 0) && (grid[current.i][current.j - 1].inpath == 1)) {
                    count++;
                }
    
                if (count + current.walls.filter(wall => wall === 1).length > 2) {
                    changed = true;
                    current.inpath = 1;
                }
            }    
        }
    }


    currentRow++;
    if (currentRow >= grid.length) {
        if(!changed){
            showpath();
            noLoop();
        }
        changed = false;
        currentRow = 0;
    }
}

function showpath(){
    for (var r = 0; r < grid.length; r++) {
        for (var c = 0; c < grid[r].length; c++) {
            if (grid[r][c].inpath == 1){
                continue;
            }
            else{
                grid[r][c].final = 1;
                grid[r][c].show();
            }
        }
    }
}


