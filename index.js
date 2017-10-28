var express = require("express")
var app = express()
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 5000

app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + "/"))
app.get('/trigger', function(req, res,next) {
    res.sendFile(__dirname + '/index2.html');
});


server.listen(port)
console.log("http server listening on %d", port)


io.on('connection', function(client) {
  console.log('Client connected...');

  client.on('join', function(data) {
    console.log(data);
  });

  client.on('messages', function(data) {
    client.emit('broad', data);
    client.broadcast.emit('broad',data);
  });

});
