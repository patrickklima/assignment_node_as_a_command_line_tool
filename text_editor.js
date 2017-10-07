var fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf8');

var path = './data';
var filename = 'input.txt';

process.stdin.on('data', function(str){
    str = str.trim();
  
  if(str === '\\q') {
    console.log("received a quit command");
    process.exit();
  } else {
    if(!fs.existsSync(path)) fs.mkdirSync(path);
    fs.appendFile(path+'/'+filename, str, (err) => {if(err) throw err});
  }
});
