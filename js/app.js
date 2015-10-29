var ROWS = 20;
var COLUMNS = 10;
var SIZE = 32;
var INTERVAL = 500;

(function() {
  'use strict';
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var App = window.Tetris.App = function() {};

  App.prototype.setup = function(canvas) {
    console.log('app starting');
    this.board = new Tetris.Board(canvas);
    this.game = new Tetris.Game(this.board);
    this.game.startGame();

    console.log('app finished');
  };

}());
