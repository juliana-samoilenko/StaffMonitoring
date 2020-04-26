import '/index.scss';
import 'two.js';

var elem = document.getElementById('work-display__plan');
var two = new Two({ width: 1040, height: 598 }).appendTo(elem);
var circle = two.makeCircle(72, 100, 50);
var rect = two.makeRectangle(213, 100, 100, 100);

circle.fill = '#FF8000';
circle.stroke = 'orangered';
circle.linewidth = 5;

rect.fill = 'rgb(0, 200, 255)';
rect.opacity = 0.75;
rect.noStroke();

two.update();

/*const WIDTH_CANVAS = 1040;
const HEIGHT_CANVAS = 598;
const COLOR_CANVAS = '#fff';
const CANVAS = document.querySelector(".work-display__plan");
const CONTEXT = CANVAS.getContext('2d');

CANVAS.width = WIDTH_CANVAS;
CANVAS.height = HEIGHT_CANVAS;
CONTEXT.fillStyle = COLOR_CANVAS;
CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height);*/
