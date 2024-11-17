const mongoose = require('mongoose');
const Chat = require('../model/chatModel'); // Importar el modelo de chat
const readline = require('readline'); // Importar readline para leer desde la consola

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
        senderId: new mongoose.Types.ObjectId(userId), // Convertimos el userId a ObjectId
        receiverId: new mongoose.Types.ObjectId('673346ac726d5fd18ecac2a7'), // Convertimos el admin ID a ObjectId
        content,
      });
      await userMessage.save();

      // Emitir el mensaje del usuario a la sala correspondiente
      io.to(room).emit('chat message', {
        sender: 'user',
        content: userMessage.content,
      });

      console.log(`Usuario ${userId}: ${content}`);
    });

  });

  // Leer mensajes desde la consola y emitirlos a la sala correspondiente
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.on('line', async (input) => {
    try {
      const [userId, ...messageParts] = input.split(' ');
      const message = messageParts.join(' ');  // El mensaje puede contener espacios
      const room = `user_${userId}`; // La sala es el userId prepended con 'user_'
  
      console.log(`Enviando mensaje a la sala ${room}: ${message}`);
  
      // Emitir el mensaje de la consola a la sala correspondiente
      io.to(room).emit('chat message', {
        sender: 'admin',
        content: message,
      });
  
      // Usamos un ObjectId ficticio para el admin
      const adminObjectId = new mongoose.Types.ObjectId('673346ac726d5fd18ecac2a7'); // Usamos un ObjectId ficticio aquí
  
      // Guardar el mensaje del admin en la base de datos
      const adminMessage = new Chat({
        senderId: adminObjectId, // Usamos un ObjectId válido para el admin
        receiverId: new mongoose.Types.ObjectId(userId), // Convertimos el userId a ObjectId
        content: message,
      });
  
      // Guardar el mensaje en la base de datos
      await adminMessage.save();
      console.log('Mensaje guardado en la base de datos');
    } catch (err) {
      console.error('Error al procesar el mensaje:', err);
    }
  });
  
}

module.exports = { setupSockets };