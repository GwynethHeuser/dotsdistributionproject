function init() {
	var canvas = document.getElementById("myCanvas");
	var stage = new createjs.Stage(canvas);
	var text = new createjs.Text("You did it!", "20px Arial", "black");
	
	data = []; //contains the trial number, RT, x position of circle, y position of circle, circle color, trial type (normal vs outlier)

	var NUMTRIALS = 2;

	function getrandom(x1, x2, y1, y2) { //NOTE: x1 should be bigger than x2, likewise with y1 and y2
		var xval = Math.floor(Math.random() * (x1 - x2 + 1) ) + x2;
		var yval = Math.floor(Math.random() * (y1 - y2 + 1) ) + y2;
		return [xval, yval];
	}

	function moveleft(circle) {
		positions = getrandom(400, 200, 350, 150);
		circle.x = positions[0];
		circle.y = positions[1];
		stage.update();
	}

	function moveright(circle) {
		positions = getrandom(900, 700, 350, 150);
		circle.x = positions[0];
		circle.y = positions[1];
		stage.update();
	}

	function createBluecircle() {
		bluecircle = new createjs.Shape();
		bluecircle.graphics.beginFill("blue").drawCircle(0, 0, 20);
		return bluecircle;
	}

	function createRedcircle() {
		redcircle = new createjs.Shape();
		redcircle.graphics.beginFill("red").drawCircle(0, 0, 20);
		return redcircle;
	}

	function cueBlue() {
		cueBluesquare = new createjs.Shape();
		cueBluesquare.graphics.beginFill("blue").drawRect(450, 200, 50, 50);
		stage.addChild(cueBluesquare);
		stage.update();
		return cueBluesquare;
	}

	function cueRed() {
		cueRedsquare = new createjs.Shape();
		cueRedsquare.graphics.beginFill("red").drawRect(450, 200, 50, 50);
		stage.addChild(cueRedsquare);
		stage.update();
		return cueRedsquare;
	}

	function continueRedTrial(square) {
		stage.removeChild(square);
		stage.update();

		var start_time = new Date();
		
		createRedcircle();

		moveleft(redcircle);
		
		stage.addChild(redcircle);
		stage.update();

		redcircle.addEventListener("click", function() {
			trials = trials + 1;
			var end_time = new Date() - start_time;
			data.push([trials, end_time, redcircle.x, redcircle.y, "red", "normal"]);
			stage.removeChild(redcircle);
			score = 3000 - end_time;
			text.text = "Score: " + score;
			text.x = 400;
			text.y = 50;
			stage.addChild(text);
			stage.update();
			setTimeout(runRedTrial, 1000);
			})
	}

	function continueBlueTrial(square) {
		stage.removeChild(cueBluesquare);
		stage.update();

		var start_time = new Date();
		
		createBluecircle();

		moveright(bluecircle);
		
		stage.addChild(bluecircle);
		stage.update();

		bluecircle.addEventListener("click", function() {
			trials = trials + 1;
			var end_time = new Date() - start_time;
			data.push([trials, end_time, bluecircle.x, bluecircle.y, "blue", "normal"]);
			stage.removeChild(bluecircle);
			score = 3000 - end_time;
			text.text = "Score: " + score;
			text.x = 400;
			text.y = 50;
			stage.addChild(text);
			stage.update();
			setTimeout(runBlueTrial, 1000);
			})

	}

	function continueOutlierRedTrial(square) {
		stage.removeChild(cueRedsquare);
		stage.update;

		var start_time = new Date();
		
		createRedcircle();

		moveright(redcircle);
		
		stage.addChild(redcircle);
		stage.update();

		redcircle.addEventListener("click", function() {
			trials = trials + 1;
			var end_time = new Date() - start_time;
			data.push([trials, end_time, redcircle.x, redcircle.y, "red", "outlier"]);
			stage.removeChild(redcircle);
			score = 3000 - end_time;
			text.text = "Score: " + score;
			text.x = 400;
			text.y = 50;
			stage.addChild(text);
			stage.update();
			})
	}

	function continueOutlierBlueTrial(square) {
		stage.removeChild(cueBluesquare);
		stage.update;

		var start_time = new Date();
		
		createBluecircle();

		moveleft(bluecircle);
		
		stage.addChild(bluecircle);
		stage.update();

		bluecircle.addEventListener("click", function() {
			trials = trials + 1;
			var end_time = new Date() - start_time;
			data.push([trials, end_time, bluecircle.x, bluecircle.y, "blue", "outlier"]);
			stage.removeChild(bluecircle);
			score = 3000 - end_time;
			text.text = "Score: " + score;
			text.x = 400;
			text.y = 50;
			stage.addChild(text);
			stage.update();
			})
	}

	trials = 0;

	function runRedTrial() {
	stage.removeChild(text);
	
	if (trials < NUMTRIALS) {
		var square = cueRed();

		setTimeout(function() {continueRedTrial(square)}, 2000);

		}

	console.log(data);
	}
	//runRedTrial();

	function runBlueTrial() {
	stage.removeChild(text);
	
	if (trials < NUMTRIALS) {
		var square = cueBlue();

		setTimeout(function() {continueBlueTrial(square)}, 2000);
	
		}

	console.log(data);
	}
	//runBlueTrial();

	function runOutlierRedTrial() {
		stage.removeChild(text);
		
		if (trials < 1) {
		var square = cueRed();

		setTimeout(function() {continueOutlierRedTrial(square)}, 2000);

		}

	console.log(data);
	}
	//runOutlierRedTrial();

	function runOutlierBlueTrial() {
		stage.removeChild(text);
		
		if (trials < 1) {
		var square = cueBlue();

		setTimeout(function() {continueOutlierBlueTrial(square)}, 2000);

		}

	console.log(data);
	}
	//runOutlierBlueTrial();
}