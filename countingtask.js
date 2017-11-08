function init() {
	var canvas = document.getElementById("myCanvas");
	var stage = new createjs.Stage(canvas);
	var display = new createjs.Text("Score", "20px Arial", "black");

	data = []; //contains the trial number, RT of space bar press, RT of number input, subject input, exact number of Xs, accuracy of subject input, subject's score,
	//type of cue  (small or big), approx number of dots (small or big)

	var NUMTRIALS = 2;

	function cueBig() {
		cueBigsquare = new createjs.Shape();
		cueBigsquare.graphics.beginFill("blue").drawRect(450, 200, 50, 50);
		stage.addChild(cueBigsquare);
		stage.update();
		return cueBigsquare;
	}

	function cueSmall() {
		cueSmallsquare = new createjs.Shape();
		cueSmallsquare.graphics.beginFill("red").drawRect(450, 200, 50, 50);
		stage.addChild(cueSmallsquare);
		stage.update();
		return cueSmallsquare;
	}

	function createX(x, y) {
		var X = new createjs.Text("X", "40px Arial", "black");
		X.x = x;
		X.y = y;
		stage.addChild(X);
		stage.update();
		return X;
	}

	function getrandom() {
		var xval = Math.floor(Math.random() * myCanvas.width);
		var yval = Math.floor(Math.random() * myCanvas.height);
		return [xval, yval];
	}

	function accuracy(input, numX) {
		var accuracy = Math.abs(numX - input); //the closer to 0, the better
		return accuracy;
	}

	function score(accuracy, RT) {
		//some function that gives more points for lower RT and accuracy
		score = RT
		return score;
	}

	function placement(numX) {
		for (var i = 0; i < numX; i++) {
			getrandom();
			createX(xval, yval);
			stage.addChild(X);
			stage.update();
		} 
	}

	function numX(low, high) {
		var numX = Math.floor(Math.random() * (high - low + 1) ) + low;
		return numX;
	}

	var trials = 0;

	var keys = {};
	this.document.onkeydown = keydown;
	this.document.onkeyup = keyup;

	function keydown(event) {
		keys[event.keyCode] = true;
	}

	function keyup(event) {
		delete keys[event.keyCode];
	}

	function runSmallTrial() {
		stage.removeAllChildren();
		stage.update();

		if (trials < NUMTRIALS) {
			var square = cueSmall();
			setTimeout(function() {continueSmallTrial(square)}, 2000);
		}
	console.log(data);
	}

	function continueSmallTrial(square) {
		stage.removeChild(square);
		stage.update();

		var start_time1 = new Date();

		numX(7, 13);

		placement(numX);

		createjs.Ticker.on("tick", handleTick);

		inputs();

		function inputs() {
			trials = trials + 1;
			function handleTick(event) {
			if (keys[32]) {
				var end_time1 = new Date() - start_time1;
				stage.removeAllChildren();
				var input = document.getElementById('box');
				stage.addChild(box);
				stage.update();
				var start_time2 = new Date();
				}
			}
			function handleTick(event) {
			if (keys[13]) {
				var end_time2 = new Date() - start_time2;
				stage.removeAllChildren();
				stage.update();
				}
			}

			accuracy(input, numX);
			score(accuracy, end_time1);
			display.text = "Score:" + score;
			display.x = 400;
			display.y = 250;
			stage.addChild(display);
			stage.update();
			data.push([trials, end_time1, end_time2, input, numX, accuracy, score, "small cue", "small number"]);
			setTimeout(runSmallTrial, 2000); //fix?
		} 
	}

	runSmallTrial();
	

}
