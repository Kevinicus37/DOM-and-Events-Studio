// Write your JavaScript code here.
// Remember to pay attention to page loading!
window.addEventListener("load", function(){
    let rocket = document.getElementById("rocket");
    let boxWidth = rocket.parentElement.offsetWidth/2;
    let boxHeight = rocket.parentElement.offsetHeight;
    let startHeight = `${boxHeight - rocket.offsetHeight}px`;
    rocket.style.top = startHeight;
    
    let buttons = document.getElementsByTagName("button");

    for (i=0; i < buttons.length; i++){
        let directions = ["Up", "Down", "Left", "Right"];
        if (!directions.includes(buttons[i].innerHTML)){
            continue;
        }
        buttons[i].addEventListener("click", function(event) {
            rocket.style.position = "relative";
            
            let name = event.target.innerHTML;
            if (name === "Left"){
                let newValue = adjustLocation(rocket.style.left, -10);
                if (Math.abs(newValue) < boxWidth){
                    rocket.style.left = `${newValue}px`;
                }
            } else if (name === "Right") {
                let newValue = adjustLocation(rocket.style.left, 10);
                if (Math.abs(newValue) < boxWidth){
                    rocket.style.left = `${newValue}px`;
                }
                        
            } else if (name === "Up") {
                let newValue = adjustLocation(rocket.style.top, -10);
                if (newValue > 0){
                    rocket.style.top = `${newValue}px`;
                    let status = document.getElementById("spaceShuttleHeight");
                    status.innerHTML = Number(status.innerHTML) + 10000;
                }
        
            } else if (name === "Down"){
                let status = document.getElementById("spaceShuttleHeight");
                 if (Number(status.innerHTML) >= 10000){
                    status.innerHTML -= 10000;
                    let newValue = adjustLocation(rocket.style.top, 10);
                    if (newValue < boxHeight - rocket.offsetHeight){
                        rocket.style.top = `${newValue}px`;
                    }
                }
            }
        });
    }
    
    let takeOff = document.getElementById("takeoff");
    takeOff.addEventListener("click", function(){
        let isReady = window.confirm("Confirm that the shuttle is ready for takeoff.");

        if (isReady) {
            document.getElementById("flightStatus").innerHTML = "Shuttle in flight.";
            document.getElementById("shuttleBackground").style.backgroundColor = "blue";
            document.getElementById("spaceShuttleHeight").innerHTML = 10000;
        }
        rocket.style.top = `${boxHeight - rocket.offsetHeight - 10}px`;
    });

    let land = document.getElementById("landing");
    land.addEventListener("click", function() {
        window.alert("The shuttle is landing. Landing gear engaged.");
        returnToStart("The shuttle has landed.", startHeight);
    });

    let abort = document.getElementById("missionAbort");
    abort.addEventListener("click", function() {
        let confirm = window.confirm("Confirm that you want to abort the mission");

        if (confirm){
            returnToStart("Mission Aborted", startHeight);
        }
    });
    
});

function returnToStart(status, height = "", width = ""){
    document.getElementById("flightStatus").innerHTML = status;
    document.getElementById("shuttleBackground").style.backgroundColor = "green";
    document.getElementById("spaceShuttleHeight").innerHTML = 0;
    let rocket = document.getElementById("rocket");
    rocket.style.top = height;
    rocket.style.left = width;
}

function adjustLocation(location, adjustment){
    let currentLoc = location.replace('px','');
    if (currentLoc === ""){
        return adjustment;
    } else {
        currentLoc = parseInt(currentLoc, 10);
        return currentLoc + adjustment;
    }
}