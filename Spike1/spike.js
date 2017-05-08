/**
 * FIT3140 - Assignment 4. Team 29. Spike1.
 *
 * spike.js: he first spike examines the execution time of decoding incoming message 
 * by storing and receiving the code of each letter as a string.
 *
 * @author Li Cheng
 */

(function() {
    "use strict";
 
    // Experiment with data structure string, and compare with input data
    // between two strings
    var morseCodeTableArray = [{
    	letter: 'a',
		code : '1001'
	}, {
		letter: 'b',
		code : '0011'
	}, {
		letter: 'c',
		code : '0101'
	}, {
		letter: 'd',
		code : '1110'
	}, {
		letter: 'e',
		code : '1111'
    }];

    // return an random integer between min and max value
    function getRandomIntInclusive(min, max) {
    	min = Math.ceil(min);
    	max = Math.floor(max);
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// return an random data in 'string' format of length 4, composed of 0's or 1's.
	var stringLength = 4;
	function generateRandomData() {
		var data = '';
		var count;
		for (count=0; count<stringLength; count++) {
			data = data.concat(getRandomIntInclusive(0, 1));
		}
		return data;
	}

    // generate 50,000 motion data in 'string' format, and store them in an array
    // return motionDataArray
    function generateMotionDataArray() {
    	var motionDataArray = [];
    	var count;
    	for (count=0; count<numMotionData; count++) {
    		motionDataArray.push(generateRandomData());
    	}
    	return motionDataArray;
    }

    // retrun the found morse code letter if find matching morse code;
    // return 'null' otherwise;
    function findMorseCode(data) {	
    	var mctacount;
    	for (mctacount = 0; mctacount < morseCodeTableArray.length; mctacount++) {
    		if (data == morseCodeTableArray[mctacount].code) {
    			console.log(morseCodeTableArray[mctacount].letter);
    			return;
    		} 
    	}
    	console.log("null");
    }

    // for each item in myData, loop through the morse code table and print out the 
    // letter if the item matches the code; print null otherwise.
    function singleTestTime() {
    	var myData = generateMotionDataArray();
    	var mdcount;
    	var startTime = process.hrtime();

    	for (mdcount = 0; mdcount < numMotionData; mdcount++) {
    		findMorseCode(myData[mdcount]);
   	 	}

    	// calculate the execution time
    	var delta = process.hrtime(startTime);
    	var executionTime = delta[0] * 1e9 + delta[1];

    	return executionTime;
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
    sumExecutionTime = longestExecutionTime = shortestExecutionTime = singleTestTime();
    for (var testcount = 0; testcount < numTests-1; testcount++) {
    	var sample = singleTestTime();
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
