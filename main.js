
const odometer = document.querySelector('.odometer');
odometer.style.display = "none";



let axisData = [];


function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}


const config = {
  type: "line",
  data: {
      labels: [], // x axis
      datasets: [{
        label:'',
        lineTension: 0.1,
        // borderColor: 'rgb(75, 192, 192)',
        data: [], // y axis
      }]
    },
    options: {
      plugins: {
        legend: {
            display:false
        }
    },
      scales:{
        y: {
        display: false,
        offset:false,
        ticks: {
          stepSize: 1
        },
        gridLines: {
            display: false
        }
      }
    },
    
  }  

}



const chart = new Chart("myChart", config);
const chart2 = new Chart("myChart2",config);
const chart3 = new Chart("myChart3",config);
const chart4 = new Chart("myChart4",config);
const chart5 = new Chart("myChart5",config);

let yCount = 1;
let globalRnd = 0;
let localStorageData = [];

function getStoredNumber(){
  if(!localStorage.getItem('yCount') || !localStorage.getItem('totalCrashes')){
    localStorage.setItem('yCount','1')
    localStorage.setItem('totalCrashes','1')
  }
  return parseInt(localStorage.getItem('yCount'));
}

function localStorageIncrement(){
  let current = getStoredNumber();
  const date = new Date;

  //current += randomIntFromInterval(1,7);
  
  if(date.getSeconds() > 40 && date.getSeconds() <= 47){
    current += randomIntFromInterval(1,4);
  }
  
  localStorage.setItem('yCount', current.toString());

  return current;
}

function update(){  

  let rnd = randomIntFromInterval(1,7);
  globalRnd >= 60 ? globalRnd = 0 : '';
  globalRnd += rnd;
  let now = new Date();  
  let currentTime = now.getHours() + ":" + now.getMinutes() + ":" + globalRnd;
 
  

  yCount = localStorageIncrement()
  axisData.push({
      x:currentTime,
      y:yCount
    })

  for (let i = 0; i < axisData.length; i++) {
   config.data.labels.push(axisData[i].x);
   config.data.datasets[0].data.push(axisData[i].y);
  }
  

  setInterval(() => axisData = [],1000);

  if (config.data.labels.length > 6) {
    for (let i = 5; i < config.data.labels.length; i++) {
      config.data.labels.shift();
      config.data.datasets[0].data.shift();
    }
    
  }
  
  chart.update();
  chart2.update();
  chart3.update();
  chart4.update();
  chart5.update();
}
let totalCrashesLocalStorage = localStorage.getItem('totalCrashes');
if(!totalCrashesLocalStorage){
  localStorage.setItem('totalCrashes','1')

}
let parsedTotalCrashes = JSON.parse(totalCrashesLocalStorage);

const totalCrashesObject = {
      totalCrashes: 500000,
      byHours: 20840 
}

function gmtTimeController(){
  // Get the current date and time
  const currentDateTime = new Date();

  // Calculate the GMT-5 time by subtracting 5 hours from the current date and time
  const gmtMinus5DateTime = new Date(currentDateTime.getTime() - (5 * 60 * 60 * 1000));

  // Extract individual components (hours, minutes, seconds) from the GMT-5 time
  const hours = gmtMinus5DateTime.getUTCHours();
  const minutes = gmtMinus5DateTime.getUTCMinutes();
  const seconds = gmtMinus5DateTime.getUTCSeconds();

  // Format the GMT-5 time as a string (e.g., "hh:mm:ss")
  const gmtHours = hours.toString().padStart(2, '0');
  const gmtMinutes = minutes.toString().padStart(2, '0');
  localStorage.setItem('totalCrashes',(gmtHours * 1) * totalCrashesObject.byHours);
}

gmtTimeController();

function parentRandomCall(){

 
  const randomValue = randomIntFromInterval(1,7);

  if(randomValue > 4){
    parsedTotalCrashes = parsedTotalCrashes += 27;
    localStorage.setItem('totalCrashes', parsedTotalCrashes)
  }else{
    parsedTotalCrashes = parsedTotalCrashes += 19;
    localStorage.setItem('totalCrashes', parsedTotalCrashes)
  }
  odometer.style.display = "block";
    console.log(parsedTotalCrashes);
    odometer.innerHTML = parsedTotalCrashes;

   setTimeout(parentRandomCall,randomValue * 1000);
   update();

 }

parentRandomCall();