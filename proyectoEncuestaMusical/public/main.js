//codigo gráfica
var canvas = document.getElementById('myChart').getContext('2d');
var data = {
    labels: ["Pop", "Rap", "Reggaeton", "Electrónica", "Blues", "Otro"],
    datasets: [
        {
            label: "Votos",
            fill: false,
            lineTension: 0.1,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(84, 241, 5, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(11, 175, 110, 0.2)',
              'rgba(243, 10, 95, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(84, 241, 5, 1)',
              'rgba(255, 206, 86, 1)',              
              'rgba(11, 175, 110, 1)',
              'rgba(243, 10, 95, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1,
            data: [0, 0, 0, 0, 0, 0],
        }
    ]
};

function adddata(id){
  try {
    if(id!=""){
    var dato= myLineChart.data.datasets[0].data[Number(id)];
    dato=dato+1;
    myLineChart.data.datasets[0].data[Number(id)]=dato;
    myLineChart.update();
   }else{
    myLineChart.data.datasets[0].data[0]=0;
    myLineChart.update();
   }
  } catch (error) {
    
  }

}

var option = {
  responsive: false, 
  maintainAspectRatio: false,
  scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true
          }
      }]
  }
};
var myLineChart = Chart.Bar(canvas,{
	data:data,
  options:option
});

//Código del servidor
var socket = io.connect('http://192.168.43.89:8088', { 'forceNew': true });

socket.on('messages', function(data) {
  console.log(data);
  render(data);
})
function render (data) {
  let id;
  data.map(function(elem, index){
    id=elem.select;
  
  }).join(" ");
  adddata(id);
  
}

function addMessage(e) {

 var objForm = document.getElementById('opciones')
  var selec;
  for (x = 0; x < objForm.musica.length; x++)
  if (objForm.musica[x].checked) {
  selec=objForm.musica[x].value;
  
  }
  message={
    select: selec
  }
 socket.emit('new-message', message);
  return false;
}





