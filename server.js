const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Listen for socket connections
io.on('connection', (socket) => {
  console.log('New user connected');

  // Listen for chat messages
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
