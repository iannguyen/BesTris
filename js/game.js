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
    document.onkeydown = this.playerInput;

    var raf;

    ["", "moz", "webkit", "ms", "o"].forEach(function(browser) {
      if (window[browser + "requestAnimationFrame"]) {
        raf = window[browser + "requestAnimationFrame"];
      }
    });

    window.requestAnimationFrame = raf;
    window.requestAnimationFrame(app.game.tick);
  };

  Game.prototype.tick = function() {
    currentTime = new Date().getTime();

    if (dropped) {
      app.game.board.placePiece(currentPiece);
      dropped = false;
      currentPiece = randomPiece();
    } else {
      if (currentTime - previousTime > SPEED) {
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

    if (gameOver === false) {
      requestAnimationFrame(app.game.tick);
    } else {
      ctx.drawImage(gameOverImg, 0,0,320,640);
    }
  };

  Game.prototype.playerInput = function(e) {
    e.preventDefault();
    switch(e.keyCode) {
      case 32:
      if (currentPiece.gridy < 0) {
        return;
      } else {
      var rowLine = currentPiece.gridy;
      while(app.game.board.validMove(currentPiece.gridx, rowLine + 1, currentPiece.currentState)) {
        rowLine += 1;
      }
      currentPiece.gridy = rowLine;
      // debugger;
      dropped = true;
      }
      break;
      case 37:
      if(app.game.board.validMove(currentPiece.gridx-1, currentPiece.gridy, currentPiece.currentState)) {
        currentPiece.gridx -= 1;
      }
        break;
      case 38:
      var newState;
      if(currentPiece.currentState === currentPiece.states.length - 1) {
        newState = 0;
      } else {
        newState = currentPiece.currentState+1;
      }

      if(currentPiece instanceof(LinePiece)) {
      // debugger;
      app.game.handleLineRotation(currentPiece, newState);
      }
      if(app.game.board.validMove(currentPiece.gridx, currentPiece.gridy, newState)) {
        currentPiece.currentState = newState;
      } else {
        app.game.wallKick(currentPiece, newState);
      }
      break;
      case 39:
      if(app.game.board.validMove(currentPiece.gridx+1, currentPiece.gridy, currentPiece.currentState)) {
        currentPiece.gridx += 1;
      }
        break;
      case 40:
      if(app.game.board.validMove(currentPiece.gridx, currentPiece.gridy+1, currentPiece.currentState)) {
        currentPiece.gridy += 1;
        break;
      }
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
