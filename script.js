// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
const loginPage = document.getElementById("login-page");
const registerPage = document.getElementById("register-page");
const detailsPage = document.getElementById("details-page");
const dashboardPage = document.getElementById("dashboard-page");

const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginBtn = document.getElementById("login-btn");

const registerEmail = document.getElementById("register-email");
const registerPassword = document.getElementById("register-password");
const registerBtn = document.getElementById("register-btn");

const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const ageInput = document.getElementById("age");
const cityInput = document.getElementById("city");
const submitDetailsBtn = document.getElementById("submit-details");

const dietTable = document.getElementById("diet-table");
const workoutTable = document.getElementById("workout-table");
const tipsList = document.getElementById("tips-list");

// Navigation
document.getElementById("go-to-register").addEventListener("click", () => {
  loginPage.classList.add("hidden");
  registerPage.classList.remove("hidden");
});

document.getElementById("go-to-login").addEventListener("click", () => {
  registerPage.classList.add("hidden");
  loginPage.classList.remove("hidden");
});

// Login
loginBtn.addEventListener("click", () => {
  const email = loginEmail.value;
  const password = loginPassword.value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      loginPage.classList.add("hidden");
      detailsPage.classList.remove("hidden");
    })
    .catch((error) => alert(error.message));
});

// Register
registerBtn.addEventListener("click", () => {
  const email = registerEmail.value;
  const password = registerPassword.value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      registerPage.classList.add("hidden");
      detailsPage.classList.remove("hidden");
    })
    .catch((error) => alert(error.message));
});

// Submit Details
submitDetailsBtn.addEventListener("click", () => {
  const height = heightInput.value;
  const weight = weightInput.value;
  const age = ageInput.value;
  const city = cityInput.value;

  const user = auth.currentUser;
  if (user) {
    db.collection("users").doc(user.uid).set({
      height,
      weight,
      age,
      city,
    }).then(() => {
      detailsPage.classList.add("hidden");
      dashboardPage.classList.remove("hidden");
      loadDashboard(height, weight);
    });
  }
});

// Calculate BMI
function calculateBMI(height, weight) {
  const heightInMeters = height / 100;
  return (weight / (heightInMeters * heightInMeters)).toFixed(2);
}

// Get BMI Category
function getBMICategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi >= 18.5 && bmi < 24.9) return "Normal";
  if (bmi >= 25 && bmi < 29.9) return "Overweight";
  return "Obese";
}

// Load Dashboard
function loadDashboard(height, weight) {
  const bmi = calculateBMI(height, weight);
  const bmiCategory = getBMICategory(bmi);

  // Display BMI
  const bmiDisplay = document.createElement("p");
  bmiDisplay.textContent = `Your BMI: ${bmi} (${bmiCategory})`;
  dashboardPage.prepend(bmiDisplay);

  // Generate Diet Schedule
  const dietData = getDietSchedule(bmiCategory);
  dietData.forEach((item) => {
    const row = dietTable.insertRow();
    row.insertCell().textContent = item.day;
    row.insertCell().textContent = item.meal;
    row.insertCell().textContent = item.calories;
  });

  // Generate Workout Plan
  const workoutData = getWorkoutPlan(bmiCategory);
  workoutData.forEach((item) => {
    const row = workoutTable.insertRow();
    row.insertCell().textContent = item.day;
    row.insertCell().textContent = item.exercise;
    row.insertCell().textContent = item.duration;
  });

  // Generate Healthy Tips
  const tips = getHealthyTips(bmiCategory);
  tips.forEach((tip) => {
    const li = document.createElement("li");
    li.textContent = tip;
    tipsList.appendChild(li);
  });
}

// Diet Schedule Based on BMI Category
function getDietSchedule(bmiCategory) {
  switch (bmiCategory) {
    case "Underweight":
      return [
        { day: "Monday", meal: "High-Calorie Breakfast", calories: "500" },
        { day: "Tuesday", meal: "Protein Shake", calories: "400" },
        // Add more meals
      ];
    case "Normal":
      return [
        { day: "Monday", meal: "Balanced Breakfast", calories: "350" },
        { day: "Tuesday", meal: "Vegetable Salad", calories: "300" },
        // Add more meals
      ];
    case "Overweight":
      return [
        { day: "Monday", meal: "Low-Calorie Breakfast", calories: "300" },
        { day: "Tuesday", meal: "Grilled Chicken", calories: "400" },
        // Add more meals
      ];
    case "Obese":
      return [
        { day: "Monday", meal: "Low-Carb Breakfast", calories: "250" },
        { day: "Tuesday", meal: "Boiled Vegetables", calories: "200" },
        // Add more meals
      ];
    default:
      return [];
  }
}

// Workout Plan Based on BMI Category
function getWorkoutPlan(bmiCategory) {
  switch (bmiCategory) {
    case "Underweight":
      return [
        { day: "Monday", exercise: "Strength Training", duration: "45 mins" },
        { day: "Tuesday", exercise: "Yoga", duration: "30 mins" },
        // Add more exercises
      ];
    case "Normal":
      return [
        { day: "Monday", exercise: "Cardio", duration: "30 mins" },
        { day: "Tuesday", exercise: "Weight Lifting", duration: "45 mins" },
        // Add more exercises
      ];
    case "Overweight":
      return [
        { day: "Monday", exercise: "Running", duration: "30 mins" },
        { day: "Tuesday", exercise: "Cycling", duration: "45 mins" },
        // Add more exercises
      ];
    case "Obese":
      return [
        { day: "Monday", exercise: "Walking", duration: "30 mins" },
        { day: "Tuesday", exercise: "Swimming", duration: "45 mins" },
        // Add more exercises
      ];
    default:
      return [];
  }
}

// Healthy Tips Based on BMI Category
function getHealthyTips(bmiCategory) {
  switch (bmiCategory) {
    case "Underweight":
      return [
        "Eat calorie-dense foods like nuts and seeds.",
        "Include protein-rich foods in every meal.",
      ];
    case "Normal":
      return [
        "Maintain a balanced diet.",
        "Exercise regularly to stay fit.",
      ];
    case "Overweight":
      return [
        "Avoid sugary drinks and snacks.",
        "Incorporate more vegetables into your diet.",
      ];
    case "Obese":
      return [
        "Focus on portion control.",
        "Start with low-impact exercises like walking.",
      ];
    default:
      return [];
  }
}
