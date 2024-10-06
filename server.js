const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 5000;

io.on('connection', socket => {
  console.log('Usuario conectado:', socket.id);

  // Escucha cuando un usuario envía una señal de WebRTC
  socket.on('signal', (data) => {
    console.log('Signal recibida!', data);
    // Envía la señal a otro usuario en particular
    io.to(data.to).emit('signal', data);
  });

  // Escucha cuando un usuario se une a una sala
  socket.on('join', roomId => {
    console.log(`Usuario ${socket.id} se unió a la sala: ${roomId}`);
    socket.join(roomId);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado 1:', socket.id);
  });
});

server.listen(port, () => console.log(`Servidor de señalización corriendo en el puerto ${port}`));
