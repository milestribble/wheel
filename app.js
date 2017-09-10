const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(8080)

const WebSocket = require('ws');
const wss = new WebSocket.Server({port:8081});
let users = []

wss.on('connection', function (ws) {
  users.push(ws)
  console.log('user connected');
  ws.on('message', function (message) {
    sendAll(message)
  })
  ws.on('close', function (client) {
    users.splice(users.indexOf(client),1)
    console.log('user disconnected');
  })
  ws.on('error', function (client) {
    users.splice(users.indexOf(client),1)
  })
})

function sendAll (message) {
  for (let i=0; i<users.length; i++){
    if(users[i].readyState == users[0].OPEN){
      users[i].send(message)
    }
  }
}
