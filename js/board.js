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
    var newxpos = x;
    var newypos = y;

    for (var i = 0, width = currentPiece.states[state].length; i < width; i++) {
      for (var j = 0, height = currentPiece.states[state][i].length; j < height; j++) {
        if(newxpos < 0 || newxpos >= COLUMNS) {
          valid = false;
          i = width;
          j = height;
        }
        if (this.grid[newypos] !== undefined &&
            this.grid[newypos][newxpos] !== 0 &&
            currentPiece.states[state][i] !== undefined && currentPiece.states[state][i][j] !== 0) {
          valid = false;
          i = width;
          j = height;
        }
        newxpos += 1;
      }
      newxpos = x;
      newypos += 1;

      if(newypos > ROWS) {
        valid = false;
        i = width;
      }
    }
    return valid;
  };

  Board.prototype.placePiece = function(piece) {
    var x = piece.gridx;
    var y = piece.gridy;
    var state = piece.currentState;

    var width = piece.states[state].length;
    for (var r = 0; r < width; r++) {
      var height = piece.states[state][r].length;
      for (var c = 0; c < height; c++) {
        if (piece.states[state][r][c] === 1 && y >= 0) {
          this.grid[y][x] = (piece.color + 1);
        }
        x += 1;
      }
      x = piece.gridx;
      y += 1;
    }

  app.game.board.lineCheck();
  };

  Board.prototype.lineCheck = function() {
    var gridWidth = COLUMNS - 1;
    var gridHeight = ROWS - 1;
    var fullRowCount = 0;

    for (var x = gridHeight; x >= 0; x--) {
      var fullRow = true;
      for (var y = gridWidth; y >= 0; y--) {
        // debugger;
        if(this.grid[x][y] === 0) {
          fullRow = false;
          // break;
        }
      }
      if(fullRow) {
        this.clearLine(x);
        x++;
      }
      fullRow = true;
    }
  };


  Board.prototype.clearLine = function (rowNumber) {
    var gridWidth = COLUMNS - 1;
    var rowLine = rowNumber;

    while (rowLine > 0) {
      for (var y = gridWidth; y >= 0; y--) {
        this.grid[rowLine][y] = this.grid[rowLine-1][y];
      }
      rowLine -= 1;
    }
  };
}());
