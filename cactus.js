import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

import { getSkinElem } from "./skin.js";

const SPEED = 0.04
const CACTUS_INTERVAL_MIN = 700
const CACTUS_INTERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]")

let nextCactusTime
export function setupCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN
  document.querySelectorAll("[data-cactus]").forEach(cactus => {
    cactus.remove()
  })
}

export function updateCactus(delta, speedScale) {
  document.querySelectorAll("[data-cactus]").forEach(cactus => {
    incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(cactus, "--left") <= -100) {
      cactus.remove()
    }
  })

  if (nextCactusTime <= 0) {
    createCactus()
    nextCactusTime =
      randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
  }
  nextCactusTime -= delta
}

export function getCactusRects() {
  return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
    return cactus.getBoundingClientRect()
  })
}

let isRandomized = false;
const imageSources = getSkinElem("cactus");
function createCactus() {
  const cactus = document.createElement("img")
  cactus.dataset.cactus = true


  //cactus.src = "imgs/cactus_3.png"

  if (!isRandomized) { // check if the image has already been randomized
    const randomIndex = Math.floor(Math.random() * imageSources.length); // generate a random index between 0 and 1
    // const imageSources = ["imgs/cactus_3.png", "imgs/cactus_2.png", "imgs/cactus.png"];

    cactus.src = imageSources[randomIndex];
    isRandomized = true; // set the flag to indicate that the image has been randomized


  }
  isRandomized = false;

  cactus.classList.add("cactus")
  setCustomProperty(cactus, "--left", 100)
  worldElem.append(cactus)
}

/*
let isRandomized = false; // keep track of whether the image has already been randomized

function handleRun(delta, speedScale) {
  if (isJumping) {
    if (!isRandomized) { // check if the image has already been randomized
      const randomIndex = Math.floor(Math.random() * 3); // generate a random index between 0 and 1
      const imageSources = ["imgs/jump_02_2.png", "imgs/dino-stationary.png", "imgs/jump_01.png"];
      dinoElem.src = imageSources[randomIndex];
      isRandomized = true; // set the flag to indicate that the image has been randomized
    }
    return;
  }
  
  isRandomized = false;
*/


// Projectile shenanigans

/*
const projectile_ammo = 3

function onShoot(e) {
  if (e.code !== "ArrowRight"){
    if (projectile_ammo > 0) {
      createProjectile()
      projectile_ammo -= 1
    }
  }  
}

export function updateProjectile(delta, speedScale) {
  document.querySelectorAll("[data-cactus]").forEach(projectile => {
    incrementCustomProperty(projectile, "--right", delta * speedScale * SPEED * -1)
    if (getCustomProperty(projectile, "--right") <= 100) {
      projectile.remove()
    }
  })

  document.addEventListener("keydown", onShoot)
  
}

export function getProjectileRects() {
  return [...document.querySelectorAll("[data-cactus]")].map(projectile => {
    return projectile.getBoundingClientRect()
  })
}

function createProjectile() {
  const cactus = document.createElement("img")
  cactus.dataset.projectile = true
  cactus.src = "imgs/cactus.png"
  cactus.classList.add("projectile")
  setCustomProperty(projectile, "--left", 0)
  worldElem.append(projectile)
}
*/

// end of Projectile shenanigans

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

