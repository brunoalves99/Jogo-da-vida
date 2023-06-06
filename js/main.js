import {canvas, genDisplay, btnPause, btnPlay, btnReset} from "./elements.js";

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for(let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }

    return arr;
}

let cols = 40;
let rows = 40;
let grid = make2DArray(cols, rows);
let next = make2DArray(cols, rows);
let generation = 1;
let drawing;

const ctx = canvas.getContext("2d");

function setup() {
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            grid[i][j] = Math.floor(Math.random() * 2);
        }
    }
}

btnPlay.addEventListener("click", () => {
    btnPlay.classList.add("hide");
    btnPause.classList.remove("hide");
    btnReset.classList.remove("hide");
    startDrawing();
});

btnPause.addEventListener("click", () => {
    btnPlay.classList.remove("hide");
    btnPause.classList.add("hide");
    clearInterval(drawing);
});

btnReset.addEventListener("click", () => {
    btnPlay.classList.remove("hide");
    btnPause.classList.add("hide");
    btnReset.classList.add("hide");
    clearInterval(drawing);
    generation = 1;
    genDisplay.textContent = 1;
    draw();
});


setup();
draw();

function draw() {
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            let x = i * 10;
            let y = j * 10;
            if(grid[i][j] == 1) {
                ctx.fillStyle = "white";
                ctx.fillRect(x, y, 10, 10);
            } else {
                ctx.fillStyle = "black";
                ctx.fillRect(x, y, 10, 10);
            }
        }
    }

    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            let state = grid[i][j];

            let neighbors = countNeighbors(grid, i, j);
                
            if(state == 0 && neighbors == 3) {
                next[i][j] = 1;
            } else if(state == 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }
        }
    }

    grid = next;
    generation++;
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for(let i = -1; i < 2; i++) {
        for(let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }

    return sum -= grid[x][y];
}

function startDrawing() {
    drawing = setInterval(() => {
       draw();
       genDisplay.textContent = generation;
    }, 100);
}