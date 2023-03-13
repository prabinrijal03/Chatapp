
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const ejs = require('ejs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
users = {};

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

io.on('connection', socket =>{
  socket.on('new-user-joined', name =>{
      console.log('New user', name); 
      users[socket.id] = name;
      socket.broadcast.emit('user-joined', name);
  });
  socket.on('send', message =>{
      socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
