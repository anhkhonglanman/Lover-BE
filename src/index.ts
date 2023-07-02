import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors'
import { AppDataSource } from "./ormconfig";
import router from "./router/router";
require('dotenv').config();
const passport = require('passport');
const signale = require('signale');
const socket = require("socket.io");

const app = express();
// Passport middleware
app.use(passport.initialize());
// Passport config
require('./middleware/passport')(passport);

AppDataSource.initialize()
    .then(() => {
        signale.success("Data Source has been initialized!");
    })
    .catch((err) => {
        signale.fatal("Error during Data Source initialization", err);
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("", router)
const server = app.listen(process.env.PORT || 8181, () => {
    signale.success(`Server is running on  port ${process.env.PORT}`)
});

const { Server } = require("socket.io");

const io = new Server({ cors: { origin: "http://localhost:5173" } });


let users = [];

const addUser = (id, socketId) => {
  if (!users.some((user) => user.id === id)) {
    users.push({ id, socketId });
  }
};
const getUser = (id) => {
    return users.find((user) => user.id === id);
  };


io.on("connection", (socket) => {
  console.log("Kết nối thành công!");

  socket.on("addUser", (id) => {
    addUser(id, socket.id);
    io.emit("getUsers", users);
  });
/// gui tin nhan
socket.on("sendMessage", ({id, receiverId, content})=>{
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
        id,
        content,
    });
})


  // ngat ket noi
  socket.on("disconnect", () => {
    console.log("Ngắt kết nối!");
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("getUsers", users);
  });
});

io.listen(5555);

