let score=0;
let over=0;
let wicket=0;
let record=[];
let totalscore=0;
let ballcount=0;
let lastScore=0;
let team=1;
let btns=document.querySelectorAll(".btns");
 
function disableBtn(){
    for(let btn of btns){
        btn.disabled=true;
        btn.classList.add("disable");
    }
} 

function displayOnOver(){
    document.querySelector("#display").innerHTML=`Team ${team} score ${totalscore} run:${wicket} wicket`;

    let maindiv=document.querySelector("#overRun");
    for(let i=0;i<record.length;i++){
       let temp=document.createElement('h3');
       temp.classList.add("allOver");
       temp.innerHTML=`Team 1:Over ${i+1}: ${record[i]} runs`;
       maindiv.appendChild(temp);
    } 
}

function removeDisplay(){
     document.querySelector("#display").innerHTML="";

    let  allOvers=document.querySelectorAll(".allOver");
    for(let temp of allOvers){
        temp.remove();
    } 
    let balls=document.querySelectorAll(".ball");
    for(let temp of balls){
        temp.remove();
    }
    document.querySelector("#heading").innerHTML=`team ${team} is playing..`;
}

function newOver(){
    over++;
    record.push(score);

    let overBtn=document.createElement("button");
    overBtn.innerText="New Over";
    overBtn.classList.add("box");
    document.querySelector("#box").appendChild(overBtn);
    disableBtn();
    displayOnOver();

    overBtn.addEventListener("click",()=>{
        for(let btn of btns){
              btn.disabled=false;
              btn.classList.remove("disable");
        }
        overBtn.remove();
        removeDisplay();
    });
    ballcount=0;
    score=0;
}
function restart(){
    score=0;
    totalscore=0;
    over=0;
    wicket=0;
    ballcount=0;
    team=1;
    lastScore=0;
    let startBtn=document.createElement("button");
    startBtn.innerText="Restart";
    startBtn.classList.add("box");
    document.querySelector("#box").appendChild(startBtn);

    startBtn.addEventListener("click",()=>{
        for(let btn of btns){
              btn.disabled=false;
              btn.classList.remove("disable");
        }
        document.querySelector("#heading").innerHTML=`team ${team} is playing..`;
        document.querySelector(".curResult").innerHTML=`Team ${team} <br>Current Score ${totalscore} run and ${wicket} wicket`;
        document.querySelector("#team1score").innerHTML="";
        startBtn.remove();
    }); 
    
}
function startAgain(){
   if(team==1){
      document.querySelector("#team1score").innerHTML=`Team 1 score:${totalscore}`;
   }
   team=2;
   lastScore=totalscore;
   score=0;
   totalscore=0;
   over=0;
   wicket=0;
   ballcount=0;
  
   while(record.length!=0)
        record.pop();
    removeDisplay();
    document.querySelector("#heading").innerHTML='Team 2 Start Their Game';

  }

  function winner(){
    disableBtn();
    removeDisplay();
     if(totalscore!=lastScore){
        if(totalscore<lastScore)
              team=1;
        document.querySelector("#heading").innerHTML=`Team ${team} Wins with ${totalscore-lastScore} Runs   `;

      }
      else
        document.querySelector("#heading").innerHTML=`Match Draw`;
      restart();

   }

for(let btn of btns){
   btn.addEventListener("click",(event)=>{
    let temp=event.target.value;
    if(temp>='1'&&temp<='6'){
       score+=parseInt(temp);
       totalscore+=parseInt(temp);
       ballcount++;
    }
    if(temp=='nb'||temp=='w')
         score++;
    if(temp=='wt'||temp=='d')
         ballcount++;
    if(temp=='wt')
        wicket++;
    let ball=document.createElement("div");
    ball.classList.add('ball');
    ball.innerHTML=temp;
    document.querySelector("#ball").appendChild(ball);
    document.querySelector("#heading").innerHTML="";
    document.querySelector(".curResult").innerHTML=`Team ${team} <br>Current Score ${totalscore} run and ${wicket} wicket`;
   
    if(team==1&&(wicket==10||over==20))
        startAgain();

    if(ballcount==6){
        newOver();
    }
    if(team==2){
         if(over==20||lastScore<totalscore||wicket==10)
             winner();
    }
        
});
}
