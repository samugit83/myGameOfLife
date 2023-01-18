const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);

const routes = require('./routes');

const PORT = 8080

app.use(routes)
app.use(express.static(path.join(__dirname, '../mygame_front/static')));


server.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`)
  });
  

  
  