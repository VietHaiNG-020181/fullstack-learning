const progressButton = document.getElementById("progress-button");
const progressSection = document.getElementById("progress");
const progressParagraph = document.getElementById("progress-paragraph");
const progressStatus = document.getElementById("goal-progress");

const goalsSection = document.getElementById("goals");
const goalForm = document.getElementById("goal-form");
const goalInput = document.getElementById("goal-input");
const goalCategory = document.getElementById("goal-category");
const addGoalButton = document.getElementById("add-goal-button");
const goalList = document.getElementById("goal-list");

// Objects
const goals = [
    {text: "Learn React", completed: false, category: "Frontend",},
    {text: "Learn Node.js", completed: false, category: "Backend",},
    {text: "Learn Cloud", completed: false, category: "DevOps",}
]

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

goalList.querySelectorAll("li").forEach(function(goal) {
    addRemoveButton(goal);
});

goalForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const newGoalElement = createGoal(goalInput.value.trim(), false, goalCategory.value);
    if (newGoalElement) {
        const newGoal = document.createElement("li");
        newGoal.textContent = newGoalElement.text; 
        addRemoveButton(newGoal);
        goalList.appendChild(newGoal);
        goals.push(newGoalElement);
        goalInput.value = "";
    }

    updateProgressStatus();
    console.log(goals);

})

goalList.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        toggleGoal(event);
    }
});

function toggleGoal(event){
    event.target.classList.toggle("goal-completed");
    updateProgressStatus();
}

function calculateProgress(completed, total) {
    return (completed / total) * 100;
}

function addRemoveButton(goal){
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-goal");
    deleteButton.addEventListener("click", function (event) {
        event.stopPropagation();
        goal.remove();
        updateProgressStatus();
    });

    goal.appendChild(deleteButton);
}

function updateProgressStatus() {
    const completed = goalsSection.querySelectorAll(".goal-completed").length;
    const total = goalsSection.querySelectorAll("li").length;
    progressStatus.textContent = `Goals completed: ${Math.round(calculateProgress(completed, total))}%`;
}

function renderGoals(){
    goals.forEach(function(goal) {
        // HTML element creation
        const newli = document.createElement("li");
        newli.textContent = goal.text;
        addRemoveButton(newli);

        //CSS class addition
        if (goal.completed) {
            newli.classList.add("goal-completed");
        }

        goalList.appendChild(newli);
    });
    updateProgressStatus();
}

function createGoal(text, completed = false, category = "N/A") {
    return {text: text, completed: completed, category: category};
}

renderGoals();

const newGoal = createGoal("Learn React");
goals.push(newGoal);
console.log(goals);

