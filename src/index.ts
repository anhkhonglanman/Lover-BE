import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors'
import {AppDataSource} from "./ormconfig";
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
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use("", router)
const server = app.listen(process.env.PORT || 8181, () => {
    signale.success(`Server is running on  port ${process.env.PORT}`)
});

//đây là config backend
const { Server } = require("socket.io");
const io = new Server(server);
const sockets = new Map() // holds all active sockets

io.on('connection', (socket) => {
    sockets.set(socket.id,socket) // add socket to Map object
    socket.join("ChessRoom") // join socket to demo room

    socket.on('disconnect', (data)=>{
        signale.watch(`${socket.id} disconnected`);
        sockets.delete(socket.id) // delete socket from Map object
    })

    socket.on('getrooms', (data,replyFn)=>{
        signale.watch(`${socket.id}: received getrooms event with ${data}`);
        const rooms = Array.from(io.sockets.adapter.rooms).map( (room) => {
            return { name: room[0], members: Array.from(room[1])}
        })
        replyFn(rooms)
    })

});

//config client
const test = require('socket.io-client');
const socketTEst = test( "http://localhost:8181" );


socketTEst.on('connect', async ()=>{
    signale.success(`${socketTEst.id} connected`)
    const data = "OptionalData"
    socketTEst.emit('joinroom', 'agent')

    socketTEst.emit( "getrooms", data, (rooms) =>{
        rooms.forEach((room, index) => {
            signale.success(`room${index}: `, room)
        });
    })
})

socketTEst.on('error', async ()=>{
    signale.fatal(`${socketTEst.id} error`)
})