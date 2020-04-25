import '/index.scss';

const WIDTH_CANVAS = 1040;
const HEIGHT_CANVAS = 598;
const COLOR_CANVAS = '#fff';
const CANVAS = document.querySelector(".work-display__plan");
const CONTEXT = CANVAS.getContext('2d');

CANVAS.width = WIDTH_CANVAS;
CANVAS.height = HEIGHT_CANVAS;
CONTEXT.fillStyle = COLOR_CANVAS;
CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height);
