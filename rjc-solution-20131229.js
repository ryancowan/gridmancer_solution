/*
    This code is meant to be executed in the CodeCombat environment. It contains a number of function calls that are 
    specific to that environment.

    More information can be found here: http://blog.codecombat.com/beat-this-level-get-a-programming-job
*/

//Initialize variables
var grid = this.getNavGrid().grid;
var tileSize = 4;
var limitX = 0;
var limitY = 0;
var limitHitX = false;
var limitHitY = false;

//Nested for loops used to create rectangles from bottom to top, left to right
for(var x = 0; x + tileSize < grid[0].length; x += tileSize) {
    for(var y = 0; y + tileSize < grid.length; y += tileSize) {
        var occupied = grid[y][x].length > 0;

        if(!occupied && !coordinatesInExistingRectangle(this.spawnedRectangles, x, y)) {
            //find out limits of current area
            limitX = x;
            limitY = y;
            limitHitX = false;
            limitHitY = false;

            //find Y limit
            for(var a=y; a+tileSize<grid.length; a+=tileSize){
                if(!limitHitY){
                    if(grid[a][x].length > 0 || coordinatesInExistingRectangle(this.spawnedRectangles, x, a)){
                        limitY = a;
                        limitHitY = true;
                    }
                }
            }

            //find X limit
            for(var b=x; b+tileSize<grid.length; b+=tileSize){
                if(!limitHitX){
                    for(var c=y; c<limitY; c+=tileSize){
                        if(grid[c][b].length > 0 || coordinatesInExistingRectangle(this.spawnedRectangles, b, c)){
                            limitX = b;
                            limitHitX = true;
                        }
                    }
                }
            }

            this.addRect(((limitX + x) / 2), ((limitY + y) / 2), (limitX - x), (limitY - y));
            this.wait();
        }
    }
}

//Helper function to check if current coordinates exist in any created rectangles
function coordinatesInExistingRectangle(rectangles, coordX, coordY){
    //increment coordinates by one so we dont skip squares of four
    ++coordX;
    ++coordY;
    //loop through the existing rectangles, making sure we dont overlap
    for(var i=0; i<rectangles.length; i++){
        var rect = rectangles[i];
        var lowX = rect.pos.x - (rect.width / 2);
        var highX = rect.pos.x + (rect.width / 2);
        var lowY = rect.pos.y - (rect.height / 2);
        var highY = rect.pos.y + (rect.height / 2);
        if(coordX >= lowX && coordX <= highX && coordY >= lowY && coordY <= highY){
            return true;
        }
    }

    return false;
}