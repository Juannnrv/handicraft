const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const db = require('./server/helper/db');
const { errorHandler } = require('./server/middleware/errorHandler');
const SessionService = require('./server/middleware/sessionConfig');
const userRouter = require('./server/router/userRouter');
const authRoutes = require("./server/router/authRoutes");
const passport = require("./server/middleware/passportConfig"); // Asegúrate de que la ruta sea correcta

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

db.getInstace();

SessionService.initializeSession(app);

app.use(passport.initialize());
app.use(passport.session());

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

app.use("/auth", authRoutes);
app.use(verifyJwt);
app.use('/user', userRouter);
app.use("/auth", authRoutes);

app.use(errorHandler);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});