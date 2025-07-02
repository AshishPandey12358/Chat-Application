/*
import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./Routes/userRoutes.js";
import messageRouter from "./Routes/messageRoutes.js";
import {Server} from "socket.io";

//create Express app and HTTP server
const app = express();
const server = http.createServer(app); // SocketIo works with http server

//Initialize socket.io server
export const io = new Server(server,{
    cors: {origin: "*"}
})

//Store online users
export const userSocketMap = {}; //{userId: socketId}

// Socket.io connection handler
io.on("connection" ,(socket)=>{
    const userId = socket.handshake.query.userId;
    console.log("User Connected",userId);

    if(userId) userSocketMap[userId] = socket.id; // if user exist then add its data to map

    //Emit online users to all connected client
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("User Disconnect", () =>{
        console.log("User Disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });

    // Auto disconnect (browser refresh/close etc.) through chatgpt to avoid error
    socket.on("disconnect", () => {
        console.log("User Disconnected (auto)", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
    
    
});

//Middleware Setup
app.use(express.json({limit:"4mb"})); // max image upload limit
app.use(cors());

app.use("/api/status" , (req, res)=> res.send("Server is Live"));
app.use("/api/auth", userRouter); // routes setup
app.use("/api/messages", messageRouter)
//Connect to mongoDB
await connectDB();

//first check if project is running in local environment or not
if(process.env.NODE_ENV !== "production"){
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, ()=>console.log("Server is Running on PORT: "+PORT));
}

export default server
*/

import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./Routes/userRoutes.js";
import messageRouter from "./Routes/messageRoutes.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// ✅ FIXED CORS for socket.io
export const io = new Server(server, {
  cors: {
    origin: "https://chat-application-psi-sage.vercel.app",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Track online users
export const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User Connected", userId);

  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("User Disconnect", () => {
    console.log("User Disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected (auto)", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// ✅ FIXED CORS for Express API
app.use(cors({
  origin: "https://chat-application-psi-sage.vercel.app",
  credentials: true,
}));

app.use(express.json({ limit: "4mb" }));

app.use("/api/status", (req, res) => res.send("Server is Live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

await connectDB();

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () =>
    console.log("Server is Running on PORT: " + PORT)
  );
}

export default server;
