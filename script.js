const progressButton = document.getElementById("progress-button");
const progressSection = document.getElementById("progress");
const progressParagraph = document.getElementById("progress-paragraph");
const progressStatus = document.getElementById("goal-progress");

const goalForm = document.getElementById("goal-form");
const goalInput = document.getElementById("goal-input");
const goalCategory = document.getElementById("goal-category");
const goalList = document.getElementById("goal-list");

// Objects
let goals = [];

let goalID = 4;

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

goalForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (goalInput.value.trim() !== "") {
        const newGoalElement = createGoal(goalInput.value.trim(), false, goalCategory.value);
        goals.push(newGoalElement);
        saveGoals();
        renderGoals();
        goalInput.value = "";
    }
});

goalList.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        toggleGoal(event);
    }
});

function toggleGoal(event){
    goals.forEach(function(goal) {
        if(goal.id === parseInt(event.target.dataset.id)) {
            goal.completed = !goal.completed;
        }
    });
    saveGoals();
    renderGoals();
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
        const idToCheck = parseInt(goal.dataset.id);
        const index = goals.findIndex(function(goal){
            return goal.id === idToCheck;
        })
        if(index !== -1) {
            goals.splice(index, 1);
        }
        saveGoals();
        renderGoals();
    });
    goal.appendChild(deleteButton);
}

function updateProgressStatus() {
    const completed = goals.filter(function(goal) {
        return goal.completed;
    }).length;
    const total = goals.length;
    if (total === 0) {
        progressStatus.textContent = `Goals completed: 0%`;
        return;
    }
    progressStatus.textContent = `Goals completed: ${Math.round(calculateProgress(completed, total))}%`;
    console.log(goals);
}

function renderGoals(){
    goalList.innerHTML = "";
    goals.forEach(function(goal) {
        // HTML element creation
        const newli = document.createElement("li");
        newli.textContent = goal.text;
        newli.dataset.id = goal.id;
        addRemoveButton(newli);

        //CSS class addition
        if (goal.completed) {
            newli.classList.add("goal-completed");
        }

        goalList.appendChild(newli);
    });
    updateProgressStatus();
}

function getID() {
    const id = goalID;
    goalID++;
    return id;
}

function createGoal(text, completed = false, category = "N/A") {
    return {id: getID(), text: text, completed: completed, category: category};
}

function saveGoals() {
    localStorage.setItem("goals", JSON.stringify(goals));
    localStorage.setItem("goalID", goalID.toString());
}

function loadGoals() {
    const storedGoals = localStorage.getItem("goals");
    const storedGoalID = localStorage.getItem("goalID");
    if(storedGoals) {
        goals = JSON.parse(storedGoals);
    } else {
        goals = [
            {id: 1, text: "Learn React", completed: false, category: "Frontend",},
            {id: 2, text: "Learn Node.js", completed: false, category: "Backend",},
            {id: 3, text: "Learn Cloud", completed: false, category: "DevOps",}
        ];
    }
    if(storedGoalID) {
        goalID = parseInt(storedGoalID);
    } else {
        goalID = 4;
    }
}
loadGoals();
renderGoals();

