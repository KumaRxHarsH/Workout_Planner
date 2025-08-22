// Hide landing after animation
setTimeout(() => {
    document.body.classList.add("landing-hidden");
}, 5000); // 5 seconds

// Calculate BMI
function calculateBMI() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const feet = parseFloat(document.getElementById("heightFeet").value) || 0;
    const inches = parseFloat(document.getElementById("heightInches").value) || 0;
    const weight = parseFloat(document.getElementById("weight").value);
    const resultDiv = document.getElementById("result");

    // Validation check
    if (!name || !age || !gender || (!feet && !inches) || !weight) {
        resultDiv.innerHTML = "⚠ Please fill all fields.";
        resultDiv.style.color = "yellow";
        return;
    }

    // convert height to meters
    const totalInches = (feet * 12) + inches;
    const heightInMeters = totalInches * 0.0254;

    const bmi = (weight / (heightInMeters ** 2)).toFixed(1);

    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal weight";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obese";

    resultDiv.innerHTML = `Hello <span style="color:#ff0033">${name}</span>!<br>
    Your BMI is <span style="color:#00ff99">${bmi}</span> (${category}).`;
    resultDiv.style.color = "white";

    // Move to goal-setting after 2s
    setTimeout(() => {
        document.getElementById("info-form").style.display = "none";
        document.getElementById("goal-setting").style.display = "block";
    }, 2000);
}


//  Submit Goal and Show Workout Plan
function submitGoal() {
    const goal = document.getElementById("goal").value;

    if (!goal) {
        alert("Please select your fitness goal");
        return;
    }

    // Hide goal-setting, show workout section
    document.getElementById("goal-setting").style.display = "none";
    document.getElementById("workoutSection").style.display = "block";

    // Workout Plans
    const workoutPlans = {
        "Muscle Gain": [
            "Bench Press - 4 sets × 8–10 reps",
            "Squats - 4 sets × 10 reps",
            "Deadlifts - 3 sets × 8 reps",
            "Pull-Ups - 3 sets × 12 reps",
            "Shoulder Press - 3 sets × 10 reps"
        ],
        "Weight Loss": [
            "Jumping Jacks - 4 sets × 30 secs",
            "Burpees - 4 sets × 15 reps",
            "Mountain Climbers - 4 sets × 40 secs",
            "Push-Ups - 3 sets × 15 reps",
            "Squats - 3 sets × 20 reps"
        ],
        "Endurance": [
            "Running - 20–30 mins",
            "Plank - 3 sets × 1 min",
            "Jump Rope - 5 sets × 2 mins",
            "Lunges - 3 sets × 15 reps",
            "Push-Ups - 3 sets × 20 reps"
        ],
        "Flexibility": [
            "Yoga Stretches - 20 mins",
            "Hamstring Stretch - 3 sets × 30 sec",
            "Shoulder Stretch - 3 sets × 30 sec",
            "Cobra Pose - 3 sets × 20 sec"
        ]
    };

    // Populate workout plan
    const workoutList = document.getElementById("workoutPlan");
    workoutList.innerHTML = "";
    workoutPlans[goal].forEach(exercise => {
        const li = document.createElement("li");
        li.textContent = exercise;
        workoutList.appendChild(li);
    });
}
function goBack() {
    document.getElementById("workoutSection").style.display = "none";
    document.getElementById("goal-setting").style.display = "block"; 
  }
  
  let setDuration = 30;   // workout time (seconds)
let restDuration = 15;  // rest time (seconds)
let setIntervalId, restIntervalId;

// Attach click handler for each workout exercise
function attachWorkoutClickHandler() {
  const workoutItems = document.querySelectorAll("#workoutPlan li");
  workoutItems.forEach((item) => {
    item.addEventListener("click", () => {
      const exerciseName = item.textContent.trim();

      document.getElementById("exerciseName").textContent = exerciseName;
      document.getElementById("exerciseDetails").style.display = "block";
      document.getElementById("setCompleted").checked = false;
      document.getElementById("restTimer").style.display = "none";

      startSetTimer(setDuration);

      document.getElementById("setCompleted").onchange = function () {
        if (this.checked) {
          clearInterval(setIntervalId);
          alert("✅ Set completed! Take a rest.");
          startRestTimer(restDuration);
        }
      };
    });
  });
}

// Start workout set timer
function startSetTimer(duration) {
  clearInterval(setIntervalId);
  let timeLeft = duration;
  document.getElementById("timeLeft").textContent = timeLeft;

  setIntervalId = setInterval(() => {
    timeLeft--;
    document.getElementById("timeLeft").textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(setIntervalId);
      alert("⏳ Time's up! Complete your set!");
    }
  }, 1000);
}

// Start rest timer
function startRestTimer(duration) {
  clearInterval(restIntervalId);
  let restTimeLeft = duration;
  document.getElementById("restTimeLeft").textContent = restTimeLeft;
  document.getElementById("restTimer").style.display = "block";

  restIntervalId = setInterval(() => {
    restTimeLeft--;
    document.getElementById("restTimeLeft").textContent = restTimeLeft;
    if (restTimeLeft <= 0) {
      clearInterval(restIntervalId);
      alert("💪 Rest time over! Next set!");
      document.getElementById("restTimer").style.display = "none";
    }
  }, 1000);
}

  