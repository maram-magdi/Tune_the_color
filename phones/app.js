let socket = io();

let getPermissionsBttn = document.getElementById('get-permissions');
let ball = document.getElementById('ball');
let log = document.getElementById('log');

let px = 50; //Position x and y
let py = 50;
let vx = 0;
let vy = 0;
let updateRate = 1/60; //sensor refresh rate?

let mapValue;

function mapValueToRange(value, min = -90, max = 90) {
    // // Ensure the value is within the original range
    // const clampedValue = Math.min(Math.max(value, originalMin), originalMax);

    // Calculate the percentage of the value within the original range
    const percentage = (value - min) / (max - min);

    // Map the percentage to the 0 to 1 range
    const mappedValue = percentage;

    return mappedValue;
};

function getAccel() {
    DeviceMotionEvent.requestPermission().then(response => {

        log.textContent += response + "\n";

        if(response == 'granted') {
            // console.log("Accelerometer permission granted!");
            log.textContent += "Accelerometer permission granted! \n";
            //do stuff here - not sure what yet

            //add a listener to get phone's acceleration 
                //in the x,y,z axis (units in m/s2)
                // window.addEventListener('devicemotion', (event) => {
                //     console.log(event);
                // });
            
            // add a listener for phone's orientation 
                //in the alpha-beta-gamma axes (units in degrees)
                window.addEventListener('deviceorientation', (event) => {
                    console.log(event);

                    //left to rigth degrees from -90 to 90 
                    // math.round it 
                    // map those numbers from 0 to 1
                    // randomly choose a number from 0 to 1
                    //if random0to1 == mapped-90to90 then color becomes hidden or delete to show photo behind, 


                    // let rotationDegrees = event.alpha;
                    // let frontToBackDegrees = event.beta;
                    let leftToRightDegrees = Math.round(event.gamma);
                    mapValue = mapValueToRange(leftToRightDegrees);
                    
                    log.textContent += mapValue + "\n";
                    console.log("in phones/app.js, about to emit gyro mapped val", mapValue);
                    socket.emit('mappedGyroValue', mapValue);

                    vx = vx + leftToRightDegrees * updateRate * 2;
                    // vy = vy + frontToBackDegrees * updateRate;

                    //update position and clip it to bounds 
                    px = px + vx * 0.5;
                    if (px > 95 || px < 0) {
                        px = Math.max(0, Math.min(95, px)) // Clip px between 0-98
                        vx = 0;
                    }

                    py = py + vy * 0.5;
                    if (py >  95 || py < 0){
                        py = Math.max(0, Math.min(95, py)) // Clip py between 0-98
                        vy = 0; 
                    }

                    // dot = document.getElementsByClassName("indicatorDot")[0]
                    // dot.setAttribute('style', "left:" + (px) + "%;" +"top:" + (py) + "%;");
                    ball.setAttribute('style', "left:" + (px) + "%;" + 
                                        "top:" + (py) + "%;");

                    // ball.setAttribute('style', "left:" + (leftToRightDegrees) + "px;" + 
                    //                             "top:" + (frontToBackDegrees) + "px;");
                });
        }
    });
}
window.addEventListener('load', (event) => {


    console.log('Page loaded!');


    socket.on('connect', () => {
        console.log("client connected!");

    });

    socket.on('redirect', (newPage) => {
        window.location.href = newPage;
    });




    getPermissionsBttn.addEventListener('click', () => {
        console.log("clicked!")
        getAccel();
        // console.log(mapValue);
    });

});
