var ROWS = 20;
var COLUMNS = 10;
var SIZE = 32;

(function() {
  'use strict';
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var App = window.Tetris.App = function() {};

  App.prototype.setup = function(canvas) {
    console.log('app starting');
    var board = new Tetris.Board();
    this.game = new Tetris.Game(board);
    this.game.startGame();

    console.log('app finished');
  };

}());
