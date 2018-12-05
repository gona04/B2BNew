const http = require('http');
const app = require('./app');


const Port = process.env.PORT || 3000;

app.set('port', Port);

const server = http.createServer(app);

const io = require('./socket').init(server);
      io.on('connection', socket => {
      console.log('socket connected');
})
server.listen(Port);
