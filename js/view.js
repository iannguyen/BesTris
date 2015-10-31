var app, canvas, ctx, blockImg, bgImg, currentPiece, imgLoader, previousTime, currentTime, gameOver, lineView, currentLines, dropped;

(function() {
  'use strict';
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var View = window.Tetris.View = function() {
  };

    View.prototype.onReady = function() {
      imgLoader = new BulkImageLoader();
      imgLoader.addImage("blocks.png");
      imgLoader.addImage("bg.png", "bg");
      imgLoader.onReadyCallback = this.onImagesLoaded;
      imgLoader.loadImages();
      canvas = document.getElementById("gameCanvas");
      ctx = canvas.getContext("2d");

      previousTime = currentTime = 0;
    };

    View.prototype.onImagesLoaded = function(e) {
      blockImg = imgLoader.getImageAtIndex(0);
      bgImg = imgLoader.getImageAtIndex(1);
      app = new Tetris.App();
      app.setup(canvas);
    };

})();
