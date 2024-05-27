var canvasBoard;
var gameOver = false;
var turn = 'yellow';

const x = [75, 200, 325, 450, 575, 700, 825];
const y = [75, 200, 325, 450, 575, 700];

var board = [
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '']
]

const scoreTable = {
    red: -1,
    yellow: 1,
    n: -2
}

var gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 900;
        this.canvas.height = 775;
        this.ctx = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

function startGame() {
    gameCanvas.start();
    canvasBoard = new createBoard();
}

function createBoard(size) {
    this.size = size;
    ctx = gameCanvas.ctx;

    for (let i = 0; i < x.length; i++) {
        for (let n = 0; n < y.length; n++) {
            createCircle(ctx, x[i], y[n]);
        }
    }

    aiTurn();
}

function minimax(board, depth, isMax) {
    let spaces = freeSpaces(board);

    if (checkWin('yellow')) {
        if (depth == 0) {
            return 1;
        } else {
            return 1 - (0.1 * depth);
        }
    } else if (checkWin('red')) {
        return -1;
    }

    if (depth > 6) {
        return 0;
    }

    if (isMax) {
        let bestScore = -Infinity;
        for (let col = 0; col < spaces[0].length; col++) {
            board[spaces[0][col]][spaces[1][col]] = 'yellow';
            let score = minimax(board, depth + 1, false);
            board[spaces[0][col]][spaces[1][col]] = '';
    
            bestScore = Math.max(score, bestScore);
        }

        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let col = 0; col < spaces[0].length; col++) {
            board[spaces[0][col]][spaces[1][col]] = 'red';
            let score = minimax(board, depth + 1, true);
            board[spaces[0][col]][spaces[1][col]] = '';
    
            bestScore = Math.min(score, bestScore);
        }

        return bestScore;
    }
    
}

function aiTurn() {
    let spaces = freeSpaces(board);
    let bestScore =  -Infinity;
    let bestMove = [];

    for (let col = 0; col < spaces[0].length; col++) {
        board[spaces[0][col]][spaces[1][col]] = 'yellow';
        let score = minimax(board, 0, false);
        board[spaces[0][col]][spaces[1][col]] = '';

        if (score > bestScore) {
            bestScore = score;
            bestMove = [spaces[0][col], spaces[1][col]];
            console.log(bestScore, bestMove)
        }
    }

    placeCircle(bestMove[1] + 1, true);
    board[bestMove[0]][bestMove[1]] = 'yellow';
}

function createCircle(ctx, x, y, color = '#212f3d', test = false) {
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, 2 * 3.14159265358979323, false)
    ctx.fillStyle = color;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5
    ctx.fill();
    ctx.stroke();
}

function accPlace(r) {
    if (gameOver) {
        return;
    }

    r = r - 1;

    for (let i = board.length - 1; i > -1; i--) {
        if (board[i][r] == '') {
            board[i][r] = turn;
            createCircle(gameCanvas.ctx, x[r], y[i], turn);
            if (turn == 'red') {
                turn = 'yellow'
            } else {
                turn = 'red';
            }
            setTimeout(() => {

            }, 1000);
            return true;
            break;
        }
    }

    return false;
}

function placeCircle(r, ai = false) {
    if (accPlace(r)) {
        if (checkWin('red')) {
            gameOver = true;
            $('#game-over').text("Red Wins!");
        } else if (checkWin('yellow')) {
            gameOver = true;
            $('#game-over').text("Yellow Wins!");
        }
    
        if (!ai && turn == 'yellow') {
            aiTurn();  
        }
    }
}

function freeSpaces(board) {
    freeSpace = [[], []];
    let r;
    for (let c = 0; c <= board.length; c++) {
        r = board.length - 1;
        if (board[r][c] == '') {
            freeSpace[0].push(r);
            freeSpace[1].push(c);
        } else {
            if (r-1 != -1 && board[r-1][c] == '') {
                freeSpace[0].push(r-1);
                freeSpace[1].push(c);
            } else {
                if (r-2 != -1 && board[r-2][c] == '') {
                    freeSpace[0].push(r-2);
                    freeSpace[1].push(c);
                } else {
                    if (r-3 != -1 && board[r-3][c] == '') {
                        freeSpace[0].push(r-3);
                        freeSpace[1].push(c);
                    } else {
                        if (r-4 != -1 && board[r-4][c] == '') {
                            freeSpace[0].push(r-4);
                            freeSpace[1].push(c);
                        } else {
                            if (r-5 != -1 && board[r-5][c] == '') {
                                freeSpace[0].push(r-5);
                                freeSpace[1].push(c);
                            }
                        }
                    }
                }
            } 
        }
    }
    return freeSpace;
}

function isSpaceFree(r, c) {
    if (board[r][c] == '') {
        return true;
    } else {
        return false;
    }
}

function checkWin(color) {
    // Horizontal
    for (let i = board.length - 1; i > -1; i--) {
        for (let n = 0; n < board[i].length; n++) {
            if (board[i][n] == color) {
                if (n+1 != board.length && board[i][n+1] == color) {
                    if (n+1 != board.length && board[i][n+2] == color) {
                        if (n+1 != board.length && board[i][n+3] == color) {
                            console.log(`${color} horizontal`, board);
                            return true;
                        }
                    }
                }
            }
        }
    }

    // Vertical
    for (let i = board.length - 1; i > -1; i--) {
        for (let n = 0; n < board[i].length; n++) {
            if (board[i][n] == color) {
                if (i-1 >= 0 && board[i-1][n] == color) {1
                    if (i-2 >= 0 && board[i-2][n] == color) {
                        if (i-3 >= 0 && board[i-3][n] == color) {
                            console.log(`${color} vertical`,  board);
                            return true;
                        }
                    }
                }
            }
        }
    }

    // Right Diagonal
    for (let i = board.length - 1; i > -1; i--) {
        for (let n = 0; n < board[i].length; n++) {
            if (board[i][n] == color) {
                if (i-1 >= 0 && n+1 != board.length && board[i-1][n+1] == color) {
                    if (i-2 >= 0 && n+2 != board.length && board[i-2][n+2] == color) {
                        if (i-3 >= 0 && n+3 != board.length && board[i-3][n+3] == color) {
                            console.log(`${color} rdia!`, board);
                            return true;
                        }
                    }
                }
            }
        }
    }

    // Left Diagonal
    for (let i = board.length - 1; i > -1; i--) {
        for (let n = 0; n < board[i].length; n++) {
            if (board[i][n] == color) {
                if (i-1 >= 0 && n-1 != board.length && board[i-1][n-1] == color) {
                    if (i-2 >= 0 && n-2 != board.length && board[i-2][n-2] == color) {
                        if (i-3 >= 0 && n-3 != board.length && board[i-3][n-3] == color) {
                            console.log(`${color} ldia!`, board);
                            return true;
                        }
                    }
                }
            }
        }
    }

    return false;
}
