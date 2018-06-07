var cross =  {
  name: 'cross',
  pipe_polygon: [
    {x:  45, y:   0},
    {x:  45, y:  45},
    {x:   0, y:  45},
    {x:   0, y:  55},
    {x:  45, y:  55},
    {x:  45, y: 100},
    {x:  55, y: 100},
    {x:  55, y:  55},
    {x: 100, y:  55},
    {x: 100, y:  45},
    {x:  55, y:  45},
    {x:  55, y:   0},
  ],
  fill_lines: {
    top: [
      [{x: 45, y:   0}, {x: 55, y:   0}],
      [{x: 45, y: 100}, {x: 55, y: 100}],
    ],
    bottom: [
      [{x: 45, y: 100}, {x: 55, y:  100}],
      [{x: 45, y:   0}, {x: 55, y:    0}],
    ],
    left: [
      [{y: 45, x:   0}, {y: 55, x:   0}],
      [{y: 45, x: 100}, {y: 55, x: 100}],
    ],
    right: [
      [{y: 45, x: 100}, {y: 55, x: 100}],
      [{y: 45, x:   0}, {y: 55, x:  0}],
    ],
  },
  adjacent_entry_sides: {left: 'left', right: 'right', top: 'top', bottom: 'bottom'}
};

var straight_vertical = {
  name: 'straight_vertical',
  pipe_polygon: [
    {x: 45, y: 0},
    {x: 45, y: 100},
    {x: 55, y: 100},
    {x: 55, y: 0}
  ],
  fill_lines: {
    top: [
      [{x: 45, y:   0}, {x: 55, y:  0}],
      [{x: 45, y: 100}, {x: 55, y:  100}],
    ],
    bottom: [
      [{x: 45, y: 100}, {x: 55, y:  100}],
      [{x: 45, y:   0}, {x: 55, y:  0}],
    ],
    left: [],
    right: []
  },
  adjacent_entry_sides: {top: 'top', bottom: 'bottom'}}

var straight_horizontal = {
  name: 'straight_horizontal',
  pipe_polygon: [
    {x:   0, y: 45},
    {x: 100, y: 45},
    {x: 100, y: 55},
    {x:   0, y: 55}
  ],
  fill_lines: {
    left: [
      [{y: 45, x:   0}, {y: 55, x:   0}],
      [{y: 45, x: 100}, {y: 55, x: 100}],
    ],
    right: [
      [{y: 45, x: 100}, {y: 55, x: 100}],
      [{y: 45, x:   0}, {y: 55, x:  0}],
    ],
    top: [],
    bottom: []
  },
  adjacent_entry_sides: {left: 'left', right: 'right'}
};

// an elbow with bottom and right side entry points
var elbow_bottom_right = {
  name: 'elbow_bottom_right',
  pipe_polygon: [
    {x:  45, y: 100},
    {x:  55, y: 100},
    {x:  55, y:  55},
    {x: 100, y:  55},
    {x: 100, y:  45},
    {x:  50, y:  45},
    {x:  45, y:  50}
  ],
  fill_lines: {
    top:[],
    bottom: [
      [{x:  45, y: 100}, {x:  55, y: 100}],
      [{x:  45, y:  55}, {x:  55, y:  55}],
      [{x:  45, y:  50}, {x:  55, y:  55}],
      [{x:  50, y:  45}, {x:  55, y:  55}],
      [{x:  55, y:  45}, {x:  55, y:  55}],
      [{x: 100, y:  45}, {x: 100, y:  55}],
    ],
    left: [],
    right: [
      [{x: 100, y:  45}, {x: 100, y:  55}],
      [{x:  55, y:  45}, {x:  55, y:  55}],
      [{x:  50, y:  45}, {x:  55, y:  55}],
      [{x:  45, y:  50}, {x:  55, y:  55}],
      [{x:  45, y:  55}, {x:  55, y:  55}],
      [{x:  45, y: 100}, {x:  55, y: 100}],
    ]
  },
  adjacent_entry_sides: {bottom: 'left', right: 'top'}
};

// an elbow with bottom and left side entry points
var elbow_bottom_left = {
  name: 'elbow_bottom_left',
  pipe_polygon: [
    {x: 55, y: 100},
    {x: 45, y: 100},
    {x: 45, y:  55},
    {x:  0, y:  55},
    {x:  0, y:  45},
    {x: 50, y:  45},
    {x: 55, y:  50}
  ],
  fill_lines: {
    top:[],
    bottom: [
      [{x: 55, y: 100}, {x: 45, y: 100}],
      [{x: 55, y:  55}, {x: 45, y:  55}],
      [{x: 55, y:  50}, {x: 45, y:  55}],
      [{x: 50, y:  45}, {x: 45, y:  55}],
      [{x: 45, y:  45}, {x: 45, y:  55}],
      [{x:  0, y:  45}, {x:  0, y:  55}],
    ],
    left: [
      [{x:  0, y:  45}, {x:  0, y:  55}],
      [{x: 45, y:  45}, {x: 45, y:  55}],
      [{x: 50, y:  45}, {x: 45, y:  55}],
      [{x: 55, y:  50}, {x: 45, y:  55}],
      [{x: 55, y:  55}, {x: 45, y:  55}],
      [{x: 55, y: 100}, {x: 45, y: 100}],
    ],
    right: []
  },
  adjacent_entry_sides: {bottom: 'right', left: 'top'}
};

// an elbow with top and left side entry points
var elbow_top_left = {
  name: 'elbow_top_left',
  pipe_polygon: [
    {x: 55, y:  0},
    {x: 45, y:  0},
    {x: 45, y: 45},
    {x:  0, y: 45},
    {x:  0, y: 55},
    {x: 50, y: 55},
    {x: 55, y: 50}
  ],
  fill_lines: {
    bottom:[],
    top: [
      [{x: 55, y:  0}, {x: 45, y:  0}],
      [{x: 55, y: 45}, {x: 45, y: 45}],
      [{x: 55, y: 50}, {x: 45, y: 45}],
      [{x: 50, y: 55}, {x: 45, y: 45}],
      [{x: 45, y: 55}, {x: 45, y: 45}],
      [{x:  0, y: 55}, {x:  0, y: 45}],
    ],
    left: [
      [{x:  0, y: 55}, {x:  0, y: 45}],
      [{x: 45, y: 55}, {x: 45, y: 45}],
      [{x: 50, y: 55}, {x: 45, y: 45}],
      [{x: 55, y: 50}, {x: 45, y: 45}],
      [{x: 55, y: 45}, {x: 45, y: 45}],
      [{x: 55, y:  0}, {x: 45, y:  0}],
    ],
    right: []
  },
  adjacent_entry_sides: {top: 'right', left: 'bottom'}
};

// an elbow with top and right side entry points
var elbow_top_right = {
  name: 'elbow_top_right',
  pipe_polygon: [
    {x:  45, y:  0},
    {x:  55, y:  0},
    {x:  55, y: 45},
    {x: 100, y: 45},
    {x: 100, y: 55},
    {x:  50, y: 55},
    {x:  45, y: 50}
  ],
  fill_lines: {
    bottom:[],
    top: [
      [{x:  45, y:  0}, {x:  55, y:  0}],
      [{x:  45, y: 45}, {x:  55, y: 45}],
      [{x:  45, y: 50}, {x:  55, y: 45}],
      [{x:  50, y: 55}, {x:  55, y: 45}],
      [{x:  55, y: 55}, {x:  55, y: 45}],
      [{x: 100, y: 55}, {x: 100, y: 45}],
    ],
    right: [
      [{x: 100, y: 55}, {x: 100, y: 45}],
      [{x:  55, y: 55}, {x:  55, y: 45}],
      [{x:  50, y: 55}, {x:  55, y: 45}],
      [{x:  45, y: 50}, {x:  55, y: 45}],
      [{x:  45, y: 45}, {x:  55, y: 45}],
      [{x:  45, y:  0}, {x:  55, y:  0}],
    ],
    left: []
  },
  adjacent_entry_sides: {top: 'left', right: 'bottom'}
};

var piece_defs = [cross, straight_vertical, straight_horizontal,
  elbow_bottom_right, elbow_bottom_left, elbow_top_left, elbow_top_right];

/////////////////////////
//// starting pieces ////
/////////////////////////

// starting piece with 'entry' from the top
var start_top = {
  name: 'start_top',
  pipe_polygon: [
    {x: 45, y: 50},
    {x: 55, y: 50},
    {x: 55, y: 100},
    {x: 45, y: 100}
  ],
  fill_lines: {
    top: [
      [{x:  45, y: 50}, {x:  55, y: 50}],
      [{x:  45, y: 100}, {x:  55, y: 100}]
    ],
    bottom: [],
    left: [],
    right: []
  },
  entry_side: 'top',
  adjacent_entry_sides: {top: 'top'}
};

// starting piece with 'entry' from the left
var start_left = {
  name: 'start_left',
  pipe_polygon: [
    {x: 100, y: 45},
    {x: 100, y: 55},
    {x: 50, y: 55},
    {x: 50, y: 45}
  ],
  fill_lines: {
    top: [],
    bottom: [],
    left: [
      [{x:  50, y: 45}, {x:  50, y: 55}],
      [{x: 100, y: 45}, {x: 100, y: 55}],
    ],
    right: []
  },
  entry_side: 'left',
  adjacent_entry_sides: {left: 'left'}
};

// starting piece with 'entry' from the right
var start_right = {
  name: 'start_right',
  pipe_polygon: [
    {x: 0, y: 45},
    {x: 0, y: 55},
    {x: 50, y: 55},
    {x: 50, y: 45}
  ],
  fill_lines: {
    top: [],
    bottom: [],
    left: [],
    right: [
      [{x:  50, y: 45}, {x:  50, y: 55}],
      [{x:   0, y: 45}, {x:   0, y: 55}]
    ]
  },
  entry_side: 'right',
  adjacent_entry_sides: {right: 'right'}
};

// starting piece with 'entry' from the top
var start_bottom = {
  name: 'start_bottom',
  pipe_polygon: [
    {x: 45, y: 50},
    {x: 55, y: 50},
    {x: 55, y: 0},
    {x: 45, y: 0}
  ],
  fill_lines: {
    bottom: [
      [{x: 45, y: 50}, {x: 55, y: 50}],
      [{x: 45, y:  0}, {x: 55, y:  0}]
    ],
    top: [],
    left: [],
    right: []
  },
  entry_side: 'bottom',
  adjacent_entry_sides: {bottom: 'bottom'}
};

var start_piece_defs = [start_bottom, start_left, start_top, start_right];
