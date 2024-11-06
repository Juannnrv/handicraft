const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});