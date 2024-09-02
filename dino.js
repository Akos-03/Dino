import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

import { getSkinElem } from "./skin.js";

// var zzz =
// console.log ("zzz", zzz );

const dinoElem = document.querySelector("[data-dino]")

const dinoRunElem = document.querySelector("[data-dino]")

const dinoFlyElem = document.querySelector("[data-dino]")

const dinoJumpElem = document.querySelector("[data-dino]")



const JUMP_SPEED = 0.45
// const GRAVITY = 0.0015
const GRAVITY = getSkinElem('GRAVITY');
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100


let isJumping
let dinoFrame
let currentFrameTime
let yVelocity

export function setupDino() {
  isJumping = false
  dinoFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(dinoElem, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}

export function setupFlyer(){
  isJumping = false
  dinoFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(dinoElem, "--bottom", 40)
}


// invul dino shenanigans
/*
export function setupInvul(delta, speedScale) {
  handleInvul(delta, speedScale)
  handleJump(delta)
}
export function handleInvul(delta, speedScale) {
  
    
    setTimeout(() => {
      isJumping = false
      dinoFrame = 0
      currentFrameTime = 0
      yVelocity = 0
      setCustomProperty(dinoElem, "--bottom", 5)

     
    }, 1000);
    
  }

// end ofinvul dino shenanigans
*/

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getDinoRect() {
  return dinoElem.getBoundingClientRect()
}

let isRandomized = false; // keep track of whether the image has already been randomized
export function setDinoLose() {  
  const imageSources = getSkinElem("dinoElem");

  
    const randomIndex = Math.floor(Math.random() * 4); // generate a random index between 0 and 1
    // const imageSources = ["imgs/jump_02_2.png", "imgs/dino-stationary.png", "imgs/jump_01.png"];
    dinoElem.src = imageSources[randomIndex];
    isRandomized = true; // set the flag to indicate that the image has been randomized
  
}  
/*
isRandomized = false;
  dinoElem.src = imageSources[0]
 // dinoElem.src = "imgs/dino-lose.png"
}
*/


const imageSources = getSkinElem("dinoJumpElem");

function handleRun(delta, speedScale) {
  if (isJumping) {
    if (!isRandomized) { // check if the image has already been randomized
      const randomIndex = Math.floor(Math.random() * 3); // generate a random index between 0 and 1
      // const imageSources = ["imgs/jump_02_2.png", "imgs/dino-stationary.png", "imgs/jump_01.png"];
      dinoJumpElem.src = imageSources[randomIndex];
      isRandomized = true; // set the flag to indicate that the image has been randomized
    }
    return;
  }  
  isRandomized = false;


  if (getCustomProperty(dinoElem, "--bottom") <= 0) 
  {
    setCustomProperty(dinoElem, "--bottom", 0)
    
    if (currentFrameTime >= FRAME_TIME) {
      const imageSources = getSkinElem("dinoRunElem");
      dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
      dinoRunElem.src = imageSources[dinoFrame] 
      currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale

  }
  
  else  if (currentFrameTime >= FRAME_TIME) {
    const imageSources = getSkinElem("dinoFlyElem");
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
    dinoFlyElem.src = imageSources[dinoFrame] 
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

/*
 if (getCustomProperty(dinoElem, "--bottom") <= 0) 
  {
    setCustomProperty(dinoElem, "--bottom", 0)
    
    if (currentFrameTime >= FRAME_TIME) {
      dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
      dinoRunElem.src = `imgs/dino-run-${dinoFrame}.png`
      currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale

  }
  
  else  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
    dinoFlyElem.src = `imgs/dino_fly_${dinoFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}
*/




/*
  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
    dinoElem.src = `imgs/dino-run-${dinoFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
  */


  /*
  dinoElem.src = "imgs/dino-run.png";
  /*

/*
function handleRun(delta, speedScale) {
  if (isJumping) {
    const randomIndex = Math.floor(Math.random() * 2); // generate a random index between 0 and 1
    const imageSources = ["imgs/cactus.png", "imgs/dino-stationary.png"];
    dinoElem.src = imageSources[randomIndex];
    return;
  }
*/  

/*
function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElem.src = `imgs/dino-stationary.png`
    return
  }
*/

export function handleJump(delta) {
  if (!isJumping) return

  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)

  if (getCustomProperty(dinoElem, "--bottom") <= 0) {
    setCustomProperty(dinoElem, "--bottom", 0)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return

  yVelocity = JUMP_SPEED
  isJumping = true
}


