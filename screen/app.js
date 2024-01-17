// import chroma from "chroma-js";

let colorsArray = ["red", "orange", "yellow", "green", "blue"];
let alphaRandoms = [];

let signalStrength = 0;

let clientsConnected = 0;

let artwork = document.getElementById('art');

window.addEventListener('load', (event) => {
    console.log('Page loaded!');

    let socket = io();

    socket.on('connect', () => {
        console.log("client connected!")
    })

    socket.on('clientsNumber', (data) => {
        clientsConnected = data-1;
        console.log(clientsConnected);

        if(clientsConnected > 0) {
            artwork.innerHTML = '';
            for(let i = 0; i < clientsConnected; i++){
                
                let colorDiv = document.createElement('div');
                artwork.appendChild(colorDiv);
                colorDiv.setAttribute('id', 'color' + (i+1));

                let randomNum = Math.floor(Math.random() * colorsArray.length);
                alphaRandoms[i] = Math.random();
                console.log(alphaRandoms[i]);
                // socket.emit('alphaRandomPicked', alphaRandom);
                let colorRandom = chroma(colorsArray[randomNum]).alpha(alphaRandoms[i]);
                colorDiv.setAttribute('style', 'background-color: ' + colorRandom + ';');
            };
            // socket.emit('alphaRandomsPicked', alphaRandoms);
        }; 
    });


})

