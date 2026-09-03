const button = document.getElementById("helloButton");
const progressParagraph = document.getElementById("progress-paragraph");
const progressSection = document.getElementById("progress");

button.addEventListener("click", function () {
    progressSection.classList.toggle("completed");
    if (progressSection.classList.contains("completed")) {
        progressParagraph.textContent = "Javascript DOM manipulation is working!";
        button.textContent = "Progress Updated";
    } else {
        progressParagraph.textContent = "I am currently learning HTML fundamentals.";
        button.textContent = "Check Progress";
    }
});