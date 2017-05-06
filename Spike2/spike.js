(function(){
	"use strict";

	// The data structure we need to use, from the assignment specification.
	var morseCodeTableArray = [{
		letter: 'a',
		code : ['1', '0', '0', '1']
	}, {
		letter: 'b',
		code : ['0', '0', '1', '1']
	}, {
		letter: 'c',
		code : ['0', '1', '0', '1']
	}, {
		letter: 'd',
		code : ['1', '1', '1', '0']
	}, {
		letter: 'e',
		code : ['1', '1', '1', '1']
	}];

	// Just generates an array with 4 strings, either 0s or 1s.
	function generateSingleMotionData() {
		var ret = [];
		for (var i = 0; i < 4; i++) {
			ret[i] = Math.random() < 0.5 ? '1' : '0';
		}
		return ret;
	}

	// Generates a list of n motion arrays by calling 
	// generateSingleMotionData() n times and appending the results to an
	// array.
	function generateMotionData(n) {
		var ret = [];
		for (var i = 0; i < n; i++) {
			ret.push(generateSingleMotionData());
		}
		return ret;
	}
	
	// Just checks if two arrays are equal.
	function arraysEqual(a, b) {
		if (a.length !== b.length) {
			return false;
		}
		for (var i = 0; i < a.length; i++) {
			if (a[i] !== b[i]) {
				return false;
			}
		}
		return true;
	}

	// Print the letter that the motionData represents, null otherwise.
	function printLetter(motionData) {
		for (var i = 0; i < morseCodeTableArray.length; i++) {
			if (arraysEqual(motionData, morseCodeTableArray[i].code)) {
				console.log(morseCodeTableArray[i].letter);
				return;
			}
		}
		console.log("null");
	}

	// Runs and times n checks.
	function runTest(n) {
		var myData = generateMotionData(n);
		
		var startTime = process.hrtime();
		for (var i = 0; i < n; i++) {
			printLetter(myData[i]);
		}
		var delta = process.hrtime(startTime);
		console.log("Printing the letters of " + n + " test arrays took " + (delta[0] * 1e9 + delta[1]) + " ns.");
	}
	
	// Run the test
	if (process.argv.length !== 3) {
		console.log("Please run spike.js with the number of items to generate as the first command line argument.");
	} else {
		runTest(parseInt(process.argv[2]));
	}
})();
