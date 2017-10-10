var cp = require("child_process");

//Using spawn

// var cmd = cp.spawn('ps', ["aux"]);

// cmd.on('error', err => {
//   console.error(`${err.stack}`);
// });

// cmd.stdout.on('data', data => {
//   console.log(`Data: ${data}`);
// });

// cmd.stderr.on('data', data => {
//   console.error(`STDERR: ${data}`);
// });

// cmd.on('close', code => {
//   console.log(`exit code: ${code}`);
// });

//Using exec

var cmd = cp.exec('ps "aux"', (err, stdout, stderr) => {
  if (err) {
    console.error(err.stack);
    console.error(`Error code: ${err.code}`);
    console.error(`Signal received: ${err.signal}`);
  }
  if (stderr) {
    console.error(`Child Process STDERR: ${stderr}`);
  }
  
  console.log(`Child Process STDOUT: ${stdout}`);
});

cmd.on('exit', (code) => {
  console.log(`Child process exited with code: ${ code }`);
});
