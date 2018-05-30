class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board(ctx);
    this.cell_size = 100;
    this.preview_piece_size = 100;
  }
  initialize() {
    this.setupPiecePreview();
    this.drawPiecePreview();
    this.board.draw();
    var startingPiece = this.getStartingPiece();
    this.board.placeStartPiece(startingPiece);
  }
  setupPiecePreview() {
    this.piece_preview = [];
    for (var i = 0; i < 5; i++) {
      this.piece_preview.push(this.getRandomPiece());
    }
  }
  getRandomPiece() {
    var piece_def = piece_defs[getRandomInt(piece_defs.length)];
    return new Piece(this.ctx, this.board, this.cell_size, piece_def);
  }
  drawPiecePreview() {
    var x = 0;
    var y = 80;
    var preview_piece_size = this.preview_piece_size;
    this.piece_preview.forEach(function(preview_piece) {
      preview_piece.draw(x, y);
      y += preview_piece_size;
    });
  }
  getNextPiece() {
    var piece = this.piece_preview.pop();
    this.piece_preview.unshift(this.getRandomPiece());
    this.drawPiecePreview();
    return piece;
  }
  getStartingPiece() {
    var starting_piece_def = start_piece_defs[getRandomInt(start_piece_defs.length)];
    return new Piece(this.ctx, this.board, this.cell_size, starting_piece_def);
  }
  click(x, y) {
    console.log('clicked ' + x + ', ' + y);
    var piece = this.getNextPiece();
    this.board.placeGamePiece(piece, x, y);
  }
  start() {
    this.board.startFilling();
  }
}
