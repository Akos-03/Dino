import { handleStart } from "./script.js"

var actualScore = 0;
var scores = [];

export function saveHighScore(score) {

    actualScore = parseInt(score);
    var scoresCookie = document.cookie.split('; ').find(row => row.startsWith('scores='));

    if (scoresCookie !== "scores=[]" && scoresCookie) {
        scoresCookie = scoresCookie.split('=')[1];

        scores = JSON.parse(scoresCookie);

        var numberHighScore = scores.length;
        var minHighScores = scores[scores.length - 1][0];
    } else {
        var numberHighScore = 0;
        var minHighScores = 0;
    }

    if (numberHighScore < 5 || actualScore > minHighScores) { // kell-e menteni a highscore-t
        openModal();
    } else {
        const startScreenElem = document.querySelector("[data-start-screen]")
        const backElem = document.querySelector("[data-back]");
        //ide raktam
        setTimeout(() => {
            document.addEventListener("keydown", handleStart, { once: true })
            startScreenElem.classList.remove("hide")
            backElem.classList.remove("hide");
        }, 100)
    }
}

//uj
export function openModal() {
    var input = document.getElementById("name");
    input.addEventListener('blur', function() {
        var button = document.getElementById("modalClose");
        if (input.value.length >= 3) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    });

    document.getElementById("modal").style.display = "block";
    document.getElementById("point").innerText = actualScore;
    var input = document.getElementById("name");
    input.focus();
}
//uj vege
/*
export function openModal() {
    // document.removeEventListener("keydown", handleStart);
    document.getElementById("modal").style.display = "block";
    document.getElementById("point").innerText = actualScore;
    //ezzel alapból írni lehet az inpuba mikor megnyílik nem kell belekattintani
    var input = document.getElementById("name");
    input.focus();
}
*/
export function closeModal() {

    var name = document.getElementById("name").value;

    scores.push([actualScore, name]);
    scores.sort((b, a) => a[0] - b[0]);
    scores.splice(5);

    const jsonStr = JSON.stringify(scores);

    document.cookie = `scores=${jsonStr}; expires=Thu, 1 Jan 2099 00:00:00 UTC; path=/`;

    document.getElementById("modal").style.display = "none";

    const startScreenElem = document.querySelector("[data-start-screen]")
    const backElem = document.querySelector("[data-back]");
    setTimeout(() => {
        document.addEventListener("keydown", handleStart, { once: true })
        startScreenElem.classList.remove("hide")
        backElem.classList.remove("hide");
    }, 100)
}


document.addEventListener("DOMContentLoaded", function (event) {
    const button = document.getElementById("modalClose");
    button.addEventListener("click", function () {
        closeModal();
    });
    const buttonBack = document.getElementById("back");
    buttonBack.addEventListener("click", function () {
        window.location.href = "index.html";
    });
});
