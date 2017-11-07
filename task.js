/*
 * Requires:
 *     psiturk.js
 *     utils.js
 */

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
arr=["static/images/Pair9Y10B1.png","static/images/Pair9Y10B2.png","static/images/Pair9Y10B3.png","static/images/Pair9Y10B4.png","static/images/Pair9Y10B5.png","static/images/Pair10Y9B1.png","static/images/Pair10Y9B2.png","static/images/Pair10Y9B3.png","static/images/Pair10Y9B4.png","static/images/Pair10Y9B5.png"]


shuffled=_.shuffle(arr);

stimuli = [shuffled.shift()]

//stimuli = [shuffled]



// END OF STIMULI XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


var psiTurk = PsiTurk(uniqueId, adServerLoc);

var mycondition = condition;  
var mycounterbalance = counterbalance;

var pages = [
	"instructions/instruct-ready.html",
	"stage.html",
	"postquestionnaire.html"
];

psiTurk.preloadPages(pages); 

var instructionPages = [ 
	"instructions/instruct-ready.html"
];


/******************
* Main Experiment *
*******************/

var Trial = function() {
	var startTime = 0;
	var stim = null;
	var listen = false;
	var last_trial = false;
    var impq = false;
	
	var next = function(){
        if (impq) {
            spek.style.display="inline";
        } else {
            if (stimuli.length == 0 && !impq) {
                last_trial = true;
                top_head.textContent = 'How many red dots did you see flash?';
	            bottom_head.textContent='When you are done, press Enter.';
	            pic.style.display="none";
	            quiz.style.display="inline";
	            listen=true;
	            startTime= new Date().getTime();     
            } else {
	            stim=stimuli.shift();
	            pic.src=stim;
	            listen=true;
	            startTime= new Date().getTime();
            }
        }
	};

	var response_handler = function(e){
        if (!listen) return;
        var keyCode = e.keyCode;
        var response = "";
        switch (keyCode) {
            case 89:
                // Y
                response = "Y";
                break;
            case 78:
                // N
                response = "N";
                break;
            case 13:
                 //Enter
		         response = "Enter";
		        break;
		
            default:
                response = "";
                break;
        }
        if ((response == "Y" || response == "N") && !last_trial) {
                listen = false;
                var rt =  new Date().getTime() - startTime;
                psiTurk.recordTrialData([stim, response, rt ]);
                next();
        } else if (response == "Enter" && last_trial) {
		    listen=false;
		    var rt =  new Date().getTime() - startTime;
		    var response = $('input[name="quiz_question"]:checked').val();
            psiTurk.recordTrialData(["Last Trial", response, rt ]);
            impq=true;
            next();
            quiz.style.display="none";
	        top_head.textContent="";
		    bottom_head.textContent="";
        }
	};


    $("body").focus().keydown(response_handler);
    var thebox = document.getElementById('box');
    var top_head = document.getElementById('top_head');
	var bottom_head = document.getElementById('bottom_head');
	var quiz = document.getElementById('quiz');
	var pic = document.getElementById('most_pic');
	var spek = document.getElementById('special_k');
	next();

	
		
	var finish = function() {
		psiTurk.saveData({
            success: function(){
                psiTurk.completeHIT();
            }, 
            error: function(){var foo=bar;}});
	};

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	psiTurk.showPage('stage.html');

	

     $("#sub").click( function () {
        var rez = $("#reason").val();
        psiTurk.recordTrialData(["Reason", rez]);
        finish();
    });
	
	
};

/****************
* Questionnaire *
****************/

var Quest = function() {

	record_responses = function() {

		$('input').each( function(i, val) {
			psiTurk.recordTrialData([this.id, this.value]);
		});
		$('select').each( function(i, val) {
			psiTurk.recordTrialData([this.id, this.value]);		
		});

	};

	psiTurk.showPage('postquestionnaire.html');
	
	$("#next").click(function () {
	    var form = document.getElementById("postquiz");
/*	    if (form["sound_check"].value != "koala") {
	    	alert("You have failed the sound check. Please try again.");
	    	psiTurk.recordTrialData(["The failed sound check."]);
	    	return false;
	    } else {*/
	    record_responses();
	    currentview = new Trial();
		//}
	});
    
	
};

var currentview;

/*******************
 * Run Task
 ******************/
$(window).load( function(){
    psiTurk.doInstructions(
    	instructionPages, 
    	function() { currentview = new Quest(); } 
    );
});

