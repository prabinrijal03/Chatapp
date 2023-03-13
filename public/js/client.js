const socket = io();
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}
const nam = prompt('Enter your name to join');
socket.emit('new-user-joined', nam);
socket.on('user-joined', nam =>{
append(`${nam} joined the chat`, 'left');
});