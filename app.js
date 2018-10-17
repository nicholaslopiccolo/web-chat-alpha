/* ------------------------- server side ----------------------------- */
var express = require('express');
var app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.send('hello world');
})
server = app.listen(PORT);

/* ------------------------- log side ----------------------------- */
var log = require('./log/logger.js');
/* ------------------------- socket.io side ----------------------------- */
const io = require("socket.io")(server, {
  pingTimeout:10000,
  pingInterval:50000,
  upgradeTimeout:20000,
  serveClient:true, //accetta o no le connessioni dal client
});
var users = [];
var usIp = [];

io.on('connection', function(socket) {
  console.log('CLIENT/ connection enstablished');

  socket.on('join', function(nickname) {
    socket.nickname = nickname;
    var user = {
      nick: socket.nickname,
      ip: socket.handshake.address.replace('::ffff:',''),
    };
    socket.user = user;
    console.log('CLIENT/ join event from ' + nickname);
    log.join(user);
    usIp.push(user);
    users.push(nickname);
    console.log(users);
    console.log(usIp);
    console.log('SERVER/ i am emitting welcome event: ' + users);
    io.emit('welcome', users);
  });

  socket.on('chat message', function(nickname, msg) {
    console.log('CLIENT/ chat message event');
    console.log('SERVER/ i am emitting chat message event:' + nickname);
    io.emit('chat message', nickname, msg);
  })

  socket.on('disconnect', function() {
    console.log('CLIENT/ disconnect event: ' + socket.nickname);
    removeEl(usIp,socket.user);
    removeEl(users, socket.nickname);
    io.emit('welcome', users);
  });
});

function removeEl(array, el) {
  console.log(array);
  var index = array.indexOf(el);
  if (index > -1) {
    array.splice(index, 1);
    console.log('ho rimosso:');
    console.log(el);
  }
}