var getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
}

var fillPolygon = (ctx, line1, line2, x_offset, y_offset, color) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(line1[0].x + x_offset, line1[0].y + y_offset);
  ctx.lineTo(line1[1].x + x_offset, line1[1].y + y_offset);
  ctx.lineTo(line2[1].x + x_offset, line2[1].y + y_offset);
  ctx.lineTo(line2[0].x + x_offset, line2[0].y + y_offset);
  ctx.closePath();
  ctx.fill();
}
