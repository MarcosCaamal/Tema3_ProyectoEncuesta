//codigo gráfica
var canvas = document.getElementById('myChart').getContext('2d');
var data = {
    labels: ["Pop", "Rap", "Reggaeton", "Otro"],
    datasets: [
        {
            label: "Votos",
            fill: false,
            lineTension: 0.1,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',

            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                
            ],
            borderWidth: 1,
            data: [0, 0, 0, 0],
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
   
    responsive: true, 
    maintainAspectRatio: false,
  
};
var myLineChart = Chart.Bar(canvas,{
	data:data,
  options:option
});

//Código del servidor
var socket = io.connect('http://localhost:8088', { 'forceNew': true });

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
  for (x = 0; x < objForm.deporte.length; x++)
  if (objForm.deporte[x].checked) {
  selec=objForm.deporte[x].value;
  
  }
  message={
    select: selec
  }
 socket.emit('new-message', message);
  return false;
}





