//remove the exec path and js file path from the args array
var args = process.argv.filter((el, i) => (i !== 0 && i !== 1));

//check for commands, then remove the command from the args array
if (args[0].isNaN) {
  // evaluateCommand(args[0]);
  args.filter((el, i) => (i !== 0));
  console.log(args);
}

