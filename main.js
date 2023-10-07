
const odometer = document.querySelector('.crashesTotal');
odometer.style.display = "none";

const odometer2 = document.querySelector('.fatalities');
odometer2.style.display = "none";


const odometer3 = document.querySelector('.injuries');
odometer3.style.display = "none";

const odometer4 = document.querySelector('.a1');
odometer4.style.display = "none";

const odometer5 = document.querySelector('.a2');
odometer5.style.display = "none";



let axisData = [];
let axisData2 = [];
let axisData3 = [];


function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const config2 = {
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
const config3 = {
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



const chart = new Chart("myChart", config2);
const chart2 = new Chart("myChart2",config3);
const chart3 = new Chart("myChart3",config);
const chart4 = new Chart("myChart4",config);
const chart5 = new Chart("myChart5",config);

let globalRnd = 0;
let localStorageData = [];

function update(){  

  let rnd = randomIntFromInterval(1,7);
  globalRnd >= 60 ? globalRnd = 0 : '';
  globalRnd += rnd;
  let now = new Date();  
  let currentTime = now.getHours() + ":" + now.getMinutes() + ":" + globalRnd;

  
  let totalCrashesLocalStorage = localStorage.getItem('totalCrashes');
  let parsedTotalCrashes = JSON.parse(totalCrashesLocalStorage);

  let fatalitiesLocalStorage = localStorage.getItem('fatalities');
  let parsedFatalities = JSON.parse(fatalitiesLocalStorage);

  let injuriesLocalStorage = localStorage.getItem('injuries');
  let parsedInjuries = JSON.parse(injuriesLocalStorage);


  axisData.push({
      x:currentTime,
      y:parsedTotalCrashes
    })
  axisData2.push({
      x:currentTime,
      y:parsedFatalities
    })
    axisData3.push({
      x:currentTime,
      y:parsedInjuries
    })
    

  for (let i = 0; i < axisData.length; i++) {
   config.data.labels.push(axisData[i].x);
   config.data.datasets[0].data.push(axisData[i].y);
   config2.data.labels.push(axisData2[i].x);
   config2.data.datasets[0].data.push(axisData2[i].y);
   config3.data.labels.push(axisData3[i].x);
   config3.data.datasets[0].data.push(axisData3[i].y);
   
   
  }


  setInterval(() => {
    axisData = [];
    axisData2 = [];
  },1000);

  if (config.data.labels.length > 6) {
    for (let i = 5; i < config.data.labels.length; i++) {
      config.data.labels.shift();
      config.data.datasets[0].data.shift();
      config2.data.labels.shift();
      config2.data.datasets[0].data.shift();
      config3.data.labels.shift();
      config3.data.datasets[0].data.shift();
      
    }
    
  }
  
  chart.update();
  chart2.update();
  chart3.update();
  chart4.update();
  chart5.update();
}


const totalCrashesObject = {
      totalCrashes: 500000,
      byHours: 20840 
}

function gmtTimeController(){
  

  const date = new Date();
  let totalCrashesLocalStorage = localStorage.getItem('totalCrashes');
  let parsedTotalCrashes = JSON.parse(totalCrashesLocalStorage);

  let gmtHours = date.getHours(); 

  gmtHours -=3;
  
  if(gmtHours == 0){
    gmtHours = 0;
  }
  let gmtHours2 = date.getHours();  
  if(gmtHours2 == 0){
     gmtHours = 21;
  }else if(gmtHours2 == 1){
    gmtHours = 22;
  }else if(gmtHours2 == 2){
    gmtHours = 23;
    fatalities = 5;
  }else if(gmtHours2 == 3){
    gmtHours = 24;
  }

  if(gmtHours2 >=3 && gmtHours2 <= 9){
    localStorage.setItem('fatalities',1);
  }
  
  if(gmtHours >= 9 && gmtHours <= 15){
    localStorage.setItem('fatalities',2);
  }

  if(gmtHours >= 15 && gmtHours <= 21){
    localStorage.setItem('fatalities',3);
  }
  
  if(gmtHours <= 27 && gmtHours >= 21){
    localStorage.setItem('fatalities',4);
  }

  console.log(parsedTotalCrashes);
  let reminder = localStorage.getItem('reminder');
  let parsedReminder = JSON.parse(reminder);


  localStorage.setItem('totalCrashes',((gmtHours * 1) * totalCrashesObject.byHours + parsedReminder));
}

gmtTimeController();
let y = 0;

function parentRandomCall(){
  let totalCrashesLocalStorage = localStorage.getItem('totalCrashes');
  let parsedTotalCrashes = JSON.parse(totalCrashesLocalStorage);

  let fatalitiesLocalStorage = localStorage.getItem('fatalities');
  let parsedFatalities = JSON.parse(fatalitiesLocalStorage);
 
  let injuriesLocalStorage = localStorage.getItem('injuries');
  let parsedInjuries = JSON.parse(injuriesLocalStorage);

   if(!localStorage.getItem('reminder')){
      localStorage.setItem('reminder',1)
    }
    
    const reminder = localStorage.getItem('reminder');
    let parsedReminder = JSON.parse(reminder);

   
  const randomValue = randomIntFromInterval(1,7);

  if(randomValue > 4){
    parsedTotalCrashes = parsedTotalCrashes += 26;
    parsedReminder+= 26;
    localStorage.setItem('totalCrashes', parsedTotalCrashes);
    localStorage.setItem('reminder', parsedReminder)
   
  }else{
    parsedTotalCrashes = parsedTotalCrashes += 18;
    localStorage.setItem('totalCrashes', parsedTotalCrashes)
    parsedReminder+= 18;
    localStorage.setItem('reminder', parsedReminder)
  }

  const injuriesCount = () =>{
    let injuriesLocalStorage = localStorage.getItem('injuries');
    if(!injuriesLocalStorage){
      localStorage.setItem('injuries',0);
    }
    let parsedInjuries = JSON.parse(injuriesLocalStorage);

    const date = new Date();

    let gmtHours2 = date.getHours();  
    let gmtHours = date.getHours(); 
    let refreshTime = gmtHours - 3;
    const min = date.getMinutes();
 
    if(gmtHours2 == 0){
       refreshTime = 21;
    }else if(gmtHours2 == 1){
      refreshTime = 22;
    }else if(gmtHours2 == 2){
      refreshTime = 23;
       
    }else if(gmtHours2 == 3){
      refreshTime = 24;
    }


    if(min >= 1 && min <=10){
      localStorage.setItem('injuries',1 +  (refreshTime*6))
    }else if(min >= 11 && min <= 20){
      localStorage.setItem('injuries',2+  (refreshTime*6))
    }else if(min >= 21 && min <= 30){
      localStorage.setItem('injuries',3+  (refreshTime*6))
    }else if(min >= 31 && min <= 40){
      localStorage.setItem('injuries',4+  (refreshTime*6))
    }else if(min >= 41 && min <= 50){
      localStorage.setItem('injuries',5 +  (refreshTime*6))
    }
    else if(min >= 51 && min <= 60){
      localStorage.setItem('injuries',6+  (refreshTime*6))
    }



  }
  injuriesCount();

  odometer.style.display = "block";
  odometer.innerHTML = parsedTotalCrashes;

  odometer2.style.display = "block";
  odometer2.innerHTML = parsedFatalities;

  odometer3.style.display = "block";
  odometer3.innerHTML = parsedInjuries;

  setTimeout(parentRandomCall,randomValue * 1000);
  update();

 }

parentRandomCall();