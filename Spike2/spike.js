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
	function singleTestTime(n) {
		var myData = generateMotionData(n);
		var startTime = process.hrtime();
		for (var i = 0; i < n; i++) {
			printLetter(myData[i]);
		}
		var delta = process.hrtime(startTime);
		return delta[0] * 1e9 + delta[1];
	}

    // Run the tests
    var numTests;
    var numMotionData;

    if (process.argv.length != 4) {
    	console.log("Usage: spike.js <num_repeats> <num_motions>");
    	return;
    } else {
    	numTests = parseInt(process.argv[2]);
    	numMotionData = parseInt(process.argv[3]);
    }
    
    if (numTests <= 0) {
    	console.log("Num repeats must be at least one.");
    }

    var longestExecutionTime, shortestExecutionTime, sumExecutionTime;
    sumExecutionTime = longestExecutionTime = shortestExecutionTime = singleTestTime(numMotionData);
    for (var testcount = 0; testcount < numTests-1; testcount++) {
    	var sample = singleTestTime(numMotionData);
		shortestExecutionTime = Math.min(sample, shortestExecutionTime);
		longestExecutionTime = Math.max(sample, longestExecutionTime);
		sumExecutionTime += sample;
    }
    
    let averageExecutionTime = sumExecutionTime/numTests;
    console.log("Number of repeats: " + numTests);
    console.log("Motion data array size: " + numMotionData);
    console.log("Average execution time: " + averageExecutionTime + " ns.");
    console.log("Longest execution time: " + longestExecutionTime + " ns.");
    console.log("Shortest execution time: " + shortestExecutionTime + " ns.");
})();
