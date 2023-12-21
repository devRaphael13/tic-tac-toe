document.addEventListener("DOMContentLoaded", Game);

function Game() {
    const board = Board();
    board.createBoard();

    const controller = Controller(board);
    controller.setPlayers("x", "o");
    controller.setUpBoard();
}

// Handle board changes
function Board() {
    let board = [];

    const createBoard = () => {
        for (let i = 0; i < 3; i++) {
            board[i] = [null, null, null];
        }
    };

    const getBoard = () => board;

    const clearBoard = () => {
        board = board.map((row) => [null, null, null]);
    };

    const markBoard = (char, row, col) => (board[row][col] = char);

    return { getBoard, clearBoard, markBoard, createBoard };
}

// Decide whose turn it is. Play rounds and stuff.
function Controller(board) {
    let players = {};
    let activePlayer = null;
    let roundWinner = null;

    const setPlayers = (choice1, choice2) => {
        players.playerOne = choice1;
        players.playerTwo = choice2;
        activePlayer = players.playerOne;
    };

    const getPlayers = () => players;

    const setUpBoard = () => {
        const points = document.getElementsByClassName("point");

        for (let point of points) {
            let cord = point.dataset.cord.split("").map((n) => Number.parseInt(n));
            point.addEventListener("click", () => {
                play(...cord);
            });
        }
    };

    const getWinner = () => roundWinner;

    const switchActivePlayer = () => (activePlayer = activePlayer == players.playerOne ? players.playerTwo : players.playerOne);

    const getActivePlayer = () => activePlayer;

    const play = (row, col) => {
        if (board.getBoard()[row][col] == null) board.markBoard(getActivePlayer(), row, col);

        let winner = Winner(board.getBoard());
        if (winner) {
            board.clearBoard();
            roundWinner = winner;
        }
        switchActivePlayer();
    };

    return { play, getActivePlayer, setPlayers, setUpBoard, getPlayers, getWinner };
}

// Gets the character of the winning player
function Winner(board) {
    let res;

    const allEqual = (arr) => {
        if (arr.every((val) => val != null && val === arr[0])) return arr[0];
        else return null;
    };

    const checkRow = () => board.map((row) => allEqual(row));
    const checkCol = () => {
        let res = [];
        for (let i = 0; i < 3; i++) {
            res.push(allEqual([board[0][i], board[1][i], board[2][i]]));
        }
        return res;
    };

    const checkDiag = () => {
        let res = [allEqual([board[0][0], board[1][1], board[2][2]]), allEqual([board[0][2], board[1][1], board[2][0]])];
        return res;
    };

    res = checkRow()
        .concat(checkCol(), checkDiag())
        .filter((char) => char != null);

    return res.length > 0 ? res[0] : null;
}

function Display() {} // Shows the UI.
