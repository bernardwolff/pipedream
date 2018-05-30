class Board {
  constructor(ctx) {
    // cells is a two-dimensional array of pieces. cells without a piece are null.
    this.cells = [];
    this.num_cols = 10;
    this.num_rows = 7;
    // cell_size is the width and height of the (square) cells in pixels
    this.cell_size = 100;
    // the x and y offsets of the board on the canvas
    this.x_offset = 110;
    this.y_offset = 10;
    this.clear();
    this.ctx = ctx;
  }
  clear() {
    for (var i = 0; i < this.num_cols; i++) {
      var column = [];
      for (var j = 0; j < this.num_rows; j++) {
        column.push(null);
      }
      this.cells.push(column);
    }
  }
  draw() {
    var board_width = this.cell_size * this.num_cols;
    var board_height = this.cell_size * this.num_rows;

    // draw the background
    ctx.fillStyle = '#d2d2d2';
    ctx.fillRect(this.x_offset, this.y_offset, board_width, board_height);

    // draw the grid
    ctx.lineWidth = 2;
    for (var i = 1; i < this.num_cols; i++) {
      var x = this.x_offset + i * this.cell_size;
      ctx.strokeStyle = '#fff';
      ctx.beginPath();
      ctx.moveTo(x-1, this.y_offset - 5);
      ctx.lineTo(x-1, this.y_offset + board_height + 5);
      ctx.stroke();
      ctx.strokeStyle = '#999';
      ctx.beginPath();
      ctx.moveTo(x+1, this.y_offset - 5);
      ctx.lineTo(x+1, this.y_offset + board_height + 5);
      ctx.stroke();
    }

    for (var i = 1; i < this.num_rows; i++) {
      var y = this.y_offset + i * this.cell_size;
      ctx.strokeStyle = '#fff';
      ctx.beginPath();
      ctx.moveTo(this.x_offset, y-1);
      ctx.lineTo(this.x_offset + board_width + 5, y-1);
      ctx.stroke();
      ctx.strokeStyle = '#999';
      ctx.beginPath();
      ctx.moveTo(this.x_offset, y+1);
      ctx.lineTo(this.x_offset + board_width + 5, y+1);
      ctx.stroke();
    }

    // draw the border
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 5;
    ctx.strokeRect(this.x_offset-3, this.y_offset-3, board_width+5, board_height+5);

    // reset the line width
    ctx.lineWidth = 1;
  }
  getCol(mouse_x) {
    return Math.floor((mouse_x - this.x_offset) / this.cell_size);
  }
  getRow(mouse_y) {
    return Math.floor((mouse_y - this.y_offset) / this.cell_size);
  }
  placePiece(piece, col, row) {
    console.log(`placing piece at row ${row}, col ${col}`);
    if (row > this.num_rows || col > this.num_cols) return;
    if (this.cells[col][row]) {
      if (this.cells[col][row] === this.start_piece) {
        console.log('cannot replace start piece');
        return;
      }
      console.log(`replacing piece at ${row}, col ${col}`);
    }
    this.cells[col][row] = piece;
    piece.draw(col * this.cell_size + this.x_offset, row * this.cell_size + this.y_offset, col, row);
  }
  placeStartPiece(piece) {
    var col = 0;
    var row = 0;
    switch (piece.entry_side) {
      case 'top':
        col = getRandomInt(this.num_cols);
        row = getRandomInt(this.num_rows - 1);
        break;
      case 'bottom':
        col = getRandomInt(this.num_cols);
        row = getRandomInt(this.num_rows - 1) + 1;
        break;
      case 'left':
        col = getRandomInt(this.num_cols - 1);
        row = getRandomInt(this.num_rows);
        break;
      case 'right':
        col = getRandomInt(this.num_cols - 1) + 1;
        row = getRandomInt(this.num_rows);
        break;
    }
    this.placePiece(piece, col, row);
    this.start_piece = piece;
  }
  placeGamePiece(piece, x, y) {
    var col = this.getCol(x);
    var row = this.getRow(y);
    this.placePiece(piece, col, row);
  }
  getPieceAt(x, y) {
    var col = this.getCol(x);
    var row = this.getRow(y);
    return this.cells[col][row];
  }
  getAdjacentPiece(col, row, enter_from) {
    console.log(`getAdjacentPiece(${col},${row},${enter_from})`);
    switch (enter_from) {
      case 'top':
        var newRow = (row + 1) % this.num_rows;
        return this.cells[col][newRow];
        break;
      case 'bottom':
        var newRow = row - 1;
        if (newRow < 0) newRow = this.num_rows - 1;
        return this.cells[col][newRow];
        break;
      case 'right':
        var newCol = col - 1;
        if (newCol < 0) newCol = this.num_cols - 1;
        return this.cells[newCol][row];
        break;
      case 'left':
        var newCol = (col + 1) % this.num_cols;
        return this.cells[newCol][row];
        break;
    }
  }
  startFilling(startPiece, entry_side) {
    var piece = startPiece || this.start_piece;
    var side = entry_side || this.start_piece.entry_side;
    piece.fillWithGoo(side, (new_side) => {
      var adjacentPiece = this.getAdjacentPiece(piece.col, piece.row, new_side);
      console.log('adjacentPiece: ' + adjacentPiece);
      if (adjacentPiece) {
        console.log('filling adjacentPiece from side: ' + new_side);
        this.startFilling(adjacentPiece, new_side);
      } else {
        // check if we've filled the required number of pieces for this level
        // if not, splurge
      }
    });
  }
}
