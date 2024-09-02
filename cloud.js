import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

import { getSkinElem } from "./skin.js";

const SPEED = 0.02
const CLOUD_INTERVAL_MIN = 500
const CLOUD_INTERVAL_MAX = 1500
const worldElem = document.querySelector("[data-world]")

let nextCloudTime
export function setupCloud() {
  nextCloudTime = CLOUD_INTERVAL_MIN
  document.querySelectorAll("[data-cloud]").forEach(cloud => {
    cloud.remove()
  })
}

export function updateCloud(delta, speedScale) {
  document.querySelectorAll("[data-cloud]").forEach(cloud => {
    incrementCustomProperty(cloud, "--right", delta * speedScale * SPEED * -1)
    if (getCustomProperty(cloud, "--right") <= -100) {
      cloud.remove()
    }
  })

  if (nextCloudTime <= 0) {
    createCloud()
    nextCloudTime =
      randomNumberBetween(CLOUD_INTERVAL_MIN, CLOUD_INTERVAL_MAX) / speedScale
  }
  nextCloudTime -= delta
}

export function getCloudRects() {
  return [...document.querySelectorAll("[data-cloud]")].map(cloud => {
    return cloud.getBoundingClientRect()
  })
}




let isRandomized = false;
const imageSources = getSkinElem("cloud");
function createCloud() {
  const cloud = document.createElement("img")
  cloud.dataset.cloud = true
 

  const randomIndex = Math.floor(Math.random() * imageSources.length); // generate a random index between 0 and 1
  //const imageSources = ["imgs/cloud_01.png", "imgs/cloud_02.png", "imgs/cloud_03.png"];
  cloud.src = imageSources[randomIndex];
  cloud.classList.add("cloud")
  setCustomProperty(cloud, "--right", 100)
  worldElem.append(cloud)
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
// reset the flag when the dinosaur is no longer jumping 

isRandomized = false;

*/

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}