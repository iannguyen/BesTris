(function() {
  'use strict';
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Board = window.Tetris.Board = function() {};

  Board.prototype.initBoard = function(canvas) {
    var grid = [];
    for (var x = 0; x < ROWS; x++) {
      grid[x] = [];
      for (var y = 0; y < COLUMNS; y++) {
        grid[x].push(0);
      }
    }
    this.grid = grid;
  };

}());
