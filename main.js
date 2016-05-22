var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 5;

window.onload = function() {

canvas = document.getElementById('game-canvas');
canvasContext = canvas.getContext('2d');

var framesPerSecond = 30;
setInterval(function() {
	moveEverything();
	drawEverything();
}, 1000/framesPerSecond);






}

function moveEverything() {
	ballX = ballX + ballSpeedX;
	// check bounds of game ball
	if (ballX > canvas.width) {
		ballSpeedX = -ballSpeedX; 
	} else if (ballX < 0) {
		ballSpeedX = -ballSpeedX;
	}
}

function drawEverything() {
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0,0, canvas.width, canvas.height);
	canvasContext.fillStyle = 'white';
	canvasContext.fillRect(10, 210, 10, 100);
	canvasContext.fillStyle = 'red';
	canvasContext.fillRect(ballX, 100, 10, 10);
}