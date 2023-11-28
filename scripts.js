// Encapsulate the whole game, probably one instance needed
function Game(single = False) {
    // let human and computer (that chooses randomly) play.
}

// Handle board changes
function Board() {
    let board = [];

    for (let i = 0; i < 3; i++) {
        board[i] = [null, null, null];
    }

    const get = () => board;

    const clear = () => {
        board = board.map((row) => [null, null, null]);
    };

    const mark = (char, row, col) => (board[row][col] = char);

    return { get, clear, mark };
}

// Decide whose turn it is. Play rounds and stuff.
function Controller(playerOne) {
    const board = Board();
    let playerTwo = playerOne == "x" ? "o" : "x";

    let activePlayer = playerOne;

    const switchActivePlayer = () => (activePlayer = activePlayer == playerOne ? playerTwo : playerOne);

    const getActivePlayer = () => activePlayer;

    const play = (row, col) => {
        if (board.get()[row][col] == null) board.mark(getActivePlayer(), row, col);

        let winner = Winner(board.get());
        if (winner) {
            board.clear();
            return winner;
        }
        switchActivePlayer();
    };

    return { play };
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
