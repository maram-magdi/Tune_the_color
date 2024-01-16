let express = require ('express');
let app = express();

let http = require('http');
let server= http.createServer(app);

app.use('/', express.static('screen'));


let port = process.env.PORT || 3000;
server.listen(port, () => (
    console.log("Server is listening at localhost:" + port)
));

let io = require('socket.io');
io = new io.Server(server);


io.on('connection', (socket) => {
    console.log('Client connected: ' + socket.id);
    
    // io.to(socket.id).emit('nightBttnDataE', nightBttnData);
    // io.to(socket.id).emit('liveDataE', liveData);



    // socket.on('feetBttnClick', (data) => {
    //     console.log("Feet button click: " + data);
    //     liveData.feetBttnClickStat = data;
    //     eventCounter++;

    //     io.emit('feetBttnClick', liveData.feetBttnClickStat);
    // });


    socket.on('disconnect', () => {
        console.log('Client ' + socket.id + " left");
        
    });
})