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
    var numMotionData = 50000;
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
    			return morseCodeTableArray[mctacount].letter;
    		} 
    	}
    	return null;
    }

    // for each item in myData, loop through the morse code table and print out the 
    // letter if the item matches the code; print null otherwise.
    function singleTestTime() {
    	var myData = generateMotionDataArray();
    	var mdcount;
    	var startTime = process.hrtime();

    	for (mdcount = 0; mdcount < numMotionData; mdcount++) {
    		console.log(findMorseCode(myData[mdcount]));
   	 	}

    	// calculate the execution time
    	var delta = process.hrtime(startTime);
    	var executionTime = delta[0] * 1e9 + delta[1];

    	return executionTime;
    }

    // Run the tests
    var numTests, executionTimeArray = [];
    var longestExecutionTime, shortestExecutionTime;
    var testcount;

    if (process.argv.length != 3) {
    	console.log("Please run the program with one argument: the number of tests you want to conduct.\n\t"
    	+ "For example, Spike.js 3");
    } else {
    	numTests = process.argv[2];
    }

    for (testcount = 0; testcount < numTests; testcount++) {
    	executionTimeArray.push(singleTestTime());
    }

    let sumExecutionTime = executionTimeArray.reduce((pre, cur) => cur += pre);
    let averageExecutionTime = sumExecutionTime/executionTimeArray.length;

    // computer shortest, longest execution time.
    executionTimeArray.sort();
    shortestExecutionTime = executionTimeArray[0];
    longestExecutionTime = executionTimeArray[executionTimeArray.length-1];

    console.log("Printing the letters of " + numMotionData + " test arrays, \n" + 
    "The average execution time: " + averageExecutionTime + " ns.");
    console.log("The longest execution time: ", (numTests < 3 ? "not available." : longestExecutionTime+ " ns."));
    console.log("The shortest execution time: ", (numTests < 3 ? "not available." : shortestExecutionTime + " ns."));

})();
