const mongoose = require('mongoose');
const Chat = require('../model/chatModel'); // Importar el modelo de chat

function setupSockets(server) {
  const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:3000", // Frontend
      credentials: true,
    }
  });

  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    
    // Cuando el usuario se conecta, se une a su sala específica
    socket.on('joinRoom', ({ userId }) => {
      const room = `user_${userId}`;
      socket.join(room);
      console.log(`Usuario ${userId} unido a la sala ${room}`);
    });

    // Evento cuando un usuario envía un mensaje
    socket.on('chat message', async ({ userId, content }) => {
      const room = `user_${userId}`;

      // Guardar el mensaje del usuario en la base de datos
      const userMessage = new Chat({
        senderId: userId, // Guardamos el ObjectId del usuario
        receiverId: 'admin', // El receptor es siempre 'admin'
        content,
      });
      await userMessage.save();

      // Emitir el mensaje del usuario a la sala correspondiente
      io.to(room).emit('chat message', {
        sender: 'user',
        content: userMessage.content,
      });

      // Crear la respuesta automática del admin usando un ObjectId ficticio
      const adminObjectId = new mongoose.Types.ObjectId(); // Crear un ObjectId ficticio
      const adminResponse = `Hola, soy el admin. Hemos recibido tu mensaje: "${content}"`;
      const adminMessage = new Chat({
        senderId: adminObjectId, // Usamos el ObjectId ficticio para el admin
        receiverId: userId, // El mensaje se envía al usuario
        content: adminResponse,
      });
      await adminMessage.save();

      // Emitir la respuesta del admin al usuario
      io.to(room).emit('chat message', {
        sender: 'admin',
        content: adminMessage.content,
      });
    });

    // Evento cuando un cliente se desconecta
    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
}

module.exports = { setupSockets };
