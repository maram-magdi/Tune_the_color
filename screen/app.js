let colorsArray = ["red", "orange", "yellow", "green", "blue"];

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

                let randomNum = Math.floor(Math.random() * colorsArray.length);
                let colorDiv = document.createElement('div');
                artwork.appendChild(colorDiv);
                colorDiv.setAttribute('id', 'color' + (i+1));
                colorDiv.setAttribute('style', 'background-color: ' + colorsArray[randomNum] + ';');
            };
        }; 
    });


})

