let startTime;
let running = false;
let interval;
let savedTime = 0

if (localStorage.getItem("savedTime")){
  savedTime = parseInt(localStorage.getItem("savedTime"));
  displaySavedTime();
}


const startButton = document.getElementById("start")
//startButton.addEventListener("click", start);
const counter = document.getElementById("counter")

function updateDisplay(){ 
      const currentTime = Date.now();
      const elapsedTime = new Date(currentTime - startTime);
      const hours = elapsedTime.getUTCHours();
      const minutes = elapsedTime.getUTCMinutes();
      const seconds = elapsedTime.getUTCSeconds();
      const milliseconds = Math.floor(elapsedTime.getUTCMilliseconds() / 10);

      function padNumber(number){
        return number.toString().padStart(2, "0");
       }

   counter.textContent = `${hours} :${padNumber(minutes)} : ${padNumber(seconds)} . ${padNumber(milliseconds)}`;

}

function start() {
if(!running){
startTime= Date.now() - (interval || 0) - savedTime;
interval = setInterval(updateDisplay, 10);
running = true;
} 
}

function stop(){
  if(running){
    clearInterval(interval);
    savedTime += Date.now() - startTime; 
    running = false;
    localStorage.setItem("savedTime", savedTime.toString());
  }
}
 function reset(){
  stop();
  savedTime = 0;
  localStorage.removeItem("savedTime")
  counter.textContent= "00 : 00"
 }

 function displaySavedTime() {
  const hours = Math.floor(savedTime / 3600000);
  const minutes = Math.floor((savedTime % 3600000) / 60000);
  const seconds = Math.floor((savedTime % 60000) / 1000);
  const milliseconds = savedTime % 1000;

  counter.textContent = `${hours} : ${padNumber(minutes)} : ${padNumber(seconds)} . ${padNumber(milliseconds)}`;
}