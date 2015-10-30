(function() {
  'use strict';
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Game = window.Tetris.Game = function(board) {
    this.board = board;
    // this.pieces = [];
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
    // var gogo = setInterval(app.game.tick, 500);
    window.requestAnimationFrame(app.game.tick);
  };

  Game.prototype.tick = function() {
    currentTime = new Date().getTime();

    if (currentTime - previousTime > 100) {
      if(app.game.board.validMove(currentPiece.gridx, currentPiece.gridy + 1, currentPiece.currentState)) {
        currentPiece.gridy += 1;
      } else {
        app.game.placePiece(currentPiece);
        currentPiece = randomPiece();
      }
      previousTime = currentTime;
    }

    console.log(currentPiece.gridy);

  	ctx.clearRect(0, 0, 320, 640);
    app.game.drawBoard();
    app.game.drawPiece(currentPiece);

    if (gameOver === false) {
      requestAnimationFrame(app.game.tick);
    }
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
    debugger;
    var drawX = piece.gridx;
    var drawY = piece.gridy;
    var state = piece.currentState;

    for (var i = 0, width = piece.states[state].length; i < width; i++) {
      for (var j = 0, height = piece.states[state][i].length; j < height; j++) {
        debugger;
        if (piece.states[state][i][j] === 1 && drawY >= 0) {
          debugger;
  				ctx.drawImage(blockImg,
                        piece.color * SIZE, 0, SIZE, SIZE,
                        drawX * SIZE, drawY * SIZE, SIZE, SIZE);
        }
        drawX += 1;
      }
      drawX = piece.gridx;
      drawY += 1;
    }
  };

})();
