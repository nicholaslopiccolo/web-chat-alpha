$('#chat_box').hide();

$(function() {

  socket = io();
  socket.in_the_chat = false;
  socket.msgS = new Audio("msg.mp3");

  $('#debug').click(function() {
    console.log(socket);
  });

  $('#logout').click(function() {
    //window.href = "www.google.com";
  });

  $('#start').click(function() {
    socket.nickname = $('#nickname').val();
    //vuePeople.me = socket.nickname;
    if (socket.nickname != '') {
      start();
    }
  });

  $('#send').click(function() {
    sendMessage();
  });

  $(document).keypress(function(e) {
    if (e.which == 13 && socket.in_the_chat == true) {
      sendMessage();
    } else if (e.which == 13 && socket.in_the_chat == false) {
      socket.nickname = $('#nickname').val();

      start();
    }
  });
  socket.on('welcome', function(users) {
    console.log('SERVER/ send me welcome');
    console.log('SERVER/ welcome: ');
    console.log(users);
    for (user in users) {
      if (users[user] == socket.nickname) removeEl(users, user);
    }
    vuePeople.users = users;
    removeEl(vuePeople.users,socket.nickname);
  });

  socket.on('chat message', function(nick, msg) {
    console.log('SERVER/ new message from ' + nick);
    var message = {
      'text': msg,
      'owner': nick
    }
    var messages = vueMessages.messages;
    messages.push(message);
    vueMessages.messages = messages;
    $('#chat_box').animate({scrollTop: $("#chat_box").offset().top},1000);
  });

});

function sendMessage() {
  console.log('i am sending chat message event');
  if ($('#m').val() != '')
    socket.emit('chat message', socket.nickname, $('#m').val());
  $('#m').val('');
  return false;
}

function start() {
  socket.in_the_chat = true;
  if (socket.nickname != '') {
    toggleBox();
    $('#mynick').html(socket.nickname);
    console.log('i am sending join event');
    socket.emit('join', socket.nickname);
    vueMessages.me = socket.nickname;
  }
}
function toggleBox(){
  $('#chat_box').toggle();
  $('#start_box').toggle();
}
function removeEl(array, el) {
  var index = array.indexOf(el);
  if (index > -1) {
    array.splice(index, 1);
    console.log('ho rimosso: ' + el);
  }
}