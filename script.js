const settingbutton=document.getElementById('setting-btn');
const setting=document.getElementById('setting');
const form=document.getElementById('form');
const difficultydropdown=document.getElementById('difficulty');
const wordElement=document.getElementById('word');
const wordinput=document.getElementById('word-input');
const timeElement=document.getElementById('time');
const scoreElement=document.getElementById('score');
const gameovercontainer=document.getElementById('game-over');

let time=10;
let score=0;
let randomword;
const timeinterval= setInterval(decrementtime,1000);
let difficulty=localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'easy';
wordinput.focus();

difficultydropdown.value=localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'easy';


async function getwords(){
    const res=await fetch('https://random-words-api.vercel.app/word');
    const data =await res.json();
    return (data[0].word).toLowerCase();
};
async function renderword(){
    randomword= await getwords();
    wordElement.innerHTML=randomword;
}

function decrementtime(){
    time--;
    timeElement.innerHTML=time;
    if(time===0){
        clearInterval(timeinterval);
        gameover();
    }
    
}
function gameover(){
    gameovercontainer.style.display='flex';
    gameovercontainer.innerHTML=`
    <h1>Game over !</h1>
    <h2>Your score: ${score}</h2>
    <button onclick="location.reload()">Play Again</button> 
    `

}
function scoreincrement(){
    score++;
    scoreElement.innerHTML=score;
}
function clearinput(){
    wordinput.value='';
}
function showdifficulty(){
    setting.classList.remove('hide');
}

wordinput.addEventListener('input', e=>{
   const userinput=e.target.value;
    if(userinput===randomword){
        renderword();
        scoreincrement();
        clearinput();
        if ( difficulty === 'easy' ) {
            // if the difficulty is easy, increment timer by 3
            time += 3;
        } else if ( difficulty === 'medium' ) {
            // if the difficulty is medium, increment timer by 2
            time += 2;
        } else {
            // if the difficulty is hard, increment by 1
            time += 1;
        }
        timeElement.innerHTML=time;
    }
    
   
    
});
settingbutton.addEventListener('click', ()=> setting.classList.toggle('hide'));
difficultydropdown.addEventListener('change', e=>{
    difficulty=e.target.value;
    localStorage.setItem('difficulty', difficulty);
})
renderword();
remainingtime();