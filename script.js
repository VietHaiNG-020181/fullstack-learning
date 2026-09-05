const progressButton = document.getElementById("progress-button");
const progressSection = document.getElementById("progress");
const progressParagraph = document.getElementById("progress-paragraph");
const progressStatus = document.getElementById("goal-progress");

const goalsSection = document.getElementById("goals");
const goalForm = document.getElementById("goal-form");
const goalInput = document.getElementById("goal-input");
const addGoalButton = document.getElementById("add-goal-button");
const goalList = document.getElementById("goal-list");

progressButton.addEventListener("click", function () {
    progressSection.classList.toggle("completed");
    
    if (progressSection.classList.contains("completed")) {
        progressParagraph.textContent = "Javascript DOM manipulation is working!";
        progressButton.textContent = "Progress Updated";
        
        const message = document.createElement("p");
        message.id = "progress-message";
        message.textContent = "Progress saved";
        progressParagraph.after(message);
    } else {
        progressParagraph.textContent = "I am currently learning HTML fundamentals.";
        progressButton.textContent = "Check Progress";

        const message = document.getElementById("progress-message");
        if(message) {
            message.remove();
        }
    }
});

addGoalButton.addEventListener("click", function () {
    const newGoalText = goalInput.value.trim();
    if (newGoalText) {
        const newGoal = document.createElement("li");
        newGoal.textContent = newGoalText;
        document.getElementById("goal-list").appendChild(newGoal);
        goalInput.value = "";

        newGoal.addEventListener("click", toggleGoal);
    }
});

goalForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const newGoalText = goalInput.value.trim();
    if (newGoalText) {
        const newGoal = document.createElement("li");
        newGoal.textContent = newGoalText;
        document.getElementById("goal-list").appendChild(newGoal);
        goalInput.value = "";
        // newGoal.addEventListener("click", toggleGoal);
    }
    console.log(goalList);
})

// const goals = goalsSection.querySelectorAll("li");
// goals.forEach(function (goal) {
//     goal.addEventListener("click", toggleGoal);
// });

goalList.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        toggleGoal(event);
    }
});

function toggleGoal(event){
    event.target.classList.toggle("goal-completed");
    const completed = goalsSection.querySelectorAll(".goal-completed").length;
    const total = goalsSection.querySelectorAll("li").length;
    progressStatus.textContent = `Goals completed: ${Math.round(calculateProgress(completed, total))}%`;
}

function calculateProgress(completed, total) {
    return (completed / total) * 100;
}
