var app, canvas, ctx, blockImg, bgImg, currentPiece, imgLoader, previousTime, currentTime, gameOver, lineView, dropped;

(function() {
  'use strict';
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var View = window.Tetris.View = function() {
  };

    View.prototype.onReady = function() {
      bgImg = document.getElementById("background");
      blockImg = document.getElementById("blocks");
      canvas = document.getElementById("gameCanvas");
      ctx = canvas.getContext("2d");
      previousTime = currentTime = 0;
      this.setup();
    };

    View.prototype.setup = function() {
      app = new Tetris.App();
      app.setup(canvas);
      $(document).on("keydown", function(e) {
        this.playerInput(e);
      }.bind(this));
    };

    View.prototype.playerInput = function(e) {
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


})();
