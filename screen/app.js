let colorsArray = ["red", "orange", "yellow", "green", "blue"];

let signalStrength = 0;

let clientsConnected = 0;


window.addEventListener('load', (event) => {
    console.log('Page loaded!');

    let socket = io();

    socket.on('connect', () => {
        console.log("client connected!")
    })

    socket.on('clientsNumber', (data) => {
        clientsConnected = data-1;
        console.log(clientsConnected);
    });


})

