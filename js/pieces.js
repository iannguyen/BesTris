LPiece = function() {
  this.state1 = [
    [1, 0],
    [1, 0],
    [1, 1]
  ];

  this.state2 = [
    [0, 0, 1],
    [1, 1, 1]
  ];

  this.state3 = [
    [1, 1],
    [0, 1],
    [0, 1]
  ];

  this.state4 = [
    [1, 1, 1],
    [1, 0, 0]
  ];

  this.states = [this.state1, this.state2, this.state3, this.state4, ];

  this.currentState = 0;

  this.color = 0;
  this.gridx = 4;
  this.gridy = -4;
};

ReversedLPiece = function() {
  this.state1 = [
    [0, 1],
    [0, 1],
    [1, 1]
  ];

  this.state2 = [
    [1, 1, 1],
    [1, 0, 0]
  ];

  this.state3 = [
    [1, 1],
    [1, 0],
    [1, 0]
  ];

  this.state4 = [
    [1, 0, 0],
    [1, 1, 1]
  ];

  this.states = [this.state1, this.state2, this.state3, this.state4, ];

  this.currentState = 0;

  this.color = 0;
  this.gridx = 4;
  this.gridy = -2;
};

BlockPiece = function() {
  this.state1 = [
    [1, 1],
    [1, 1]
  ];

  this.states = [this.state1];

  this.color = 0;
  this.gridx = 4;
  this.gridy = -2;
};

LinePiece = function() {
  this.state1 = [
    [1],
    [1],
    [1],
    [1]
  ];

  this.state2 = [
    [1, 1, 1, 1]
  ];

  this.states = [this.state1, this.state];
  this.currentState = 0;
  this.gridx = 4;
  this.gridy = -2;
};

TPiece = function() {
  this.state1 = [
    [0, 1, 0],
    [1, 1, 1]
  ];

  this.state2 = [
    [0, 1],
    [1, 1],
    [0, 1]
  ];

  this.state3 = [
    [1, 1, 1],
    [0, 1, 0]
  ];

  this.state4 = [
    [1, 0],
    [1, 1],
    [1, 0]
  ];

  this.states = [this.state1, this.state2, this.state3, this.state4];

  this.currentState = 0;

  this.color = 0;
  this.gridx = 4;
  this.gridy = -2;
};

ZPiece = function() {
  this.state1 = [
    [1, 1, 0],
    [0, 1, 1]
  ];

  this.state1 = [
    [0, 1],
    [1, 1],
    [1, 0]
  ];

  this.states = [this.state1, this.state2];

  this.currentState = 0;

  this.color = 0;
  this.gridx = 4;
  this.gridy = -2;
};

ReversedZPiece = function() {
  this.state1 = [
    [0, 1, 1],
    [1, 1, 0]
  ];

  this.state1 = [
    [1, 0],
    [1, 1],
    [0, 1]
  ];

  this.states = [this.state1, this.state2];

  this.currentState = 0;

  this.color = 0;
  this.gridx = 4;
  this.gridy = -2;
};

randomPiece = function() {
  var index = Math.floor(Math.random() * 7);
  var piece;

  switch (index) {
    case 0:
      piece = new LPiece();
      break;
    case 1:
      piece = new ReversedLPiece();
      break;
    case 2:
      piece = new BlockPiece();
      break;
    case 3:
      piece = new LinePiece();
      break;
    case 4:
      piece = new TPiece();
      break;
    case 5:
      piece = new ZPiece();
      break;
    case 6:
      piece = new ReversedZPiece();
      break;
  }

  piece.color = Math.floor(Math.floor(Math.random() * 8));
  return piece;
};
