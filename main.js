var canvas;
var canvasContext;
var ballX = 50;

window.onload = function() {

canvas = document.getElementById('game-canvas');
canvasContext = canvas.getContext('2d');

setInterval(drawEverything, 1000);






}

function drawEverything() {
	ballX = ballX + 20;
	console.log(ballX);
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0,0, canvas.width, canvas.height);
	canvasContext.fillStyle = 'red';
	canvasContext.fillRect(ballX, 200, 50, 50);
}