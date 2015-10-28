var ROWS = 10;
var COLUMNS = 20;
var SIZE = 32;

(function() {
  'use strict';
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var App = window.Tetris.App = function() {};

  App.prototype.setup = function(canvas) {
    console.log('app starting');

    this.board = new Tetris.Board(canvas);
    this.game = new Tetris.Game();
    this.game.startGame(this.board);
    debugger;
  };

}());
