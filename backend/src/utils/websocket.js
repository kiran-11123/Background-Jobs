import { Server } from "socket.io";
import dotenv from 'dotenv'
dotenv.config();


let io;

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", socket => {
    console.log("Client connected:", socket.id);
  });
}

export function emitJobUpdate(payload) {
  if (io) {
    io.emit(payload);
  } else {
    console.error("Socket.io not initialized.");
  }

}