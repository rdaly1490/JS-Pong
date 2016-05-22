var canvas;
var canvasContext;

// game ball
var ballX = 50;
var ballY = 50;
var ballRadius = 10;
var ballSpeedX = 10;
var ballSpeedY = 4;

// game paddles
var paddleHeight = 100;
var paddleThickness = 10;

var distanceFromGameEdge = 10;

// distance from left side
var leftPaddleY = 250;

// distance from right sidepadd
var rightPaddleY = 250;

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

	// players x-side of board
	if (ballX < 0 + (paddleThickness + distanceFromGameEdge + ballRadius)) {
		// if below top of paddle and above bottom of paddle, change direction
		if (ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
			ballSpeedX = -ballSpeedX;
		} else {
			ballReset();
		}
	}
	// comps x-side of board
	if (ballX > canvas.width) {
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
	colorRect(distanceFromGameEdge, leftPaddleY, paddleThickness, paddleHeight, 'white');

	//rifht player paddle
	colorRect((canvas.width - distanceFromGameEdge - paddleThickness), rightPaddleY, paddleThickness, paddleHeight, 'white');

	// game ball
	colorCircle(ballX, ballY, ballRadius, 'white');
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

function ballReset() {
	// have ball reset to opposite direction after score
	ballSpeedX = -ballSpeedX
	// have ball shoot out from mid court
	ballX = canvas.width/2;
	ballY = canvas.height/2;
}




