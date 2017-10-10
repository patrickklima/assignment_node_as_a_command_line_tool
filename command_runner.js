var cp = require('child_process');

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', (str) => {
  str = str.trim();
  
  if (str === 'q' || str === 'quit') {
    console.log("quit command received");
    process.exit();
  } else {
    var cmd = cp.spawn('echo', [str]);
    cmd.on("error", (err) => {
      console.error(`${err.stack}`);
    });
    cmd.stdout.on('data', (data) => {
      console.log(`input: ${data}`);
    });
    cmd.stderr.on('data', (data) => {
      console.error(`error: ${data}`);
    });
    // cmd.on('close', (code) => {
    //   console.log(`Child process exited with ${code}`);
    // });
  }
});




