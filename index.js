/*--------------------------------------------------------ELEMENTS SELECTORS------------------------------------------------------------------------------------ */

const box = document.getElementById("mainbox");
const gameTime = document.getElementById("totaltime");
const dots = document.querySelectorAll(".dots");
const redPlayerTime = document.getElementById("redplayertime");
const bluePlayerTime = document.getElementById("blueplayertime");
const turn = document.getElementById("turn");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");
const rp = document.getElementById("redpts");
const bp = document.getElementById("bluepts");
const pausename = document.getElementById("pausename");
const leaderboard = document.getElementById("leaderboard");
const moveaud = new Audio("audio/move.mp3");
const elimaud = new Audio("audio/titanelim.mp3");


/*--------------------------------------------------------------CONSTANTS-----------------------------------------------------------------------------------------------*/


let redTimer=15;
let blueTimer=15;
let totalTime = 600;
let count = 0;
let playtime;
let redpts=0;
let bluepts=0;
rp.textContent = `${redpts}`;
bp.textContent = `${bluepts}`;

const edgeNums = [
    {id:2,row:3,column:3,justify:'center',align:'center'},
    {id:1,row:2,column:8,justify:'center',align:'normal'},
    {id:2,row:3,column:13,justify:'center',align:'slef-end'},
    {id:3,row:7,column:13,justify:'normal',align:'normal'},
    {id:2,row:8,column:8,justify:'center',align:'self-end'},
    {id:2,row:7,column:3,justify:'center',align:'normal'},
    {id:6,row:4,column:4,justify:'end',align:'normal'},
    {id:6,row:3,column:8,justify:'center',align:'normal'},
    {id:5,row:4,column:12,justify:'normal',align:'center'},
    {id:6,row:6,column:11,justify:'end',align:'self-end'},
    {id:4,row:7,column:8,justify:'center',align:'self-end'},
    {id:6,row:6,column:4,justify:'end',align:'self-end'},
    {id:7,row:5,column:7,justify:'normal',align:'normal'},
    {id:9,row:4,column:8,justify:'center',align:'self-end'},
    {id:7,row:5,column:9,justify:'end',align:'normal'},
    {id:7,row:5,column:9,justify:'end',align:'self-end'},
    {id:9,row:6,column:8,justify:'center',align:'normal'},
    {id:8,row:5,column:7,justify:'normal',align:'self-end'},
    {id:1,row:5,column:3,justify:'center',align:'normal'},
    {id:1,row:3,column:11,justify:'normal',align:'normal'},
    {id:1,row:7,column:11,justify:'normal',align:'self-end'},
    {id:1,row:4,column:6,justify:'center',align:'normal'},
    {id:1,row:5,column:11,justify:'center',align:'normal'},
    {id:1,row:6,column:6,justify:'center',align:'self-end'},
]
const edgeLines = [
    {id:1,row:5,column:'2/8',origin:'left',rotate:-53,translate:0},
    {id:2,row:2,column:'5/12',origin:'right',rotate:0,translate:0},
    {id:3,row:5,column:'9/15',origin:'right',rotate:54,translate:10},
    {id:4,row:8,column:'5/11',origin:'right',rotate:125,translate:-10},
    {id:5,row:8,column:'5/12',origin:'left',rotate:0,translate:0},
    {id:6,row:8,column:'5/10',origin:'left',rotate:-123,translate:10},
    {id:7,row:5,column:'4/8',origin:'left',rotate:-53,translate:5},
    {id:8,row:3,column:'6/11',origin:'right',rotate:0,translate:0},
    {id:9,row:5,column:'9/13',origin:'right',rotate:55,translate:15},
    {id:10,row:7,column:'10/14',origin:'left',rotate:-55,translate:15},
    {id:11,row:7,column:'6/11',origin:'left',rotate:0,translate:0},
    {id:12,row:7,column:'6/10',origin:'left',rotate:-125,translate:10},
    {id:13,row:5,column:'6/8',origin:'left',rotate:-55,translate:10},
    {id:14,row:4,column:'7/10',origin:'left',rotate:0,translate:0},
    {id:15,row:5,column:'9/11',origin:'right',rotate:53,translate:10},
    {id:16,row:6,column:'9/11',origin:'left',rotate:-53,translate:15},
    {id:17,row:6,column:'7/10',origin:'left',rotate:0,translate:0},
    {id:18,row:5,column:'6/8',origin:'left',rotate:55,translate:-10},
    {id:19,row:5,column:'2/5',origin:'left',rotate:0,translate:0},
    {id:20,row:3,column:'10/12',origin:'left',rotate:-52,translate:10},
    {id:21,row:8,column:'11/13',origin:'left',rotate:-125,translate:10},
    {id:22,row:4,column:'7/9',origin:'left',rotate:-125,translate:15},
    {id:23,row:5,column:'10/13',origin:'left',rotate:0,translate:0},
    {id:24,row:7,column:'6/8',origin:'left',rotate:-55,translate:15},
]
const connectingEdges = [[2,6,7],[1,3],[2,4,9],[3,5],[4,6,11],[1,5],[1,8,12],[7,9,14],[3,8,10],[9,11,16],[5,10,12],[7,11,18],[14,18],[8,13,15],[14,16],[10,15,17],[16,18],[12,13,17]];
const points = [2,1,2,3,2,2,6,6,5,6,4,6,7,9,7,7,9,8,1,1,1,1,1,1];
const edges = [[1,2],[2,3],[3,4],[4,5],[5,6],[6,1],[7,8],[8,9],[9,10],[10,11],[11,12],[12,7],[13,14],[14,15],[15,16],[16,17],[17,18],[18,13],[1,7],[3,9],[5,11],[8,14],[10,16],[12,18]];


/*--------------------------------------------------------------FUNCTIONS------------------------------------------------------------------------------------------------*/


edgeNums.forEach(({id,row,column,justify,align}) =>{
    let numDivs = document.createElement("div");
    numDivs.textContent= `${id}`
    numDivs.classList= `number`;
    numDivs.style.gridRow = `${row}`;
    numDivs.style.gridColumn = `${column}`;
    numDivs.style.justifySelf = `${justify}`;
    numDivs.style.alignSelf = `${align}`;
    numDivs.style.color = 'aliceblue';
    box.append(numDivs);
});
edgeLines.forEach(({row,column,origin,rotate,translate})=>{
    let edgeDivs = document.createElement("div");
    edgeDivs.style.height = '2px';
    edgeDivs.style.alignSelf = 'center';
    edgeDivs.style.zIndex = '1';
    edgeDivs.style.backgroundColor = 'aliceblue';
    edgeDivs.style.gridRow = `${row}`;
    edgeDivs.style.gridColumn = `${column}`;
    edgeDivs.style.transformOrigin = `${origin}`;
    edgeDivs.style.transform = `rotate(${rotate}deg) translateY(${translate}px)`;
    box.append(edgeDivs);
})

let totalTimeCounter = setInterval(()=>{
    if(totalTime==0){
        clearInterval(totalTimeCounter);
        gameOver();
    }
    gameTime.innerHTML=`${totalTime}`;
    totalTime-=1;
},1000);

reset.addEventListener("click", resets);
pause.addEventListener("click",paused);
leaderboard.addEventListener("click",rank);

dots.forEach((dot)=>{
    dot.addEventListener("click",titanMovement)
})

function playerTimeCounter(){
    if(count%2==0){
        playtime = setInterval(()=>{
            if(redTimer ==0){ 
                randomMove();
                clearInterval(playtime);
                resetTimerRed();
            }
            redPlayerTime.textContent=`${redTimer}`;
            redTimer--;;
        },1000);
    }
    else{
        playtime = setInterval(()=>{
            if(blueTimer ==0){ 
                randomMove();
                clearInterval(playtime);
                resetTimerBlue();
            }
            bluePlayerTime.textContent=`${blueTimer}`;
            blueTimer--;
        },1000);
    }
}

function resetTimerRed(){
    redTimer = 15;
    blueTimer = 15;
    redPlayerTime.textContent=`${redTimer}`;
    clearInterval(playtime);
    playerTimeCounter();
}

function resetTimerBlue(){
    redTimer = 15;
    blueTimer = 15;
    bluePlayerTime.textContent=`${blueTimer}`;
    clearInterval(playtime);
    playerTimeCounter();
}

function changeTurn(){
    if(count % 2 ==0){
        turn.textContent = `Red`;
        turn.style.color = 'red';
    }
    else{
        turn.textContent = `Blue`;
        turn.style.color = 'rgb(24, 166, 255)';
    }
}

function randomMove(){
    let dotOk4 = false;
    if(count<6){
        if(count %2 == 0 ){
            for(let j=1;j<=6;j++){
                for(let nodes2 of dots){
                    if(nodes2.classList.contains(`${j}`) && !nodes2.classList.contains("red") && !nodes2.classList.contains("blue")){
                        nodes2.classList.add("red");
                        count++;
                        changeTurn();
                        dotOk4 = true;
                        break;
                    }
                }
                if(dotOk4){
                    break;
                }
            }
        }
        else{
            for(let j=1;j<=6;j++){
                for(let nodes1 of dots){
                    if(nodes1.classList.contains(`${j}`) && !nodes1.classList.contains("blue") && !nodes1.classList.contains("red")){
                        nodes1.classList.add("blue");
                        count++;
                        changeTurn();
                        dotOk4 = true;
                        break;
                    }
                }
                if(dotOk4){
                    break;
                }
                    
            }
        }
    }
    else if ( count>=6 && count<8){
        if(count %2 == 0){
            for(let j=7;j<=8;j++){
                for(let nodes2 of dots){
                    if(nodes2.classList.contains(`${j}`) && !nodes2.classList.contains("red") && !nodes2.classList.contains("blue")){
                        nodes2.classList.add("red");
                        count++;
                        changeTurn();
                        dotOk4 = true;
                        break;
                    }
                }
                if(dotOk4){
                    break;
                }
            }
        }
        else{
            for(let j=7;j<=8;j++){
                for(let nodes1 of dots){
                    if(nodes1.classList.contains(`${j}`) && !nodes1.classList.contains("blue") && !nodes1.classList.contains("red")){
                        nodes1.classList.add("blue");
                        count++;
                        changeTurn();
                        dotOk4 = true;
                        break;
                    }
                }
                if(dotOk4){
                    break;
                }
                    
            }

        }
    }
    else{
        count++;
        changeTurn();
    }
  
}

function titanMovement(dot){
    let dotOk1 = false;
    let dotOk2 = false;
    if (count<6){
        for(let i=1 ;i<=6;i++){
            if(dot.target.classList.contains(`${i}`)){
                dotOk1 = true;
                break;    
            }}
        if(dotOk1 && !dot.target.classList.contains("red") && !dot.target.classList.contains("blue")){
            count++;
            moveaud.play();
            changeTurn();
            if(count % 2 !=0){
                resetTimerRed();
                dot.target.classList.add('red');
            }
            else if (count%2 ==0){
                resetTimerBlue();
                dot.target.classList.add('blue');
            }
        }
    }
        
    if(count>=6 && count<8){
        for(let i=7 ;i<=12;i++){
            if(dot.target.classList.contains(`${i}`)){
                dotOk2 = true;
                break;    
            }}
        if(dotOk2 && !dot.target.classList.contains("red") && !dot.target.classList.contains("blue")){
            count++;
            moveaud.play();
            changeTurn();
            if(count % 2 !=0){
                resetTimerRed();
                dot.target.classList.add('red');
            }
            else{
                resetTimerBlue();
                dot.target.classList.add('blue');
            }
        }
            
    }
    if(count>=8){
        let dotnum = Number(dot.target.classList[2]);
        for(let nums of connectingEdges[dotnum-1]){
            let stringNums = String(nums);
            let dotOk3 = false;
            for(let node of dots){
                if(count % 2 ==0 && node.classList.contains(`${stringNums}`) && node.classList.contains("red") && !dot.target.classList.contains("blue")){
                    count++;
                    moveaud.play();
                    changeTurn();
                    resetTimerRed();          
                    node.classList.remove("red");
                    dot.target.classList.add("red");
                    dotOk3 = true;
                    break;
                }
                else if(count % 2 !=0 && node.classList.contains(String(nums)) && node.classList.contains("blue") && !dot.target.classList.contains("red")){
                    count++;
                    moveaud.play();
                    changeTurn();
                    resetTimerBlue();
                    node.classList.remove("blue");
                    dot.target.classList.add('blue');
                    dotOk3 = true;
                    break;
                }
            }
            if(dotOk3){
                break;
            }
        }
        checkForTitanElimination();
    }
    updatePoints();
    checkForGameOver();
}

function gameOver(){
    document.body.innerHTML = '';
    let gameEndMsg = document.createElement("div");
    gameEndMsg.textContent = "Game Over!";
    gameEndMsg.style.fontSize = "50px";
    gameEndMsg.style.fontWeight = "900";
    gameEndMsg.style.marginTop = "80px";
    gameEndMsg.style.color = "aliceblue";
    gameEndMsg.style.textAlign = "center";
    document.body.append(gameEndMsg);

    let points = document.createElement("div");
    points.textContent = "Points";
    points.style.fontSize = "30px";
    points.style.fontWeight = "600";
    points.style.marginTop = "50px";
    points.style.color = "aliceblue";
    points.style.textAlign = "center";
    document.body.append(points);

    let redpoints = document.createElement("div");
    redpoints.textContent = `Red : ${redpts}`;
    redpoints.style.fontSize = "30px";
    redpoints.style.color = "red";
    redpoints.style.fontWeight = "600";
    redpoints.style.marginTop = "30px";
    redpoints.style.textAlign = "center";
    document.body.append(redpoints);

    let bluepoints = document.createElement("div");
    bluepoints.textContent = `Blue : ${bluepts}`;
    bluepoints.style.fontSize = "30px";
    bluepoints.style.color = "rgb(24, 166, 255)";
    bluepoints.style.fontWeight = "600";
    bluepoints.style.marginTop = "30px";
    bluepoints.style.textAlign = "center";
    document.body.append(bluepoints);
    
    let winner = document.createElement("div");
    winner.style.fontSize = "30px";
    winner.style.fontWeight = "600";
    winner.style.marginTop = "50px";
    winner.style.color = "aliceblue";
    winner.style.textAlign = "center";
    if(redpts>bluepts){
        winner.textContent = `Red Wins!!`;
        winner.style.color = "red";
        document.body.append(winner);
        leaderboards(redpts);
    }
    else if(redpts == bluepts){
        winner.textContent = "Game Draw!"
        winner.style.color = 'aliceblue';
        document.body.append(winner);
        leaderboards(redpts);
    }
    else{
        winner.textContent = `Blue Wins!!`;
        winner.style.color = "rgb(24, 166, 255)";
        document.body.append(winner);
        leaderboards(bluepts);
    }

}

function checkForTitanElimination(){
    let elimination;
    let elim;
    for(let dot of dots){
        elimination = false;
        if(dot.classList.contains("red") && (dot.classList[2]>6)){
            for(elim of connectingEdges[Number(dot.classList[2])-1]){
                for(let node of dots){
                    if(node.classList.contains("blue") && node.classList.contains(`${elim}`)){
                        elimination = true;
                        break;
                    }
                    else{
                        elimination = false;
                    }
                }
                if(!elimination){
                    break;
                }
            }
            if(elimination){
                elimaud.play();
                dot.classList.remove("red");
                break;
            }
        }
        else if(dot.classList.contains("blue") && (dot.classList[2]>6)){
            for(elim of connectingEdges[Number(dot.classList[2])-1]){
                for(let node of dots){
                    if(node.classList.contains("red") && node.classList.contains(`${elim}`)){
                        elimination = true;
                        break;
                    }
                    else{
                        elimination = false;                    
                    }
                }
                if(!elimination){
                    break;
                }
            }
            if(elimination){
                elimaud.play();
                dot.classList.remove("blue");
                break;
            }
        }
    }
}

function checkForGameOver(){
    let dotOk5 = false;
    for(let k=13;k<=18;k++){
        for(let node of dots){
            if(node.classList.contains(`${k}`)){
                if(!node.classList.contains("red") && !node.classList.contains("blue")){
                    dotOk5 = false;
                    break;
                }
                else{
                    dotOk5 = true;
                }
            }
        }
        if (!dotOk5){
            break;
        }
    }
    if(dotOk5){
        gameOver();
    }
}

function updatePoints(){
    let edgeCount=0;
    let redDotOk5 = false;
    let blueDotOk5 = false;
    let redtempCall = false;
    let bluetempCall = false;
    if(count %2 != 0){
        redpts =0;
        for(let edge of edges){
            redDotOk5 = true;
            for(let node of edge){
                for(let dot of dots){
                    if(dot.classList.contains(`${node}`)){
                        if( dot.classList.contains("red")){
                            redDotOk5 = redDotOk5 && true;
                            break;
                        }
                        else{
                            redDotOk5 = redDotOk5 && false;
                            break;
                        }
                        
                    }
                    
                }
            }
            if(redDotOk5){
                redpts = redpts + points[edgeCount];
                rp.textContent = `${redpts}`;
                redtempCall = true;
            }
            else{
                redtempCall = redtempCall || false;
            }
            edgeCount++;
        }
        if(!redtempCall){
            rp.textContent = "0";
        }
    }


    else{
        bluepts = 0;
        for(let edge of edges){
            blueDotOk5 = true;
            for(let node of edge){
                for(let dot of dots){
                    if(dot.classList.contains(`${node}`)){
                        if( dot.classList.contains("blue")){
                            blueDotOk5 = blueDotOk5 && true;
                            break;
                        }
                        else{
                            blueDotOk5 = blueDotOk5 && false;
                            break;
                        }
                        
                    }
                    
                }
            }
            if(blueDotOk5){
                bluepts = bluepts + points[edgeCount];
                bp.textContent = `${bluepts}`;
                bluetempCall = true;
            }
            edgeCount++;
        }
        if(!bluetempCall){
            bp.textContent = "0";
        }
    }
   

}

function resets(){
    count = 0;
    redpts = 0;
    bluepts = 0;
    rp.textContent = '0';
    bp.textContent = '0';
    changeTurn();
    dots.forEach((dot)=>{
        if(dot.classList.contains("red")){
            dot.classList.remove("red");
        }
        else if(dot.classList.contains("blue")){
            dot.classList.remove("blue");
        }
    })
    clearInterval(totalTimeCounter);
    clearInterval(playtime);
    totalTime = 600;
    totalTimeCounter = setInterval(()=>{
        if(totalTime==0){
            clearInterval(totalTimeCounter);
            gameOver();
        }
        gameTime.innerHTML=`${totalTime}`;
        totalTime-=1;
    },1000);
    resetTimerBlue();
    resetTimerRed();

}

function paused(){
    if(pause.textContent =='⏸️'){
        pause.textContent = `▶️`;
        reset.removeEventListener("click",resets);
        pause.title="Resume";
        pausename.textContent = "Resume";
        reset.style.cursor = "not-allowed";
        clearInterval(playtime);
        clearInterval(totalTimeCounter);
        dots.forEach((dot)=>{
            dot.removeEventListener("click",titanMovement);
        })
    }
    else if(pause.textContent ==`▶️`){
        pause.textContent = `⏸️`;
        pause.title = "Pause";
        pausename.textContent = "Pause";
        reset.style.cursor = "pointer";
        reset.addEventListener("click",resets);
        totalTimeCounter = setInterval(()=>{
            if(totalTime==0){
                clearInterval(totalTimeCounter);
                gameOver();
            }
            gameTime.innerHTML=`${totalTime}`;
            totalTime-=1;
        },1000);
        playerTimeCounter();
        
        dots.forEach((dot)=>{
            dot.addEventListener("click",titanMovement)
        })
    }
}
function leaderboards(pts){
    let lead = [JSON.parse(localStorage.getItem("leaderboard"))];    
    lead.push(pts);
    lead.sort((a,b) => b-a);
    lead = lead.slice(0,5);
    localStorage.setItem("leaderboard",JSON.stringify(lead));
}
function rank(){
    console.log(`High Scores : ${JSON.parse(localStorage.getItem("leaderboard"))}`);
}

