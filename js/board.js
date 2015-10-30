(function() {
  'use strict';
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Board = window.Tetris.Board = function() {
    this.grid = this.initBoard();
    console.log('board initialized');
  };

  Board.prototype.initBoard = function() {
    var grid = [];
    for (var x = 0; x < ROWS; x++) {
      grid[x] = [];
      for (var y = 0; y < COLUMNS; y++) {
        grid[x].push(0);
      }
    }
    return grid;
  };

  Board.prototype.validMove = function (x, y, state) {
    var valid = true;
    var newx = x;
    var newy = y;

    for (var i = 0, width = currentPiece.states[state].length; i < width; i++) {
      for (var j = 0, height = currentPiece.states[state][i].length; j < height; j++) {
        if(newx < 0 || newx >= COLUMNS) {
          valid = false;
          i = width;
          j = height;
        }
        if (this.grid[newy] !== undefined && this.grid[newy][newx] !== 0 && currentPiece.states[state][i] !== undefined && currentPiece.states[state][i][j] !== 0) {
          valid = false;
          i = width;
          j = height;
        }
        newx += 1;
      }
      newx = x;
      newy += 1;

      if(newy > ROWS) {
        valid = false;
        i = width;
      }
    }
    console.log(valid);
    return valid;
  };

  Board.prototype.placePiece = function(piece) {
    var x = piece.gridx;
    var y = piece.gridy;
    var state = piece.currentState;

    for (var r = 0, width = piece.states[state].length; r < width; r++) {
      for (var c = 0, height = piece.states[state][r].length; c < height; c++) {
        if (piece.states[state][r][c] === 1 && y >= 0) {
          this.grid[y][x] = (piece.color + 1);
        }
        x += 1;
      }
      x = piece.gridx;
      y += 1;
    }
  };

}());
