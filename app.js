//declaring const and var
let direction={x:0,y:0}
const foodSound= new Audio("assets/food.mp3")
const gameOverSound= new Audio("assets/gameover.mp3")
const moveSound= new Audio("assets/move.mp3")
const bgMusic= new Audio("assets/music.mp3")
const game=document.getElementById("game")
let speed=5
let lastPaintTime=0 
let food={x:10,y:10}
let snakeArray=[
    {x:13,y:15}
]
let snakeDir={x:0,y:0}
let score=0
let scoreElement = document.getElementById("score");


//main func
function main(ctime) {
    window.requestAnimationFrame(main)
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime
    gameEngine()
}
//collide func
function isCollide(snake){
    //bumping into snake itself
    for (let i = 1; i < snakeArray.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true
        }
        
    }
    //collision with wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}
//game engine func
function gameEngine() {
    //snake array update
    if(isCollide(snakeArray)){
        gameOverSound.play()
        bgMusic.pause()
        snakeDir={x:0,y:0}
        alert("GAME OVER!!!, PRESS ENTER TO PLAY AGAIN")
        snakeArray=[{x:13,y:15}]
        bgMusic.play()
        score=0 
    }

    //incrementing score and displaying food again
    if(snakeArray[0].y===food.y && snakeArray[0].x===food.x){
        foodSound.play()
        score+=1
        scoreElement.innerHTML="Score: "+ score
        snakeArray.unshift({x:snakeArray[0].x+snakeDir.x,y:snakeArray[0].y+snakeDir.y})
        let a=2
        let b=16
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //updating x and y

    for (let i = snakeArray.length-2; i >=0; i--) {
        const element = snakeArray[i];
        snakeArray[i+1]={...snakeArray[i]}
        
    }
    snakeArray[0].x+=snakeDir.x
    snakeArray[0].y+=snakeDir.y
    //displaying snake 
    game.innerHTML=""
    snakeArray.forEach((e,index)=>{
        snakeElement=document.createElement("div")
        snakeElement.style.gridRowStart=e.y
        snakeElement.style.gridColumnStart=e.x
        
        if (index===0){
            snakeElement.classList.add("head")
        }else{
            snakeElement.classList.add("snake")
        }
        game.appendChild(snakeElement)

    })
    snakeArray.forEach((e,index)=>{
        foodElement=document.createElement("div")
        foodElement.style.gridRowStart=food.y
        foodElement.style.gridColumnStart=food.x
        foodElement.classList.add("food")
        game.appendChild(foodElement)

    })
}


function startGame() {
    // Start background music
    bgMusic.play();
    instruction.innerHTML=" "
    // Start the game animation loop
    window.requestAnimationFrame(main);
}

// Event listener for the "Enter" key to start the game
window.addEventListener("keydown", (e) => {
    // Check if any arrow key is pressed
    if (e.key.includes("Arrow")) {
        // Start the game
        startGame();
    }
});
// Function to handle keydown events for snake movement
function handleKeyDown(e) {
    snakeDir = { x: 0, y: 1 };
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            startGame();
            console.log("ArrowUp");
            snakeDir.x = 0;
            snakeDir.y = -1;
            break;
        case "ArrowDown":
            startGame();
            console.log("ArrowDown");
            snakeDir.x = 0;
            snakeDir.y = 1;
            break;
        case "ArrowLeft":
            startGame();
            console.log("ArrowLeft");
            snakeDir.x = -1;
            snakeDir.y = 0;
            break;
        case "ArrowRight":
            startGame();
            console.log("ArrowRight");
            snakeDir.x = 1;
            snakeDir.y = 0;
            break;
        default:
            break;
    }
}

// Event listener for keydown events to handle snake movement
window.addEventListener("keydown", handleKeyDown);