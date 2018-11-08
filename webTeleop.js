var http = require('http').createServer(handler); //require http server, and create server with function handler()
var io = require('socket.io')(http);
var fs = require('fs'); //require filesystem module

http.listen(8080, function(){
  console.log('listening on 8080');
});


function handler (req, res) { //create server
  fs.readFile(__dirname + '/index.html', function(err, data) { //read file index.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    res.write(data); //write data from index.html
    return res.end();
  });
} 

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('keypressed', function(data) {
      if(keyIsPressed[data]==undefined){
          keyIsPressed[data]=false;
      }
      if(!keyIsPressed[data]){
          keyIsPressed[data]=true;
          callback(data);
          timeouts[data] = setInterval(callback,1000,data);
      };
  });
  socket.on('keyreleased', function(data) { 
      console.log(data+ ' released');
      keyIsPressed[data]=false;
      clearInterval(timeouts[data]);
  });
});

var keyIsPressed = {};
var timeouts = {};

function callback(data){
   console.log(data+' is pressed');
}
