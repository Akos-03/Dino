import { updateGround, setupGround } from "./ground.js"
import { updateDino, setupDino, getDinoRect, setDinoLose, setupFlyer } from "./dino.js"
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js"
import { updateCloud, setupCloud, getCloudRects } from "./cloud.js"
//uj
import { saveHighScore, openModal, closeModal } from "./highscore.js"
//uj vege
//dinoelem

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")

//uj vissza gomb
const backElem = document.querySelector("[data-back]");
//uj vege

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true })

let lastTime
let speedScale
let score

//fps koziztenssé tétele
function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  // rendes futtatés kezdése
  const delta = time - lastTime

  updateGround(delta, speedScale)
  // updateBackground(delta, speedScale)

  updateDino(delta, speedScale)
  updateCactus(delta, speedScale)
  updateCloud(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)


  if (checkLose()) return handleLose()

  lastTime = time
  window.requestAnimationFrame(update)
}

let invulnerable = false
function checkLose() {
  const dinoRect = getDinoRect()
  if (!invulnerable) {
    return getCactusRects().some(rect => isCollision(rect, dinoRect))
  }
  return false
}


function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

// *0.01 is the default, may have been changed for testing
function updateScore(delta) {
  score += delta * 0.01
  scoreElem.textContent = Math.floor(score)
}

//uj oda irtam hogy export
export function handleStart() {
  lastTime = null
  speedScale = 1
  score = 0
  setupCloud()
  setupGround()
  // setupBackground()
  setupDino()
  setupCactus()

  startScreenElem.classList.add("hide")

  //uj elrejti a vissza gombot amikor megy a játék
  backElem.classList.add("hide")
  //uj vege

  window.requestAnimationFrame(update)
}

function handleCountinue() {
  // check += 1
  score -= 100
  setupCloud()
  setupGround()
  setupDino()
  setupCactus()

  startScreenElem.classList.add("hide")
  window.requestAnimationFrame(update)
}

function handleDeath() {
  //uj
  saveHighScore(score);
  //uj vege
  setDinoLose()
  //uj átraktam másik a highscorejs-be
  // setTimeout(() => {
  //   document.addEventListener("keydown", handleStart, { once: true })
  //   startScreenElem.classList.remove("hide")
  // }, 100)
  //uj vege
}

// revive shenanigans
const check = 0;
function handleLose() {
  if (score > 100) {
    var result = window.confirm("Do you want to revive? It will cost 100 points!");
    if (result === true && check == 0) {
      handleCountinue()

    } else {
      handleDeath()
    }
  } else handleDeath()
}

// invulerability shenanigans

function onInvul(e) {
  if (e.code === "ArrowDown" && score >= 50) {
    invulnerable = true
    score -= 50

    // handleInvul()
    setTimeout(() => {
      invulnerable = false
    }, 1000)
  }
}

document.addEventListener('keydown', onInvul)

// superman dino

function checkInput() {
  let index = 0;

  function checkChar(e) {
    const sequence = ['KeyS', 'KeyU', 'KeyP', 'KeyE', 'KeyR'];

    if (e.code === sequence[index]) {
      index++;
      if (index === sequence.length) {
        // needs to fly
        setupFlyer()

        invulnerable = true
        setTimeout(() => {
          invulnerable = false
        }, 3000)

        index = 0;
      }
    } else {
      index = 0;
    }
  }

  document.addEventListener('keydown', checkChar);
}

checkInput();

// scaling megfelelő legyen
function setPixelToWorldScale() {
  let worldToPixelScale
 if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}

// countdown

const countdownContainer = document.getElementById('countdown-container');
const countdownText = document.getElementById('countdown-text');
const countdownSvg = document.getElementById('countdown-svg');

function startCountdown() {
  let countdown = 1000;
  countdownText.innerText = (countdown / 1000).toFixed(1);
  countdownContainer.style.display = 'block';
  countdownSvg.innerHTML = `<circle cx="50" cy="50" r="45"></circle>`;
  const circle = countdownSvg.querySelector('circle');
  const perimeter = circle.getTotalLength();
  circle.style.strokeDashoffset = perimeter;
  circle.style.strokeDasharray = perimeter;
  circle.classList.add('countdown-animate');
  const countdownInterval = setInterval(() => {
    countdown -= 10;
    countdownText.innerText = (countdown / 1000).toFixed(1);
    const progress = perimeter - (countdown / 1000) * perimeter;
    circle.style.strokeDashoffset = progress;
    if (countdown === 0) {
      clearInterval(countdownInterval);
      countdownContainer.style.display = 'none';
      circle.classList.remove('countdown-animate');
    }
  }, 10);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    startCountdown();
  }
});


