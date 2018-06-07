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
    ctx.moveTo(this.pipe_polygon[0].x + x, this.pipe_polygon[0].y + y);
    for (var i = 1; i < this.pipe_polygon.length; i++) {
      ctx.lineTo(this.pipe_polygon[i].x + x, this.pipe_polygon[i].y + y);
    }
    ctx.closePath();
    ctx.fill();
  }
  fillWithGoo(from_side, done) {
    var fillSegment = (lineA, lineB, done) => {
      var dst = lineDist(lineA, lineB);
      if (dst > 5) {
        console.log('distance between lines > 5: ' + dst);
        console.log(JSON.stringify(lineA));
        console.log(JSON.stringify(lineB));
        var midLine = lineMid(lineA, lineB);
        fillSegment(lineA, midLine, () => fillSegment(midLine, lineB, done));
      } else {
        console.log('>>>> filling ' + new Date().getTime());
        console.log(JSON.stringify(lineA));
        console.log(JSON.stringify(lineB));
        console.log('++++ done filling');
        fillPolygon(this.ctx, lineA, lineB, this.x, this.y, '#0f0');
        console.log('next should be at ' + ((new Date().getTime()) + 50));
        setTimeout(done, 50);
      }
    };
    var fill_lines = this.fill_lines[from_side];
    var fill = (coord_index) => {
      if (coord_index >= fill_lines.length - 1) {
        done(this.adjacent_entry_sides[from_side]);
        return;
      }

      var cur = fill_lines[coord_index];
      var next = fill_lines[coord_index + 1];

      fillSegment(cur, next, () => fill(coord_index + 1));
    };

    if (!fill_lines || fill_lines.length === 0) {
      console.log(`${this.name} has no entry from ${from_side}`);
      return;
    }
    fill(0);
  }
}
