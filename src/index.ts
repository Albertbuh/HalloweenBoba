import DomAppender from "./models/DomAppender.js";
import GameObject, { IPositioned} from "./models/GameObject.js";
import {
  DarkPumpkinFactory,
  LightPumpkin,
  LightPumpkinFactory,
  Pumpkin,
} from "./models/Pumpkin.js";
import Randomizer from "./models/Randomizer.js";
import Shooter from "./models/Shooter.js";

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
document.body.style.width = `${windowWidth}px`;
document.body.style.height = `${windowHeight}px`;

window.onload = () => {
  document.querySelector(".preload-container").remove();
};


const v0 = windowWidth > 800 ? 10 : 7;
const g = windowWidth > 800 ? 0.8 : 0.5;
const screenSizeK = windowWidth > 800 ? 1 : 2;

let score = 0;
let scoreField: HTMLDivElement = document.querySelector(".score");
scoreField.querySelector("span").textContent = score.toString();


//flag that checks if user press mouse button to cut objects
let isButtonPressed: boolean = false;
document.addEventListener("pointerdown", () => isButtonPressed = true);
document.addEventListener("pointerup", () => isButtonPressed = false);

let ind = windowWidth > 800 ? 1 : 3;
let backgroundSound = new Audio(`./src/music/bg${ind}.mp3`);
backgroundSound.muted = true;

const lightPumpkinFactory = new LightPumpkinFactory();
const darkPumpkinFactory = new DarkPumpkinFactory();
const shooter = new Shooter(g);

document.querySelector(".btn-play").firstElementChild.addEventListener(
  "pointerdown",
   function() {
    setTimeout(() => {
      this.remove();
      startGame();
    }, 500);
  }
);


document.querySelector(".btn-sound").firstElementChild.addEventListener(
  "pointerdown",
  toggleBackgroundSound
);


let delayOfNewGameIteration = 1000;
let k = 0;
function startGame() {
  setTimeout(function gameProc() {
    play();
    setTimeout(gameProc, delayOfNewGameIteration);
    k++;
    if(k == 7) {
      if(delayOfNewGameIteration > 450)
        delayOfNewGameIteration -= 50;
      k = 0;
    }
  }, 200);
  
  toggleBackgroundSound();//fat ass
}

let pk = 0.9;
function play() {
  let pumpkin: Pumpkin;
  if (Math.random() < pk) {
    pumpkin = lightPumpkinFactory.create();
  } else {
    pumpkin = darkPumpkinFactory.create();
  }
  if(pk > 0.55) {
    pk -= 0.02;
  }
  console.log(pk);

  initializePumpkinValues(pumpkin);
  addCollisionCheck(pumpkin);
  setTimeout(DisposeObject, 3000, pumpkin);
}

function DisposeObject(obj: GameObject) {
  DomAppender.removeElement(obj.id);
  shooter.stopShoot(obj.id);
  updateScore(-1);
}

let somepointsSound = new Audio(`./src/music/somepoints.mp3`);
let organSound = new Audio(`./src/music/organ.mp3`);
let userLimitsCollection = new Set<number>();
function updateScore(num: number) {
  score += num;
  scoreField.firstElementChild.textContent = Math.max(score, 0).toString();
  if(score % 24 == 0)
    somepointsSound.play();
  if(score % 100 == 0 && !userLimitsCollection.has(score)) {
    organSound.play();
    userLimitsCollection.add(score);
  }
}

function addCollisionCheck(obj: GameObject) {
  document.addEventListener("pointermove", function checkCol(event) {
    if (isButtonPressed) {
      let pos: IPositioned = {
        x: event.pageX,
        y: event.pageY,
        width: 1,
        height: 1,
      };
      if (obj.checkCollision(pos)) {
        document.removeEventListener("pointermove", checkCol);
        if ("score" in obj) {
          updateScore(Number(obj.score));
        }
      }
    }
  });
}

function initializePumpkinValues(obj: GameObject) {
  if (obj instanceof Pumpkin) {
    let isForward = Randomizer.randYesNoWithPriorError();

    if (isForward) {
      obj.x = Randomizer.randInt(windowWidth * -0.2, windowWidth * 0.5);
    } else {
      obj.x = Randomizer.randInt(windowWidth * 0.5, windowWidth * 1.2);
    }
    obj.y = windowHeight;
    obj.width = Randomizer.randInt(windowWidth * 0.14, windowWidth * 0.22) * screenSizeK;
    obj.height = Randomizer.randInt(obj.width * 0.8, obj.width * 1.2);
    obj.setSpeed(v0 * 2, v0 * 3.5);

    DomAppender.addImage(obj, null);

    let inc = Randomizer.randInt(-5, 5);
    setInterval(function r() {
      obj.rotate(inc);
    }, 20);

    if (isForward) {
      shooter.shootForward(obj);
    } else {
      shooter.shootBackward(obj);
    }
  }
}

function toggleBackgroundSound() {
  backgroundSound.muted = !backgroundSound.muted;
  if(backgroundSound.currentTime == 0)
    playBackgroundSound(backgroundSound);
  document.querySelector(".btn-sound").classList.toggle("mute");
}

function playBackgroundSound(sound: HTMLAudioElement) {
  sound.play();
  let duration = sound.duration;
  setInterval(function bpl() {
    sound.play();
  }, duration * 60);
}

