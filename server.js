const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Хранилище сообщений
let messages = [];

// Обработка подключения клиентов
io.on('connection', (socket) => {
  console.log('Новый пользователь подключился');

  // Отправка последних 100 сообщений новому пользователю
  socket.emit('previousMessages', messages.slice(-100));

  // Слушаем сообщения чата
  socket.on('chat message', (msg) => {
    const message = { text: msg, id: socket.id };
    messages.push(message);

    // Отправляем сообщение всем подключенным пользователям
    io.emit('chat message', message);
  });

  // Обработка отключения пользователя
  socket.on('disconnect', () => {
    console.log('Пользователь отключился');
  });
});

// Запускаем сервер
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

// Настройка сервера для обслуживания статических файлов
app.use(express.static('public'));
