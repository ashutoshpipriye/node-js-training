const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const Filter = require("bad-words");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

let count = 0;

io.on("connection", (socket) => {
  console.log("New websocket connection");

  socket.emit("message", "Welcome!");
  socket.broadcast.emit("message", "A new user has joined!");

  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("Profinity is not allowed!");
    }

    io.emit("message", message);
    callback();
  });

  socket.on("sendLocation", (coords, callback) => {
    // io.emit("message", `Location: ${coords.latitude}, ${coords.longitude}`);
    io.emit(
      "message",
      `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
    );
    callback();
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user has left!");
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

/*------------------------------Pratice--------------------------*/

//server (emit) -> Client (receive) - counterupdated
//client (emit) -> server (receive) - increment

// socket.on("disconnect", () => {
//   console.log("Websocket disconnected");
// });
// socket.emit("counterUpdated", count);

// socket.on("increment", () => {
//   count++;
//   // socket.emit("counterUpdated", count);
//   io.emit("counterUpdated", count);
// });
