const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: true,
        credentials: true,
        methods: ["GET", "POST"]
    }
});

let messages = [];

//escucha
io.on('connection', (socket) => {
    console.log("Nuevo usuario conectado");

    socket.on("sendMessage", (messageJSON) => {
        console.log("Enviando un mensaje: ");
        messages.push(messageJSON);
        console.log(messages);
        //socket.broadcast.emit("receiveMessage", messageJSON);
        io.emit("receiveMessage", messageJSON);
    });

    socket.on("onStartChat", () => {
        socket.emit("loadMessages", messages.reverse());
    });
})


app.get('/', (req, res) => {
    res.send('<h1>vista default del socket</h1>');
});

http.listen(3000, () => {
    console.log("Escuchando puerto 3000");
});