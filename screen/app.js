// import chroma from "chroma-js";

let colorsArray = ["red", "orange", "yellow", "green", "blue"];
// let alphaRandoms = [];
let alphaRandom;

let signalStrength = 0;

let clientsConnected = 0;

let artwork = document.getElementById('art');

let mappedGyroValue = 0.5;

// let colorDiv1 = document.getElementById('color1');
let colorDiv1 = document.createElement('div');


window.addEventListener('load', (event) => {
    console.log('Page loaded!');

    let socket = io();

    socket.on('connect', () => {
        console.log("client connected!")
    });

    socket.on('clientsNumber', (data) => {
        clientsConnected = data-1;
        console.log(clientsConnected);

        if(clientsConnected == 1) {
            artwork.innerHTML = '';
            // alphaRandoms = [];
            artwork.appendChild(colorDiv1);
            colorDiv1.setAttribute('id', 'color1');
            alphaRandom = Math.round(Math.random() * 10) / 10;
            console.log(alphaRandom);



            // for(let i = 0; i < clientsConnected; i++){
                
            //     let colorDiv = document.createElement('div');
            //     artwork.appendChild(colorDiv);
            //     colorDiv.setAttribute('id', 'color' + (i+1));

            //     let randomNum = Math.floor(Math.random() * colorsArray.length);
            //     alphaRandoms[i] = Math.round(Math.random() * 10) / 10;
            //     console.log(alphaRandoms[i]);
            //     // socket.emit('alphaRandomPicked', alphaRandom);
            //     // let colorRandom = chroma(colorsArray[randomNum]).alpha(alphaRandoms[i]);
            //     // let colorRandom = chroma(colorsArray[randomNum]).alpha(mappedGyroValue);

            //     // if(mappedGyroValue == alphaRandoms[i]){
            //     //     console.log('WON!');
            //     // };

            //     // colorDiv.setAttribute('style', 'background-color: ' + colorRandom + ';');
            // };
            // socket.emit('alphaRandomsPicked', alphaRandoms);
        }; 
    });

    socket.on('GyroValueToScreen', (data) => {
        // console.log("in screen app.js, gyrovaluetoscreen", data);
        mappedGyroValue = Math.round(data * 10)/10;    
        console.log("in screen app.js, gyrovaluetoscreen", mappedGyroValue);
        let colorRandom = chroma('red').alpha(mappedGyroValue).css();
        // console.log(colorRandom);
        colorDiv1.style.backgroundColor = colorRandom;

        if(mappedGyroValue == alphaRandom){
            console.log("Winner!");
        }

    });
})

