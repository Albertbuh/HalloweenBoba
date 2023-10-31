import DomAppender from "./models/DomAppender.js";
import { DarkPumpkinFactory, LightPumpkinFactory, Pumpkin, } from "./models/Pumpkin.js";
import Randomizer from "./models/Randomizer.js";
import Shooter from "./models/Shooter.js";
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
document.body.style.width = `${windowWidth}px`;
document.body.style.height = `${windowHeight}px`;
const v0 = windowWidth > 800 ? 10 : 7;
const g = windowWidth > 800 ? 0.8 : 0.5;
const screenSizeK = windowWidth > 800 ? 1 : 2;
let score = 0;
let scoreField = document.querySelector(".score");
scoreField.querySelector("span").textContent = score.toString();
//flag that checks if user press mouse button to cut objects
let isButtonPressed = false;
document.addEventListener("pointerdown", () => isButtonPressed = true);
document.addEventListener("pointerup", () => isButtonPressed = false);
let backgroundSound = new Audio("./src/music/bg1.mp3");
backgroundSound.muted = true;
const lightPumpkinFactory = new LightPumpkinFactory();
const darkPumpkinFactory = new DarkPumpkinFactory();
const shooter = new Shooter(g);
document.querySelector(".btn-play").firstElementChild.addEventListener("pointerdown", startGame);
document.querySelector(".btn-sound").firstElementChild.addEventListener("pointerdown", toggleBackgroundSound);
document.body.onpointerdown = (event) => console.log(event.target);
let delayOfNewGameIteration = 1000;
let k = 0;
function startGame() {
    setTimeout(function gameProc() {
        play();
        setTimeout(gameProc, delayOfNewGameIteration);
        k++;
        if (k == 7) {
            if (delayOfNewGameIteration > 400)
                delayOfNewGameIteration -= 50;
            k = 0;
        }
    }, 200);
    playBackgroundSound(backgroundSound);
    toggleBackgroundSound();
}
let pk = 0.9;
function play() {
    let pumpkin;
    if (Math.random() < pk) {
        pumpkin = lightPumpkinFactory.create();
    }
    else {
        pumpkin = darkPumpkinFactory.create();
    }
    if (pk > 0.55) {
        pk -= 0.02;
    }
    console.log(pk);
    initializePumpkinValues(pumpkin);
    addCollisionCheck(pumpkin);
    setTimeout(DisposeObject, 3000, pumpkin);
}
function DisposeObject(obj) {
    DomAppender.removeElement(obj.id);
    shooter.stopShoot(obj.id);
    updateScore(-1);
}
function updateScore(num) {
    score += num;
    scoreField.firstElementChild.textContent = score.toString();
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
                if ("score" in obj) {
                    updateScore(Number(obj.score));
                }
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
        }
        else {
            shooter.shootBackward(obj);
        }
    }
}
function toggleBackgroundSound() {
    backgroundSound.muted = !backgroundSound.muted;
    document.querySelector(".btn-sound").classList.toggle("mute");
}
function playBackgroundSound(sound) {
    sound.play();
    let duration = sound.duration;
    setInterval(function bpl() {
        sound.play();
    }, duration * 60);
}
