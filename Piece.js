class Piece {
  // definition is an object with the following properties
  // [pipe_polygon] is an array of coordinates which defines the polygon that forms the outline of the pipe
  // [fill_lines] is a dictionary of coordinate pairs, with the keys being the sides (top, bottom, left, right)
  // 'top' is the pairs of coordinates defining the sides of the pipe, ordered as if the goo was entering the pipe from the top side
  // the same pairs of coordinates are repeated for each side of the piece, but in a different order
  // [adjacent_entry_sides] are the sides to enter from for goo entering the adjacent piece, usually the same except for elbows
  constructor(ctx, board, cell_size, definition) {
    this.ctx = ctx;
    this.board = board;
    this.cell_size = cell_size;
    this.name = definition.name;
    this.pipe_polygon = definition.pipe_polygon;
    this.fill_lines = definition.fill_lines;
    this.adjacent_entry_sides = definition.adjacent_entry_sides;
    this.entry_side = definition.entry_side;
  }
  draw(x, y, col, row) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.row = row;
    console.log(`drawing piece at ${x}, ${y}`)

    // clear the piece (in case there was one already there)
    ctx.fillStyle = '#d2d2d2';
    ctx.fillRect(x, y, this.cell_size, this.cell_size);

    // draw the outline
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#fff';
    ctx.beginPath();
    // move to bottom left corder
    ctx.moveTo(x + 1, y + this.cell_size - 1);
    // line to top left corner
    ctx.lineTo(x + 1, y + 1);
    // line to top right corner
    ctx.lineTo(x + this.cell_size - 1, y + 1);
    ctx.stroke();
    ctx.strokeStyle = '#999';
    ctx.beginPath();
    // move to bottom left corner
    ctx.moveTo(x + 1, y + this.cell_size - 1);
    // line to bottom right corner
    ctx.lineTo(x + this.cell_size - 1, y + this.cell_size - 1);
    // line to top right corner
    ctx.lineTo(x + this.cell_size - 1, y + 1);
    ctx.stroke();
    ctx.lineWidth = 1;

    // draw the pipe
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(this.pipe_polygon[0].x + x + 1, this.pipe_polygon[0].y + y + 1);
    for (var i = 1; i < this.pipe_polygon.length; i++) {
      ctx.lineTo(this.pipe_polygon[i].x + x + 1, this.pipe_polygon[i].y + y + 1);
    }
    ctx.closePath();
    ctx.fill();
  }
  fillWithGoo(from_side, done_callback) {
    var fill = fill_lines => {
      var startFill = (coord_index) => {

        if (coord_index >= fill_lines.length - 1) {
          done_callback(this.adjacent_entry_sides[from_side]);
          return;
        }

        if (coord_index >= 0) {
          var cur = fill_lines[coord_index];
          var next = fill_lines[coord_index + 1];
          ctx.fillStyle = '#0f0';
          ctx.beginPath();
          ctx.moveTo(cur[0].x + this.x + 1, cur[0].y + this.y + 1);
          ctx.lineTo(cur[1].x + this.x + 1, cur[1].y + this.y + 1);
          ctx.lineTo(next[1].x + this.x + 1, next[1].y + this.y + 1);
          ctx.lineTo(next[0].x + this.x + 1, next[0].y + this.y + 1);
          ctx.closePath();
          ctx.fill();
        }

        setTimeout(() => startFill(coord_index + 1), 100);
      };
      startFill(0);
    };
    var fill_lines = this.fill_lines[from_side];
    if (!fill_lines || fill_lines.length < 2) {
      console.log(`${this.name} has no entry from ${from_side}`);
      return;
    }
    fill(fill_lines);
  }
}
