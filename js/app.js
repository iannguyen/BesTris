(function() {
  'use strict';
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var App = window.Tetris.App = function() {};

  App.prototype.setup = function(canvas) {
    var board = new Tetris.Board();
    this.game = new Tetris.Game(board);
    this.game.startGame();
  };

}());
