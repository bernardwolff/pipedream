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

var midPt = (ptA, ptB) => {
  return {x: (ptA.x + ptB.x) / 2, y: (ptA.y + ptB.y) / 2};
};

var distPt = (ptA, ptB) => {
  return Math.sqrt(Math.pow(ptB.x - ptA.x, 2) + Math.pow(ptB.y - ptA.y, 2));
};

var lineDist = (lineA, lineB) => {
  return Math.max(distPt(lineA[0], lineB[0]), distPt(lineA[1], lineB[1]));
};

var lineMid = (lineA, lineB) => {
  return [midPt(lineA[0], lineB[0]), midPt(lineA[1], lineB[1])];
};
