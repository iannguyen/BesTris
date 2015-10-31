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
    };

})();
