(function() {
  'use strict';
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Game = window.Tetris.Game = function(board) {
    this.board = board;
  };

  Game.prototype.startGame = function() {
    console.log('game starting');
    gameOver = false;
    currentPiece = randomPiece();

    var raf;

    ["", "moz", "webkit", "ms", "o"].forEach(function(browser) {
      if (window[browser + "requestAnimationFrame"]) {
        raf = window[browser + "requestAnimationFrame"];
      }
    });

    window.requestAnimationFrame = raf;
    var move = setInterval(this.tick, INTERVAL);
  };

  Game.prototype.tick = function() {
    app.game.board.clear();

    if(app.game.board.validMove(currentPiece.gridx, currentPiece.gridy + 1, currentPiece.currentState)) {
      currentPiece.gridy += 1;
    }
      app.game.placePiece(currentPiece);
      // currentPiece = randomPiece();
    // }

    console.log(currentPiece.gridy);

  	ctx.clearRect(0, 0, 320, 640);

    app.game.drawBoard();
    app.game.drawPiece(currentPiece);
  };

  Game.prototype.placePiece = function(piece) {
    var x = piece.gridx;
    var y = piece.gridy;
    var state = piece.currentState;
    for (var r = 0, width = piece.states[state].length; r < width; r++) {
      for (var c = 0, height = piece.states[state][r].length; c < height; c++) {
        if (piece.states[state][r][c] === 1 && y >= 0) {
          this.board.grid[y][x] = (piece.color + 1);
        }
        x += 1;
      }
      x = piece.gridx;
      y += 1;
    }
  };

  Game.prototype.drawBoard = function() {
    ctx.drawImage(bgImg, 0, 0, 320, 640, 0, 0, 320, 640);
    for (var x = 0; x < ROWS; x++) {
      for (var y = 0; y < COLUMNS; y++) {
        if (this.board.grid[x][y] !== 0) {
          ctx.drawImage(blockImg, (this.board.grid[x][y] - 1) * SIZE, 0, SIZE, SIZE, y * SIZE, x * SIZE, SIZE, SIZE);
        }
      }
    }
  };

  Game.prototype.drawPiece = function(piece) {
    var drawX = piece.gridx;
    var drawY = piece.gridy;
    var state = piece.currentState;

    for (var i = 0, width = piece.states[state]; i < width; i++) {
      for (var j = 0, height = piece.states[state][i]; j < length; j++) {
        if (this.board.grid[x][y] === 1 && drawY >= 0) {
          ctx.drawImage(blockImg, piece.color * SIZE, 0, SIZE, SIZE, drawX * SIZE, drawY * SIZE, SIZE, SIZE);
        }
        i++;
      }
      drawX = piece.gridx;
      j++;
    }
  };

})();
