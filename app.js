let getPermissionsBttn = document.getElementById('get-permissions');
let ball = document.getElementById('ball');
let log = document.getElementById('log');

let px = 50; //Position x and y
let py = 50;
let vx = 0;
let vy = 0;
let updateRate = 1/60; //sensor refresh rate?

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

                    // let rotationDegrees = event.alpha;
                    // let frontToBackDegrees = event.beta;
                    let leftToRightDegrees = event.gamma;

                    vx = vx + leftToRightDegrees * updateRate * 2;
                    // vy = vy + frontToBackDegrees * updateRate;

                    log.textContent += leftToRightDegrees + "\n";

                    //update position and clip it to bounds 
                    px = px + vx * 0.5;
                    if (px > 98 || px < 0) {
                        px = Math.max(0, Math.min(98, px)) // Clip px between 0-98
                        vx = 0;
                    }

                    py = py + vy * 0.5;
                    if (py >  98 || py < 0){
                        py = Math.max(0, Math.min(98, py)) // Clip py between 0-98
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
// document.addEventListener('load', () => {

    getPermissionsBttn.addEventListener('click', () => {
        console.log("clicked!")
        getAccel();
    });
// });
