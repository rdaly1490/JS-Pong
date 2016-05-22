var canvas;
var canvasContext;

// game ball
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

// game paddles
var paddleHeight = 100;
var leftPaddleY = 250;

window.onload = function() {

	canvas = document.getElementById('game-canvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 30;
	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);

	// canvas event listener to move player's paddle up and down
	canvas.addEventListener('mousemove', function(e) {
		var mousePos = calculateMousePosition(e);
		// paddleHeight/2 so mouse is centered on paddle when moving, not top corner
		leftPaddleY = mousePos.y - (paddleHeight/2);
	});






}

function moveEverything() {
	ballX = ballX + ballSpeedX;
	ballY = ballY + ballSpeedY;

	// check x bounds of game ball
	if (ballX > canvas.width || ballX < 0) {
		ballSpeedX = -ballSpeedX; 
	}
	// check y bounds of game ball
	if (ballY > canvas.height || ballY < 0) {
		ballSpeedY = -ballSpeedY; 
	}
}

function drawEverything() {
	// black game background
	colorRect(0, 0, canvas.width, canvas.height, 'black');

	// left player paddle
	colorRect(10, leftPaddleY, 10, paddleHeight, 'white');

	// game ball
	colorCircle(ballX, ballY, 10, 'white');
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

function calculateMousePosition(e) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = e.clientX - rect.left - root.scrollLeft;
	var mouseY = e.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX,
		y: mouseY
	};
}




