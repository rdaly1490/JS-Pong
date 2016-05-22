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
	if (ballX > canvas.width || ballX < 0) {
		ballSpeedX = -ballSpeedX; 
	}
}

function drawEverything() {
	// black game background
	colorRect(0, 0, canvas.width, canvas.height, 'black');

	// left player paddle
	colorRect(10, 210, 10, 100, 'white');

	// game ball
	colorCircle(ballX, 150, 10, 'white');
}

function colorCircle(centerX, centerY, radius, drawColor) {
		canvasContext.fillStyle = drawColor;
		canvasContext.beginPath();
		canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
		canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);
}




