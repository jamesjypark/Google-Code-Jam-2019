var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var count = 0;
var current = 0;
rl.on("line", function(line) {
  if (count === 0) {
    count = line;
  } else {
    // enter code here
    const input = JSON.parse(line);
    let digits = input.toString().split("");
    let num1 = [];
    let num2 = [];
    digits.forEach(digit => {
      if (digit == 4) {
        num1.push(2);
        num2.push(2);
      } else {
        num1.push(digit);
        if (num2.length !== 0) {
          num2.push(0);
        }
      }
    });
    num1 = num1.join("");
    num2 = num2.join("");

    // end code here
    current += 1;
    if (current > count - 1) {
      rl.close();
    }
    console.log(`Case #${current}: ${num1} ${num2}`);
  }
});
