let express = require ('express');
let app = express();

let http = require('http');
let server= http.createServer(app);

app.use('/', express.static('screen'));
app.use('/instructions', express.static('phones'));
app.use('/waitlist', express.static('waitlist'));

let port = process.env.PORT || 3000;
server.listen(port, () => (
    console.log("Server is listening at localhost:" + port)
));

let io = require('socket.io');
io = new io.Server(server);

let waitlist = '/waitlist/index.html';
let clientsCounter = 0;

// let alphaRandoms = [];

io.on('connection', (socket) => {
    console.log('Client connected: ' + socket.id);
    clientsCounter++;

    console.log(clientsCounter);

    if (clientsCounter > 4){
        io.to(socket.id).emit('redirect', waitlist);
    };
    

    io.emit('clientsNumber', clientsCounter);

    // io.to(socket.id).emit('nightBttnDataE', nightBttnData);
    // io.to(socket.id).emit('liveDataE', liveData);



    // socket.on('feetBttnClick', (data) => {
    //     console.log("Feet button click: " + data);
    //     liveData.feetBttnClickStat = data;
    //     eventCounter++;

    //     io.emit('feetBttnClick', liveData.feetBttnClickStat);
    // });


    // might need to automatically sign out people after a certain time

    // socket.on('alphaRandomsPicked', (data) => {
    //     alphaRandoms = data;
    // });

    socket.on('mappedGyroValue', (data) => {
        console.log(data);
    });

    socket.on('disconnect', () => {
        console.log('Client ' + socket.id + " left");
        clientsCounter--;
        console.log(clientsCounter);

        io.emit('clientsNumber', clientsCounter);

    });
})