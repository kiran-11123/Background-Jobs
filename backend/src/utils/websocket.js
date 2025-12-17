import { Server } from "socket.io";

let io;

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*", // allow frontend to connect
      methods: ["GET", "POST"]
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
  });
}

export function emitJobUpdate(payload) {
  if (io) io.emit("job-update", payload);
}
