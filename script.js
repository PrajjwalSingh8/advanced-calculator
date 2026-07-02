const screen = document.getElementById("screen");
const historyDisplay = document.getElementById("history");
const themeBtn = document.getElementById("themeBtn");

const buttons = document.querySelectorAll(".buttons button");
const sciButtons = document.querySelectorAll(".scientific button");

let expression = "";

let history =
JSON.parse(localStorage.getItem("calcHistory")) || [];

function updateScreen(){

screen.value = expression || "0";

}

function saveHistory(item){

history.unshift(item);

if(history.length>10){

history.pop();

}

localStorage.setItem(
"calcHistory",
JSON.stringify(history)
);

historyDisplay.textContent = history[0] || "";

}

historyDisplay.textContent = history[0] || "";

function calculate(){

try{

let exp = expression

.replace(/×/g,"*")

.replace(/÷/g,"/")

.replace(/−/g,"-")

.replace(/π/g,Math.PI)

.replace(/e/g,Math.E);

let result = eval(exp);

saveHistory(expression + " = " + result);

expression = result.toString();

updateScreen();

}

catch{

screen.value = "Error";

expression = "";

}

}

buttons.forEach(btn=>{

btn.onclick=()=>{

let value = btn.innerText;

switch(value){

case "AC":

expression="";

updateScreen();

break;

case "⌫":

expression=expression.slice(0,-1);

updateScreen();

break;

case "=":

calculate();

break;

case "±":

if(expression.startsWith("-")){

expression=expression.substring(1);

}

else{

expression="-"+expression;

}

updateScreen();

break;

default:

expression+=value;

updateScreen();

}

}

});
 // ==========================
// SCIENTIFIC BUTTONS
// ==========================

sciButtons.forEach(btn => {

btn.onclick = () => {

const value = btn.innerText;

switch(value){

case "√":

try{

expression = Math.sqrt(eval(expression)).toString();

updateScreen();

}catch{

screen.value="Error";

expression="";

}

break;

case "x²":

try{

expression = Math.pow(eval(expression),2).toString();

updateScreen();

}catch{

screen.value="Error";

expression="";

}

break;

case "xʸ":

expression += "**";

updateScreen();

break;

case "(":

expression+="(";

updateScreen();

break;

case ")":

expression+=")";

updateScreen();

break;

case "π":

expression+="π";

updateScreen();

break;

case "e":

expression+="e";

updateScreen();

break;

case "Copy":

navigator.clipboard.writeText(screen.value);

alert("Result Copied ✅");

break;

}

}

});

// ==========================
// THEME TOGGLE
// ==========================

themeBtn.onclick = ()=>{

document.body.classList.toggle("light");

if(document.body.classList.contains("light")){

themeBtn.innerHTML="☀️";

}

else{

themeBtn.innerHTML="🌙";

}

localStorage.setItem(

"theme",

document.body.classList.contains("light")

);

}

if(localStorage.getItem("theme")=="true"){

document.body.classList.add("light");

themeBtn.innerHTML="☀️";

}
 // ======================================
// KEYBOARD SUPPORT
// ======================================

document.addEventListener("keydown",(e)=>{

const key=e.key;

if(!isNaN(key)){
expression+=key;
updateScreen();
return;
}

switch(key){

case "+":
case "-":
case "*":
case "/":
case ".":
case "%":

expression+=key;

updateScreen();

break;

case "Enter":

e.preventDefault();

calculate();

break;

case "Backspace":

expression=expression.slice(0,-1);

updateScreen();

break;

case "Delete":

expression="";

updateScreen();

break;

case "(":
case ")":

expression+=key;

updateScreen();

break;

}

});

// ======================================
// DIVIDE BY ZERO CHECK
// ======================================

const oldCalculate=calculate;

calculate=function(){

try{

let exp=expression
.replace(/×/g,"*")
.replace(/÷/g,"/")
.replace(/−/g,"-")
.replace(/π/g,Math.PI)
.replace(/e/g,Math.E);

let result=eval(exp);

if(result===Infinity || result===-Infinity){

throw "Math Error";

}

if(isNaN(result)){

throw "Math Error";

}

saveHistory(expression+" = "+result);

expression=result.toString();

updateScreen();

}catch{

screen.value="Math Error";

expression="";

}

}

// ======================================
// BUTTON RIPPLE EFFECT
// ======================================

document.querySelectorAll("button").forEach(btn=>{

btn.addEventListener("click",()=>{

btn.style.transform="scale(.92)";

setTimeout(()=>{

btn.style.transform="scale(1)";

},120);

});

});

// ======================================
// AUTO FOCUS EFFECT
// ======================================

window.onload=()=>{

updateScreen();

screen.scrollLeft=screen.scrollWidth;

}

// ======================================
// HISTORY CLEAR (Double Click)
// ======================================

historyDisplay.ondblclick=()=>{

history=[];

localStorage.removeItem("calcHistory");

historyDisplay.innerHTML="History Cleared";

setTimeout(()=>{

historyDisplay.innerHTML="";

},1500);

}

// ======================================
// COPY SUCCESS EFFECT
// ======================================

function copyResult(){

navigator.clipboard.writeText(screen.value);

let old=historyDisplay.innerHTML;

historyDisplay.innerHTML="Copied Successfully ✅";

setTimeout(()=>{

historyDisplay.innerHTML=old;

},1500);

}

// ======================================
// COPY BUTTON
// ======================================

document.querySelectorAll(".scientific button").forEach(btn=>{

if(btn.innerText==="Copy"){

btn.onclick=copyResult;

}

});

// ======================================
// START
// ======================================

updateScreen();
// =============================
// LIVE DATE & TIME
// =============================

const currentDate=document.getElementById("currentDate");

const currentTime=document.getElementById("currentTime");

function updateDateTime(){

const now=new Date();

currentDate.innerHTML=now.toLocaleDateString(
'en-IN',
{
weekday:'short',
day:'2-digit',
month:'short',
year:'numeric'
}
);

currentTime.innerHTML=now.toLocaleTimeString(
'en-IN',
{
hour:'2-digit',
minute:'2-digit',
second:'2-digit'
}
);

}

updateDateTime();

setInterval(updateDateTime,1000);
// ======================
// HISTORY SIDEBAR
// ======================

const historyList =
document.getElementById("historyList");

const clearHistory =
document.getElementById("clearHistory");

function renderHistory(){

historyList.innerHTML="";

history.forEach(item=>{

const li=document.createElement("li");

li.innerText=item;

li.onclick=()=>{

expression=item.split("=")[0].trim();

updateScreen();

};

historyList.appendChild(li);

});

}

renderHistory();

function saveHistory(item){

history.unshift(item);

if(history.length>20){

history.pop();

}

localStorage.setItem(

"calcHistory",

JSON.stringify(history)

);

renderHistory();

}

clearHistory.onclick=()=>{

history=[];

localStorage.removeItem("calcHistory");

renderHistory();

historyDisplay.innerHTML="History Cleared";

setTimeout(()=>{

historyDisplay.innerHTML="";

},1500);

};
// ==========================
// MEMORY FUNCTIONS
// ==========================

let memory = Number(localStorage.getItem("memory")) || 0;

document.getElementById("mc").onclick = () => {

memory = 0;

localStorage.setItem("memory", memory);

historyDisplay.innerHTML = "Memory Cleared";

};

document.getElementById("mr").onclick = () => {

expression = memory.toString();

updateScreen();

};

document.getElementById("mplus").onclick = () => {

memory += Number(screen.value || 0);

localStorage.setItem("memory", memory);

historyDisplay.innerHTML = "Saved to Memory";

};

document.getElementById("mminus").onclick = () => {

memory -= Number(screen.value || 0);

localStorage.setItem("memory", memory);

historyDisplay.innerHTML = "Subtracted from Memory";

};
// ======================
// THEME COLOR SWITCHER
// ======================

const themeButtons =
document.querySelectorAll(".theme-btn");

themeButtons.forEach(btn=>{

btn.onclick=()=>{

const color=btn.dataset.theme;

switch(color){

case "blue":

document.body.style.background=
"linear-gradient(135deg,#0f172a,#1e3a8a)";

break;

case "purple":

document.body.style.background=
"linear-gradient(135deg,#3b0764,#7e22ce)";

break;

case "green":

document.body.style.background=
"linear-gradient(135deg,#052e16,#16a34a)";

break;

}

localStorage.setItem(
"themeColor",
color
);

};

});

const savedColor=
localStorage.getItem("themeColor");

if(savedColor){

document.querySelector(
`[data-theme="${savedColor}"]`
)?.click();

}
// ===================================
// EXPORT HISTORY (.txt)
// ===================================

const exportBtn =
document.getElementById("exportHistory");

exportBtn.onclick = () => {

if(history.length===0){

alert("No History Available!");

return;

}

const content =

"ADVANCED CALCULATOR HISTORY\n\n"

+ history.join("\n");

const blob = new Blob(
[content],
{type:"text/plain"}
);

const link =
document.createElement("a");

link.href =
URL.createObjectURL(blob);

link.download =
"Calculator_History.txt";

link.click();

URL.revokeObjectURL(link.href);

historyDisplay.innerHTML =
"History Exported ✅";

setTimeout(()=>{

historyDisplay.innerHTML =
history[0] || "";

},2000);

}
// ==========================
// PREMIUM LOADING SCREEN
// ==========================

window.addEventListener("load",()=>{

setTimeout(()=>{

document
.getElementById("loader")
.classList.add("loader-hide");

},1800);

});