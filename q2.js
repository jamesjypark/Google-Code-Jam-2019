var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var count = 0;
var current = 0;
var n = 0;
var output = [];
var currentPosition = [];
var newPosition = [];
rl.on("line", function(line) {
  if (count === 0) {
    count = line;
  } else {
    output = line.split("");
    if (n === 0) {
      n = JSON.parse(line);
    } else {
      // enter code here

      // get previous path as coordinate pairs
      console.log(pathToCoor(line));

      // iterate through map while

      //   console.log(previousMoveCoor);
      //   console.log(pathFinder(n));
      // exit code here
      current += 1;
      if (current > count - 1) {
        rl.close();
      }
      n = 0;
      // output below
      //   console.log(`Case #${current}: previousMoveCoor is ${previousMoveCoor}`);
    }
  }
});

// helper functions

function pathToCoor(path) {
  var coorPath = [];
  var currentPosition = [0, n - 1];
  var newPosition = [...currentPosition];
  path.split("").forEach(move => {
    if (move === "S") {
      newPosition[1] = newPosition[1] - 1;
      coorPath.push([currentPosition, [...newPosition]]);
      currentPosition = [...newPosition];
    } else {
      newPosition[0] = newPosition[0] + 1;
      coorPath.push([currentPosition, [...newPosition]]);
      currentPosition = [...newPosition];
    }
  });
  return coorPath;
}
function pathFinder(n) {
  let digitLength = 2 * (n - 1);
  let digitArray = [];
  const max = Math.pow(2, digitLength);
  for (let i = 0; i < max; i++) {
    let validBinary = formatBinary(
      decimalToBinary(i),
      decimalToBinary(max - 1).length
    );
    if (validBinary) {
      digitArray.push(binaryToDirection(validBinary));
    }
  }
  return [...digitArray];
}

function decimalToBinary(decimal) {
  return (decimal >>> 0).toString(2);
}

function formatBinary(binary, bits) {
  let formatBinary = binary;
  let countOnes = 0;
  if (binary.length < bits) {
    formatBinary = formatBinary.split("");
    while (formatBinary.length < bits) {
      formatBinary.unshift("0");
    }
  } else {
    formatBinary = formatBinary.split("");
  }
  formatBinary.forEach(digit => {
    if (digit == 0) {
      countOnes += 1;
    }
  });
  if (countOnes === bits / 2) {
    return formatBinary;
  }
}

function binaryToDirection(binary) {
  return binary.map(digit => {
    if (digit == 0) {
      return "S";
    } else {
      return "E";
    }
  });
}
