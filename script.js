import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { ref, push, onValue } 
from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

let energyData = [];
let threshold = 150;
let alertCounter = 0;

window.register = function(){
 let email=document.getElementById("email").value;
 let pass=document.getElementById("password").value;
 createUserWithEmailAndPassword(auth,email,pass)
 .then(()=>alert("Registered Successfully"))
 .catch(error=>alert(error.message));
}

window.login = function(){
 let email=document.getElementById("email").value;
 let pass=document.getElementById("password").value;
 signInWithEmailAndPassword(auth,email,pass)
 .then(()=>{
   document.getElementById("loginPage").style.display="none";
   document.getElementById("appPage").style.display="block";
 })
 .catch(error=>alert(error.message));
}

window.logout = function(){
 document.getElementById("appPage").style.display="none";
 document.getElementById("loginPage").style.display="block";
}

window.showPage = function(id){
 document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
 document.getElementById(id).classList.add('active');
}

function generateEnergy(){
 let value=parseFloat((Math.random()*150+50).toFixed(2));
 push(ref(db,"energyData/"),{ value:value, timestamp:Date.now() });
}

onValue(ref(db,"energyData/"), snapshot=>{
 let data=snapshot.val();
 if(data){
  energyData=Object.values(data).map(item=>item.value);
  updateCharts();
 }
});

function updateCharts(){
 if(!energyData.length) return;
 let current=energyData[energyData.length-1];
 document.getElementById("energyValue").innerText=current+" kWh";
 let avg=energyData.reduce((a,b)=>a+b,0)/energyData.length;
 document.getElementById("avgValue").innerText=avg.toFixed(2)+" kWh";

 lineChart.data.labels=energyData.map((_,i)=>i+1);
 lineChart.data.datasets[0].data=energyData;
 lineChart.update();
}

window.exportPDF=function(){
 const { jsPDF }=window.jspdf;
 const doc=new jsPDF();
 doc.text("Eng2027 Energy Report",10,10);
 doc.save("Eng2027_Report.pdf");
}

window.saveThreshold=function(){
 threshold=document.getElementById("thresholdInput").value||150;
}

window.toggleTheme=function(){
 document.body.classList.toggle("dark");
}

let lineChart=new Chart(document.getElementById("lineChart"),{
 type:'line',
 data:{labels:[],datasets:[{label:'Energy Trend',data:[],borderColor:'#1e88e5'}]}
});

let gaugeChart=new Chart(document.getElementById("gaugeChart"),{
 type:'doughnut',
 data:{labels:["Used","Remaining"],
 datasets:[{data:[0,200],backgroundColor:["#1e88e5","#e0e0e0"]}]},
 options:{cutout:"70%",plugins:{legend:{display:false}}}
});

setInterval(generateEnergy,3000);
