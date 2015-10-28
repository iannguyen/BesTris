(function() {
  'use strict';
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Game = window.Tetris.Game = function(board) {
    this.board = board;
  };

    Game.prototype.startGame = function() {
      //requestAnimationFrame stuff
      currentPiece = randomPiece();
      this.update();
    };

    Game.prototype.turn = function() {

    };

    Game.prototype.update = function() {
      currentTime = new Date().getTime();

      if (currentTime - previousTime > 500) {
        //update game piece;
        previousTime = currentTime;
      }

      ctx.clearRect(0, 0, 320, 640);
      this.drawBoard();
      this.drawPiece(currentPiece);
    };

    Game.prototype.drawBoard = function () {
      ctx.drawImage(bgImg, 0, 0, 320, 640, 0, 0, 320, 640);
      for (var x = 0; x < ROWS; x++) {
        for (var y = 0; y < COLUMNS; y++) {
          // if this.board[x][y]
        }
      }
    };

    Game.prototype.drawPiece = function (piece) {
      this.drawX = piece.gridX;
      this.drawY = piece.gridY;
      var state = piece.currentState;
    };

})();
