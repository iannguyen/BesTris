(function() {
  'use strict';
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Game = window.Tetris.Game = function(board) {
    this.board = board;
    this.score = 0;
    this.lines = 0;
    this.speed = 500;
  };

  Game.prototype.startGame = function() {
    gameOver = false;
    currentPiece = randomPiece();

    var raf;

    ["", "moz", "webkit", "ms", "o"].forEach(function(browser) {
      if (window[browser + "requestAnimationFrame"]) {
        raf = window[browser + "requestAnimationFrame"];
      }
    });

    window.requestAnimationFrame = raf;
    window.requestAnimationFrame(app.game.tick);
  };

  Game.prototype.restartGame = function () {
    $(document).off("keydown");
    $("#game-retry").attr("class", "hidden");
    var view = new Tetris.View();
    window.onload = view.onReady();
    gameOver = false;
  };

  Game.prototype.updateScore = function (lineCount) {
    if (lineCount > 0 &&
       (lineCount + (app.game.lines % 5)) >= 5) {
      app.game.speed /= 1.2;
    }
    if (lineCount > 1) {
      app.game.score += (1000 * lineCount) + (500 * (lineCount-1));
    } else {
      app.game.score += 250;
    }
    app.game.lines += lineCount;
  };

  Game.prototype.tick = function() {
    currentTime = new Date().getTime();

    if (dropped) {
      app.game.board.placePiece(currentPiece);
      dropped = false;
      currentPiece = randomPiece();
    } else {
      if (currentTime - previousTime > app.game.speed) {
        if(app.game.board.validMove(currentPiece.gridx, currentPiece.gridy + 1, currentPiece.currentState)) {
          currentPiece.gridy += 1;
        } else {
          app.game.board.placePiece(currentPiece);
          currentPiece = randomPiece();
        }
        previousTime = currentTime;
      }
    }

  	ctx.clearRect(0, 0, 320, 640);
    ctx.globalAlpha = 0.75;
    app.game.drawBoard();
    ctx.globalAlpha = 1;
    app.game.drawPiece(currentPiece);

    app.game.renderStats();

    if (gameOver === false) {
      requestAnimationFrame(app.game.tick);
    } else {
      $("p#game-retry").removeClass("hidden").addClass("game-retry");
      $(document).off("keydown");
      $(document).on("keydown", function(e) {
        e.preventDefault();
        if(e.which === 13) {
          app.game.restartGame();
        }
      });
    }
  };

  Game.prototype.renderStats = function () {
    $("#points").text(app.game.score.toString());
    $("#lines").text(app.game.lines.toString());
    $("#speed").text(app.game.speed.toFixed(2) + "ms");
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

    for (var i = 0, width = piece.states[state].length; i < width; i++) {
      for (var j = 0, height = piece.states[state][i].length; j < height; j++) {
        if (piece.states[state][i][j] === 1 && drawY >= 0) {
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

  Game.prototype.wallKick = function (piece, newState) {
    var shift = 0;
    if (piece.gridy < 19 && piece.gridx > 0) {
      while(shift < COLUMNS) {
        if(app.game.board.validMove(currentPiece.gridx-shift, currentPiece.gridy, newState)) {
          piece.gridx -= shift;
          piece.currentState = newState;
          break;
        } else {
          shift++;
        }
      }
    } else {
      return;
    }
  };

  Game.prototype.handleLineRotation = function (piece, newState) {
    var line = piece;
    if (line.currentState === 0 &&
        app.game.board.validMove(line.gridx-1, line.gridy, newState)) {
      line.gridx--;
      line.currentState = newState;
    } else if (line.currentState === 1 &&
      app.game.board.validMove(line.gridx+1, line.gridy, newState)){
      line.gridx++;
      line.currentState = newState;
    }
  };
})();
