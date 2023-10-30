import DomAppender from "./models/DomAppender.js";
import { DarkPumpkinFactory, LightPumpkinFactory, Pumpkin, } from "./models/Pumpkin.js";
import Randomizer from "./models/Randomizer.js";
import Shooter from "./models/Shooter.js";
const v0 = 10;
const g = 0.8;
let PAUSE_FLAG = false;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
document.body.style.width = `${windowWidth}px`;
document.body.style.height = `${windowHeight}px`;
//flag that checks if user press mouse button to cut objects
let isButtonPressed = false;
document.addEventListener("pointerdown", () => isButtonPressed = true);
document.addEventListener("pointerup", () => isButtonPressed = false);
let backgroundSound = new Audio("./src/music/bg1.mp3");
backgroundSound.muted = true;
const lightPumpkinFactory = new LightPumpkinFactory();
const darkPumpkinFactory = new DarkPumpkinFactory();
const shooter = new Shooter(g);
let disposeTimersMap = new Map();
document.querySelector(".btn-play").firstElementChild.addEventListener("pointerdown", startGame);
document.querySelector(".btn-sound").addEventListener("pointerdown", toggleBackgroundSound);
document.querySelector(".btn-pause").addEventListener("pointerdown", pause);
function startGame() {
    setTimeout(function gameProc() {
        if (!PAUSE_FLAG)
            play();
        setTimeout(gameProc, 1000);
    }, 200);
    toggleBackgroundSound();
}
function play() {
    let pumpkin;
    if (Math.random() < 0.7) {
        pumpkin = lightPumpkinFactory.create();
    }
    else {
        pumpkin = darkPumpkinFactory.create();
    }
    initializePumpkinValues(pumpkin);
    addCollisionCheck(pumpkin);
    createDisposeTimer(pumpkin, 3000);
}
function createDisposeTimer(obj, left) {
    let startTime;
    let disposeTimerId = setTimeout(() => {
        DisposeObject(obj);
        startTime = new Date();
    }, left);
    disposeTimersMap.set({ timerId: disposeTimerId, leftTime: startTime }, obj);
}
function DisposeObject(obj) {
    DomAppender.removeElement(obj.id);
    shooter.stopShoot(obj.id);
}
function addCollisionCheck(obj) {
    document.addEventListener("pointermove", function checkCol(event) {
        if (isButtonPressed) {
            let pos = {
                x: event.pageX,
                y: event.pageY,
                width: 1,
                height: 1,
            };
            if (obj.checkCollision(pos)) {
                document.removeEventListener("pointermove", checkCol);
            }
        }
    });
}
function initializePumpkinValues(obj) {
    if (obj instanceof Pumpkin) {
        let isForward = Randomizer.randYesNoWithPriorError();
        if (isForward) {
            obj.x = Randomizer.randInt(windowWidth * -0.2, windowWidth * 0.5);
        }
        else {
            obj.x = Randomizer.randInt(windowWidth * 0.5, windowWidth * 1.2);
        }
        obj.y = windowHeight;
        obj.width = Randomizer.randInt(windowWidth * 0.14, windowWidth * 0.22);
        obj.height = Randomizer.randInt(obj.width * 0.8, obj.width * 1.2);
        obj.setSpeed(v0 * 2, v0 * 3.5);
        DomAppender.addImage(obj, null);
        let inc = Randomizer.randInt(-5, 5);
        setInterval(function r() {
            obj.rotate(inc);
            // setTimeout(r, 20);
        }, 20);
        if (isForward) {
            shooter.shootForward(obj);
        }
        else {
            shooter.shootBackward(obj);
        }
    }
}
function toggleBackgroundSound() {
    backgroundSound.muted = !backgroundSound.muted;
    if (backgroundSound.currentTime == 0) {
        backgroundSound.play();
    }
}
function pause() {
    if (!PAUSE_FLAG) {
        shooter.pauseAllShoots();
        for (let dt of disposeTimersMap) {
            clearTimeout(dt[0].timerId);
        }
    }
    PAUSE_FLAG = !PAUSE_FLAG;
}