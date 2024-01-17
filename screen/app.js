// import chroma from "chroma-js";

let colorsArray = ["red", "orange", "yellow", "green", "blue"];
let alphaRandoms = [];

let signalStrength = 0;

let clientsConnected = 0;

let artwork = document.getElementById('art');

let mappedGyroValue = 0.5;

let colorDiv1 = document.getElementById('color1');

window.addEventListener('load', (event) => {
    console.log('Page loaded!');

    let socket = io();

    socket.on('connect', () => {
        console.log("client connected!")
    })

    socket.on('GyroValueToScreen', (data) => {
        // console.log("in screen app.js, gyrovaluetoscreen", data);
        mappedGyroValue = Math.round(data * 10)/10;    
        console.log("in screen app.js, gyrovaluetoscreen", mappedGyroValue);
        let colorRandom = chroma('red').alpha(mappedGyroValue);
        colorDiv1.setAttribute('style', 'background-color: ' + colorRandom + ';');

    });

    socket.on('clientsNumber', (data) => {
        clientsConnected = data-1;
        console.log(clientsConnected);

        if(clientsConnected > 0) {
            artwork.innerHTML = '';
            alphaRandoms = [];
            for(let i = 0; i < clientsConnected; i++){
                
                let colorDiv = document.createElement('div');
                artwork.appendChild(colorDiv);
                colorDiv.setAttribute('id', 'color' + (i+1));

                let randomNum = Math.floor(Math.random() * colorsArray.length);
                alphaRandoms[i] = Math.round(Math.random() * 10) / 10;
                console.log(alphaRandoms[i]);
                // socket.emit('alphaRandomPicked', alphaRandom);
                // let colorRandom = chroma(colorsArray[randomNum]).alpha(alphaRandoms[i]);
                // let colorRandom = chroma(colorsArray[randomNum]).alpha(mappedGyroValue);

                // if(mappedGyroValue == alphaRandoms[i]){
                //     console.log('WON!');
                // };

                // colorDiv.setAttribute('style', 'background-color: ' + colorRandom + ';');
            };
            // socket.emit('alphaRandomsPicked', alphaRandoms);
        }; 
    });


})

