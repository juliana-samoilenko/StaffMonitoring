import '/index.scss';
import Two from 'two.js';

var elem = document.getElementById('work-display__plan');
var two = new Two({width: 1045, height: 600, domElement: elem});

two.update();
