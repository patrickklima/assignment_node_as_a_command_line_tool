var mathOps = {
  debug: false,
  add(nums) {
    if (nums === '-h') {
      console.log("*add* \nPrecede \'add\' with 1 or more numerical arguments to add them together\n");
      return;
    }
    var sum = 0;
    nums.forEach(el => sum += Number(el));
    return sum;
  },
  sub(nums) {
    if (nums === '-h') {
      console.log("*sub* \nPrecede \'sub\' with 1 or more numerical arguments to subtract each in order\n");
      return;
    }
    var total = nums.shift();
    nums.forEach(el => total -= Number(el));
    return total;
  },
  mult(nums) {
    if (nums === '-h') {
      console.log("*mult* \nPrecede \'add\' with 1 or more numerical arguments to multiply them together\n");
      return;
    }
    var product = nums.shift();
    nums.forEach(el => product = product * el);
    return product;
  },
  div(nums) {
    if (nums === '-h') {
      console.log("*div* \nPrecede \'add\' with 1 or more numerical arguments to divide each in order\n");
      return;
    }    
    var dividend = nums.shift();
    nums.forEach(el => dividend = dividend / el);
    return dividend;
  },
  run(currOp, nums) {
    if (currOp === '-h') {
      console.log("You may chain together as many operator/number sets as you like.\n");
      return;
    }
    var result = this[`${currOp}`](nums);
    if (this.debug) console.log(`# ${currOp} ${nums.join(' ')} -> ${result}`);
    return result;
  }
  
};

function evaluateCommand(command) {
  switch(command) {
    case '-h': 
    case '--help':
      console.log(
        "\nRun calc.js with the following command: \n" +
        "node calc.js operator num num operator num num  \n" +
        "... where num is any number \n" +
        "... and operator is any of the following: \n\n" +
        "Operators: \n");
      for (var func in mathOps) {
        if (typeof mathOps[`${func}`] === 'function') mathOps[`${func}`]('-h');
        }
      console.log(
        "Run debug mode with: node calc.js -d operator number number ...etc\n"+
        "Run interactive mode with: node calc.js -i\n");
      process.exit();
      break;
    case '-d':
    case '--debug':
      mathOps.debug = true;
      args.shift();               //drop the -d command from the args array
      processMathArgs(args);
      break;
    case '-i':
    case '--interactive':
      interactiveMode();
      break;
    default:
      if (args[1] === '-h') {       //if the first op is proceded by a help command, get the op-specific help
        try {
          mathOps[`${args[0]}`]('-h');
          process.exit(0);          //stop execution after responding to help commands
          } catch(err) {
            console.log("1 - Bad input syntax. Run node calc.js -h for help");
          }
        }                           //if we made it this far, execute the typical case
      processMathArgs(args);
    }
}

function interactiveMode() {
  console.log(
    "\nNow running in interactive mode!\n"+
    "You can enter commands in the following format:\n"+
    "operator number number   For example: add 1 1 \n\n"+
    "For help, end this session and run node calc.js -h\n"+
    "Enter \"done\" to end the session\n");
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', str => {
    str = str.trim();
    if (str === 'done') process.exit(1);
    var args = str.split(' ');
    processMathArgs(args);
  });
}

function processMathArgs(args) {  
  // console.log(args);
  var runningTotal;
  var nums = [];
  var currOp = args.shift();  
  do {
    if (isNaN(args[0])) {       //found a new math operator, so run the previous operation
      try {
          runningTotal = mathOps.run(currOp, nums);
      } catch(err) {
        console.log("2 - Bad input syntax. Run node calc.js -h for help");
        process.exit(1);
      }
      currOp = args.shift();
      nums = [runningTotal];
    } else {                    //collect digits for this operation until we hit a new math operator
      nums.push(args.shift());
    }
  } while(args.length !== 0);   //each shift consumes args until we've processed the whole array
  
  try {
    runningTotal = mathOps.run(currOp, nums);
  } catch(error) {
    console.log("3 - Bad input syntax. Run node calc.js -h for help");
    process.exit(1);
  }
  console.log(runningTotal);
}
//---------------
//main execution
//remove the exec path and js file path from the args array

var args = process.argv.filter((el, i) => (i !== 0 && i !== 1));
evaluateCommand(args[0]);

//---------------

 

