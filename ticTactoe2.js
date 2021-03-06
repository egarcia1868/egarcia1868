'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let playerTurn = 'X';
let prevPlayerTurn = 'O';

function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

function horizontalWin() {
  if ((board[0][0] === prevPlayerTurn && board[0][1] === prevPlayerTurn && board[0][2] === prevPlayerTurn) ||
    (board[1][0] === prevPlayerTurn && board[1][1] === prevPlayerTurn && board[1][2] === prevPlayerTurn) ||
    (board[2][0] === prevPlayerTurn && board[2][1] === prevPlayerTurn && board[2][2] === prevPlayerTurn)) {
    return true
  } else {
    return false
  }
}

function verticalWin() {
  if ((board[0][0] === prevPlayerTurn && board[1][0] === prevPlayerTurn && board[2][0] === prevPlayerTurn) ||
    (board[0][1] === prevPlayerTurn && board[1][1] === prevPlayerTurn && board[2][1] === prevPlayerTurn) ||
    (board[0][2] === prevPlayerTurn && board[1][2] === prevPlayerTurn && board[2][2] === prevPlayerTurn)) {
    return true
  } else {
    return false
  }
}

function diagonalWin() {
  if ((board[0][0] === prevPlayerTurn && board[1][1] === prevPlayerTurn && board[2][2] === prevPlayerTurn) ||
    (board[2][0] === prevPlayerTurn && board[1][1] === prevPlayerTurn && board[0][2] === prevPlayerTurn)) {
      return true
    } else {
      return false
    }
  }

function checkForWin() {
  if (diagonalWin() || verticalWin() || horizontalWin()) {
    return true
  }
}

function ticTacToe(row, column) {
    board[row][column] = playerTurn;
    if (playerTurn === 'X') {
      playerTurn = 'O'
      prevPlayerTurn = 'X'
    } else {
      playerTurn = 'X'
      prevPlayerTurn = 'O'
    }
  }

function getPrompt() {
    printBoard();
    console.log("It's Player " + playerTurn + "'s turn.");
    rl.question('row: ', (row) => {
      rl.question('column: ', (column) => {
        ticTacToe(row, column);
        if (checkForWin() === true) {
          printBoard();
          console.log(prevPlayerTurn + ' wins!')
        } else {
          getPrompt()
        }
      });
    });

  }



  // Tests

  if (typeof describe === 'function') {

    describe('#ticTacToe()', () => {
      it('should place mark on the board', () => {
        ticTacToe(1, 1);
        assert.deepEqual(board, [
          [' ', ' ', ' '],
          [' ', 'X', ' '],
          [' ', ' ', ' ']
        ]);
      });
      it('should alternate between players', () => {
        ticTacToe(0, 0);
        assert.deepEqual(board, [
          ['O', ' ', ' '],
          [' ', 'X', ' '],
          [' ', ' ', ' ']
        ]);
      });
      it('should check for vertical wins', () => {
        board = [
          [' ', 'X', ' '],
          [' ', 'X', ' '],
          [' ', 'X', ' ']
        ];
        assert.equal(verticalWin(), true);
      });
      it('should check for horizontal wins', () => {
        board = [
          ['X', 'X', 'X'],
          [' ', ' ', ' '],
          [' ', ' ', ' ']
        ];
        assert.equal(horizontalWin(), true);
      });
      it('should check for diagonal wins', () => {
        board = [
          ['X', ' ', ' '],
          [' ', 'X', ' '],
          [' ', ' ', 'X']
        ];
        assert.equal(diagonalWin(), true);
      });
      it('should detect a win', () => {
        assert.equal(checkForWin(), true);
      });
    });
  } else {

    getPrompt();

  }
