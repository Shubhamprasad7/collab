const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

let content = ''; // shared document content

io.on('connection', socket => {
    console.log('User connected');

    // Send current content to new user
    socket.emit('load-content', content);

    // Handle changes from clients
    socket.on('content-change', newContent => {
        content = newContent;
        socket.broadcast.emit('content-change', newContent);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
