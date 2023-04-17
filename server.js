const express = require("express")
const app = express()

app.use(express.static("public"))

const http = require("http").createServer(app)

const serverSocket = require("socket.io")(http)


const PORT = 8000
http.listen(PORT, () => console.log("Servidor iniciado na porta "+PORT))

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"))

serverSocket.on("connect", (socket) => {
    console.log("Cliente "+socket.id+" conectou");
    socket.on("message", (texto) => {
        console.log(`Msg recebida de ${socket.id}: ${texto}`)
        serverSocket.emit("message", texto)
    })

    socket.on("status", texto => socket.broadcast.emit("status", texto))

    //dica para responder a atividade: socket.on("status", texto => socket.broadcast.emit("status", socket.login + " " + texto))

    //dica para responder a atividade: socket.on("login", login => socket.login = login) (guardar a variavel)
})