const socket = io();
const editor = document.getElementById('editor');

// Load current content
socket.on('load-content', content => {
    editor.value = content;
});

// On content change from others
socket.on('content-change', newContent => {
    editor.value = newContent;
});

// Send changes as user types
editor.addEventListener('input', () => {
    socket.emit('content-change', editor.value);
});
