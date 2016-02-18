# [BesTris][site]


[Live][site]
[site]: https://iannguyen.github.io/bestris/index.html


![screenshot]
[screenshot]: ./images/bestris.gif


The best Tetris game you'll play.

### How To play

...Really?

### Game Features

- COMPLETELY random Terminos. Choose your moves carefully. `LinePieces` may not be there to save you.
- `WallKick` enables you to rotate your pieces even if they are against a wall.
- Points are rewarded for every Termino you place, every line cleared, and bonus points per additional line cleared.

JUST PLAY IT!

### Code Spotlight

##### The WallKick

![up_key]
[up_key]: ./images/up_key.png

- A feature many Tetris lovers take for granted is the ability to rotate the `terminos` when it is against the wall. When pressing the `up_arrow` key, the `termino` will rotate and change its state. Originally, when the `termino` is against the right wall, it wouldn't rotate because part of the piece would be outside the `board` boundaries, thus making it not a `valid_move`.

![wall_kick]
[wall_kick]: ./images/wall_kick.png

- I solved this with a `wallkick`. At first, a while loop is initiated. The `shift` variable represents the `x` coordinate amount to the left that the piece must shift over until it becomes a `valid_move`.
- At the same time, to prevent the `termino` from flying across the board, `shift` stops incrementing as soon as a `valid_move` is possible while still being in the boundaries of the board. If a `valid_move` is not possible, the `termino` does not rotate.

### Todo

- Allow moves to be chained together for additional points.
- Add `next piece` canvas.
- Add difficulty presets from the start.
