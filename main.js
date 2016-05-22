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

// scores
var playerScore = 0;
var compScore = 0;
var winningScore = 3;

var showingWinScreen = false;

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

	canvas.addEventListener('click', function(e) {
		if (showingWinScreen) {
			playerScore = 0;
			compScore = 0;
			showingWinScreen = false;
		}
	})

}

function computerPaddleMovement() {
	var paddleRightYCenter = rightPaddleY + (paddleHeight/2);
	// if players paddle is above the ball move down a bit else move up a bit
	if (paddleRightYCenter < ballY - 35) {
		rightPaddleY += 6;
	} else if (paddleRightYCenter > ballY + 35) {
		rightPaddleY -= 6;
	}
}

function moveEverything() {
	if (showingWinScreen) {
		return;
	}

	computerPaddleMovement();

	// below means ballX += ballX + ballSpeedX;
	ballX += ballSpeedX;
	ballY += ballSpeedY;
	var paddleOffset = paddleThickness + distanceFromGameEdge + ballRadius;

	// players x-side of board
	if (ballX < 0 + paddleOffset) {
		// if below top of paddle and above bottom of paddle, change direction
		if (ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
			ballSpeedX = -ballSpeedX;

			// increase ball speed if user hits with corner of paddle instead of center
			var deltaY = ballY - (leftPaddleY + paddleHeight/2);
			// scale the speed, 100% deltaY too fast
			ballSpeedY = deltaY * 0.35; 
		} else {
			compScore++;
			ballReset();
		}
	}
	// computers x-side of board
	if (ballX > canvas.width - paddleOffset) {
		if (ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
			ballSpeedX = -ballSpeedX;
			var deltaY = ballY - (rightPaddleY + paddleHeight/2);
			ballSpeedY = deltaY * 0.35; 
		} else {
			playerScore++;
			ballReset();
		}
	}
	// check y bounds of game ball
	if (ballY > canvas.height || ballY < 0) {
		ballSpeedY = -ballSpeedY; 
	}
}

function drawNet() {
	for (var i=0; i<canvas.height; i+=40) {
		colorRect(canvas.width/2 - 1, i, 2, 20, 'white');
	}
}

function drawEverything() {
	if (showingWinScreen) {
		var winner = playerScore >= winningScore ? 'Player Won' : 'Computer Won';
		canvasContext.fillStyle = 'white';
		canvasContext.font = '20px Times New Roman';
		canvasContext.fillText('Game Over: ' + winner, 300, 300);
		canvasContext.fillText('Click To Continue', 340, 400);
		return;
	}

	// black game background
	colorRect(0, 0, canvas.width, canvas.height, 'black');

	drawNet();

	// left player paddle
	colorRect(distanceFromGameEdge, leftPaddleY, paddleThickness, paddleHeight, 'white');

	//rifht player paddle
	colorRect((canvas.width - distanceFromGameEdge - paddleThickness), rightPaddleY, paddleThickness, paddleHeight, 'white');

	// game ball
	colorCircle(ballX, ballY, ballRadius, 'white');

	// game score info
	canvasContext.font = '20px Times New Roman';
	canvasContext.fillText(playerScore, 100, 100);
	canvasContext.fillText(compScore, canvas.width - 100, 100);
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

	// reset scores if game over
	if (playerScore >= winningScore || compScore >= winningScore){
		showingWinScreen = true;
	}

	// have ball reset to opposite direction after score
	ballSpeedX = -ballSpeedX
	// have ball shoot out from mid court
	ballX = canvas.width/2;
	ballY = canvas.height/2;
}


