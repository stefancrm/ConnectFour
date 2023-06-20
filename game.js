const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const radius = 30;
const boardRows = 6;
const boardCols = 6;
const boardPadding = 35;
const XOffset = 40;
const YOffset = 40 * 6;
const diskSpeed = 4

let maxNumber = boardRows * boardCols;

let number = 0;
let player = 1;
let gameover = false;

let board = [];

// Game Board 
function createBoard() {
    for(let row = 0; row < boardRows; ++row) {
        board[row] = [];
        for (let col = 0; col < boardCols; ++col) {
            board[row][col] = {
                x: col * (radius + boardPadding) + XOffset,
                y: row * (radius + boardPadding) + YOffset,
                number: "C" + (col) + "|R" + (row),
                player: 0
            }
        }
    }
}

function drawBoard(){
    for(let row = 0; row < boardRows; ++row) {
        for (let col = 0; col < boardCols; ++col) {
            const boardLayout = board[row][col];

            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(boardLayout.x, boardLayout.y, radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = "#000";
            ctx.font = "10px Arial";
            ctx.fillText(boardLayout.number, boardLayout.x -radius /2, boardLayout.y + 20);
            ctx.fillText(boardLayout.player, boardLayout.x -radius /2, boardLayout.y);
        }
    }
}

// Player piece
function genObject(column) {

    console.log(column)
    const col = column;
    for (let row = boardRows - 1; row >= 0; --row) {
        const boardPiece = board[row][col];
        if(boardPiece.player === 0) {
            if( player === 1) {
                boardPiece.player = 1;
            } else {
                boardPiece.player = 2;
            }
            break;
        }
    }
}

function drawObjects() {
    for(let row = 0; row < boardRows; ++row) {
        for (let col = 0; col < boardCols; ++col) {
            const boardPiece = board[row][col];
            if (boardPiece.player != 0) {
                if (boardPiece.player == 1) {
                    ctx.fillStyle = 'red';
                } else if (boardPiece.player == 2) {
                    ctx.fillStyle = 'blue';
                }
                ctx.beginPath();
                ctx.arc(boardPiece.x, boardPiece.y, radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
}

// Mouse Position
canvas.addEventListener("click", getMouseClickPos, false);

function getMouseClickPos(event) {
    let cRect = canvas.getBoundingClientRect();
    let canvasX = Math.round(event.clientX - cRect.left)       // Subtract the 'left' of the canvas from the X/Y
    document.getElementById("x").innerHTML = "X:" + canvasX;
   // console.log(canvasX);
    for (let col = 0; col < boardCols; ++col) {
        let xpos = col * (radius + boardPadding) + XOffset;
        if (canvasX > (xpos - radius)  && 
            canvasX < (xpos + radius)) {
            document.getElementById("xclick").innerHTML = "Col " + (col);
            genObject(col);
        }
    }
}

function gameLoop() {
    clearCanvas();
    createBoard();
    drawBoard();
    drawObjects();
    requestAnimationFrame(gameLoop);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function init() {
    requestAnimationFrame(gameLoop);
}

init();




