// import chroma from "chroma-js";

// import JSConfetti from 'js-confetti';

const jsConfetti = new JSConfetti();

let colorsArray = ["red", "orange", "yellow", "green", "blue"];
// let alphaRandoms = [];
let alphaRandom;

let signalStrength = 0;

let clientsConnected = 0;

let artwork = document.getElementById('art');

let mappedGyroValue = 0.5;

let playingSwitch = true;

let clickAudio = document.getElementById('clickAudio');

let degreeDiff;

// let colorDiv1 = document.getElementById('color1');
let colorDiv1 = document.createElement('div');

let audioContext, audioElement, audioSource, gainNode;


// Linear mapping function for volume adjustment
const mapVolume = (inputValue) => {
    // // Ensure the input value is within the valid range [0, 1]
    // inputValue = Math.min(1, Math.max(0, inputValue));
    
    // Map the input value to the desired volume range [0.1, 1]
    const minVolume = 0.1;
    const maxVolume = 1;
    const mappedVolume = minVolume + inputValue * (maxVolume - minVolume);
  
    return mappedVolume;
};
  
// Adjust volume based on your mapped values
const adjustVolume = (mappedValue) => {
    gainNode.gain.value = mappedValue;
};

clickAudio.addEventListener('click', () => {
    console.log('clicked!');

    // Create an audio context
    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Load your audio file
    audioElement = new Audio('/media/audio.mp3');
    audioSource = audioContext.createMediaElementSource(audioElement);

    // Create gain node for volume control
    gainNode = audioContext.createGain();
    audioSource.connect(gainNode);
    gainNode.connect(audioContext.destination);
});

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
      
        if(playingSwitch == true){
            // console.log("in screen app.js, gyrovaluetoscreen", data);
            mappedGyroValue = Math.round(data * 10)/10;    
            console.log("in screen app.js, gyrovaluetoscreen", mappedGyroValue);
            let colorRandom = chroma('red').alpha(mappedGyroValue).css();
            // console.log(colorRandom);
            colorDiv1.style.backgroundColor = colorRandom;

            degreeDiff = Math.abs(alphaRandom - mappedGyroValue);

            // Start the audio playback
            audioElement.play();

            // Call the adjustVolume function with your mapped values
            // const mappedVolumeValue = 0.5; // Replace with your desired mapped value
            adjustVolume(mapVolume(degreeDiff));
        };
        
      if(mappedGyroValue == alphaRandom && playingSwitch == true){
        
        playingSwitch = false;
        
        console.log("Winner!");
        let statement = document.createElement('p');
        statement.innerHTML = "Yay! You won!";
        artwork.appendChild(statement);
        colorDiv1.style.backgroundColor = chroma('red').alpha(alphaRandom).css();
        jsConfetti.addConfetti({
            confettiColors: [
              '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',
            ],
        });
        
      };
      
    });
  
    

    
})

