const express = require('express');
const http = require('http');
const cors = require('cors');
const db = require('./server/helper/db');
const { errorHandler } = require('./server/middleware/errorHandler');
const SessionService = require('./server/middleware/sessionConfig');
const userRouter = require('./server/router/userRouter');
const authRoutes = require("./server/router/authRoutes");
const cuponRoutes = require("./server/router/cuponRoutes");
const workshopRoutes = require("./server/router/workshopRoutes");
const productRoutes = require("./server/router/productRouter");
const passport = require("./server/middleware/passportConfig");
const orderRouter = require("./server/router/orderRouter");
const verifyJwt = require("./server/middleware/authJwt");
const { setupSockets } = require('./server/sockets/socketHandler.js');
const app = express();

app.use(cors({
  origin: "http://localhost:3000", // Frontend
  credentials: true,
}));
app.use(express.json());

const server = http.createServer(app);
setupSockets(server); // Configurar los sockets

db.getInstace();
SessionService.initializeSession(app);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use(verifyJwt);
app.use('/user', userRouter);
app.use('/workshop', workshopRoutes);
app.use('/product', productRoutes);
app.use('/coupons', cuponRoutes);
app.use('/orders', orderRouter);
app.use(errorHandler);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});