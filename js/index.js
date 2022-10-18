console.log("working");

const playerElm=document.getElementById('player');
const groundElm=document.getElementById('ground');
console.log(playerElm);
let x=0;
let dx=0;/* speed */

let dy=1;
let acceleration=0.3;
let index=1;
let fire =0;
let dead =0;




const draw = () => {

    if(dy!==0){
        playerElm.style.backgroundImage= `url('img/adventure_girl/png/Jump (${index++}).png')`;

    } else if(dx!==0){
        playerElm.style.backgroundImage= `url('img/adventure_girl/png/Run (${index++}).png')`;

    }else if(!fire==0){
        playerElm.style.backgroundImage= `url('img/adventure_girl/png/Shoot (${index++}).png')`;

    }else if(!dead==0){playerElm.style.backgroundImage= `url('../img/adventure_girl/png/Dead (${index++}).png')`;
    
    }else playerElm.style.backgroundImage= `url('img/adventure_girl/png/Idle (${index++}).png')`;

    if(index>10) index=1;
    requestAnimationFrame(draw);
    
};

const animate = () => {
    console.log("Timmer set");

    if((playerElm.offsetLeft + playerElm.offsetWidth > innerWidth)){
        dx=0;
        playerElm.style.left=`${innerWidth - playerElm.offsetWidth}px`;
    }else if(playerElm.offsetLeft <0){
        dx=0;
        playerElm.style.left='0';
    }


    if(dy<-10) dy=-10;
    dy +=acceleration;
    if((playerElm.offsetTop+playerElm.offsetHeight)> groundElm.offsetTop ){
        dy=0;
        playerElm.style.top=  `${groundElm.offsetTop - playerElm.offsetHeight}px`
        acceleration=0;
    }

    playerElm.style.left=  `${playerElm.offsetLeft +dx}px`;
    playerElm.style.top=  `${playerElm.offsetTop + dy}px`;

    requestAnimationFrame(animate);
    
}

addEventListener(('keydown'),({key})=>{
    console.log('up');
    console.log(key);

    if(key==="ArrowRight" ){
        index=1;
        console.log("Right Arrow Down");
        playerElm.classList.remove('turn');
        dx=10;

    }else if(key==="ArrowLeft" ){
        index=1;
        console.log("Left Arrow Down");
        playerElm.classList.add('turn');
        dx=-10;
      
      
    }
  
});

addEventListener(('keyup'),({key})=>{
    fire =0;
    dead =0;
    console.log('down');
    console.log(key);

    if(key==="ArrowRight" || key === "ArrowLeft"){
        console.log("Arrow up");
        dx=0;
    }
    
   /*  if(key=="ArrowRight"){
        console.log("Right Arrow up");
    }else if(key==="ArrowLeft"){
        console.log("Left Arrow up");

    }   */
   
});

addEventListener(('keypress'),({key})=>{
    console.log(key);
    fire =0;
    dead =0;

    if(key===' '){
        console.log("Arrow is going up");
        dy=-10;
        acceleration=0.3;
    }

    if(key==='q'){
        fire++;

    }
    if(key==='d'){
        dead++;

    }

});

addEventListener(('keyup'),({key})=>{
    console.log(key);
    dy=1;  
    dy +=acceleration;
   

});

requestAnimationFrame(draw);
requestAnimationFrame(animate);

let j=0;
let t1 =0;
const interval =1;

function repaint(timestamp){
   if(!t1) t1=timestamp;
   const diff = timestamp - t1;
   if(diff >=(interval*1000)){
    t1=timestamp;
    console.log('Painted ' + j++);
   }
    
    if(timestamp%1000==0){
        console.log('Painted: ' + j++,timestamp);

    }

    
    requestAnimationFrame(repaint);
    // last_time =timestamp;
    // console.log(last_time-new_time);
} 
requestAnimationFrame(repaint);