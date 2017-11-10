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
		//stage.addChild(X);
		//stage.update();
		return X;
	}

	function getrandom() {
		var xval = Math.floor(Math.random() * ((myCanvas.width-100) - 100 + 1) ) + 100;
		var yval = Math.floor(Math.random() * ((myCanvas.height-100) - 100 + 1) ) + 100;
		return [xval, yval];
	}

	function accuracy(answer, numX) {
		var accuracy = Math.abs(numX - answer); //the closer to 0, the better
		return accuracy;
	}

	function score(accuracy, RT) {
		//some function that gives more points for lower RT and accuracy
		s = RT.toString();
		return s;
	}

	function placement(numX) {
		for (var i = 0; i < numX; i++) {
			var positions = getrandom();
			var X = createX(positions[0], positions[1]);
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

		var nX = numX(7, 13);

		placement(nX);

		var xonscreen = true;

		var end_time1 = 0;
		var end_time2 = 0;

		function handleTick(event) {

			if (keys[32] & xonscreen) {
				xonscreen = false;
				var boxonscreen = true;
				end_time1 = new Date() - start_time1;
				stage.removeAllChildren();
				input = document.getElementById("box");
				var answer = input.value;
				input.style.display="inline";
				stage.update();
				var start_time2 = new Date();
				}
			if (keys[13] & ! xonscreen) {
				boxonscreen = false;
				end_time2 = new Date() - start_time2;
				input.style.display="none";
				stage.removeAllChildren();
				stage.update();
				trials = trials + 1;
				var theAccuracy = accuracy(answer, nX);
				var theScore = score(accuracy, end_time1);
				display.text = "Score:" + theScore;
				display.x = 400;
				display.y = 250;
				stage.addChild(display);
				stage.update();
				data.push([trials, end_time1, end_time2, answer, nX, theAccuracy, theScore, "small cue", "small number"]); //end_time2, answer, theAccuracy not working
				answer = ""; //isn't clearing the text box properly
				setTimeout(runSmallTrial, 2000); //fix?
				}
			}

		createjs.Ticker.on("tick", handleTick);
	}

	runSmallTrial();

}
