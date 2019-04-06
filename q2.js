var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var count = 0;
var current = 0;
var n = 0;
var pastPath;
var possiblePaths;
var validPath;
rl.on("line", function(line) {
  if (count === 0) {
    count = line;
  } else {
    if (n === 0) {
      n = JSON.parse(line);
    } else {
      pastPath = [...pathToCoordinates(line)];
      possiblePaths = [...pathFinder(n)];

      for (let i = 0; i < possiblePaths.length; i++) {
        if (
          !doesOverlap(pastPath, pathToCoordinates(possiblePaths[i].join("")))
        ) {
          validPath = possiblePaths[i].join("");
          break;
        }
      }
      if (n === 1) {
        if (line === "S") {
          validPath = "E";
        } else {
          validPath = "S";
        }
      }

      // exit code here
      current += 1;
      if (current > count - 1) {
        rl.close();
      }
      n = 0;
      // output below
      console.log(`Case #${current}: ${validPath}`);
    }
  }
});

// helper functions

function pathToCoordinates(path) {
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

function doesOverlap(path1, path2) {
  var overlap = false;
  path1.forEach(move1 => {
    path2.forEach(move2 => {
      if (isEqual(move1, move2)) {
        overlap = true;
      }
    });
  });
  return overlap;
}

function isEqual(move1, move2) {
  var equal = false;
  if (
    move1[0][0] === move2[0][0] &&
    move1[0][1] === move2[0][1] &&
    move1[1][0] === move2[1][0] &&
    move1[1][1] === move2[1][1]
  ) {
    equal = true;
  }
  return equal;
}
