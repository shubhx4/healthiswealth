// Firebase Configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDK0PeFgt6_YNqggkIM9MTMSVDYb-a4eHc",
//     authDomain: "health-is-wealth-6864b.firebaseapp.com",
//     projectId: "health-is-wealth-6864b",
//     storageBucket: "health-is-wealth-6864b.appspot.com", // FIXED TYPO
//     storageBucket: "health-is-wealth-6864b.appspot.com",
//     messagingSenderId: "701100085079",
//     appId: "1:701100085079:web:7d8cfbdce0f91553577812",
//     measurementId: "G-6Y75SX5E8Q"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();

// Register
function register() {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => alert("Registration Successful!"))
        .catch(error => alert(error.message));
}

// Login
function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => window.location.href = "dashboard.html")
        .catch(error => alert(error.message));
}

// Logout
function logout() {
    auth.signOut().then(() => window.location.href = "index.html");
}

// Calculate BMI and Generate Plans
function calculateBMI(height, weight) {
    const bmi = weight / ((height / 100) * (height / 100));
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi <= 24.9) return "Normal";
    if (bmi >= 25 && bmi <= 29.9) return "Overweight";
    return "Obese";
}

function getDietPlan(bmiCategory) {
    switch (bmiCategory) {
        case "Underweight":
            return [
                { time: "8 AM", meal: "Oatmeal with nuts and honey", calories: "400" },
                { time: "12 PM", meal: "Grilled chicken with rice and veggies", calories: "600" },
                { time: "4 PM", meal: "Protein shake with banana", calories: "350" },
                { time: "8 PM", meal: "Salmon with quinoa and steamed broccoli", calories: "500" }
            ];
        case "Normal":
            return [
                { time: "8 AM", meal: "Whole wheat toast with avocado and eggs", calories: "350" },
                { time: "12 PM", meal: "Quinoa salad with grilled tofu", calories: "500" },
                { time: "4 PM", meal: "Greek yogurt with nuts and honey", calories: "300" },
                { time: "8 PM", meal: "Grilled fish with steamed vegetables", calories: "450" }
            ];
        case "Overweight":
            return [
                { time: "8 AM", meal: "Smoothie with spinach, banana, and almond milk", calories: "300" },
                { time: "12 PM", meal: "Grilled chicken with mixed greens", calories: "400" },
                { time: "4 PM", meal: "Handful of almonds and green tea", calories: "200" },
                { time: "8 PM", meal: "Lentil soup with a side of roasted vegetables", calories: "350" }
            ];
        case "Obese":
            return [
                { time: "8 AM", meal: "Scrambled eggs with sautéed vegetables", calories: "250" },
                { time: "12 PM", meal: "Baked salmon with roasted cauliflower", calories: "350" },
                { time: "4 PM", meal: "Handful of walnuts and herbal tea", calories: "150" },
                { time: "8 PM", meal: "Steamed fish with leafy greens", calories: "300" }
            ];
        default:
            return [];
    }
}

function getWorkoutPlan(bmiCategory) {
    switch (bmiCategory) {
        case "Underweight":
            return [
                { day: "Monday", exercise: "Strength Training", duration: "45 mins" },
                { day: "Tuesday", exercise: "Yoga", duration: "30 mins" },
                { day: "Wednesday", exercise: "Cycling", duration: "40 mins" },
                { day: "Thursday", exercise: "Resistance Training", duration: "50 mins" },
                { day: "Friday", exercise: "Swimming", duration: "45 mins" },
                { day: "Saturday", exercise: "Jogging", duration: "35 mins" },
                { day: "Sunday", exercise: "Rest Day", duration: "--" }
            ];
        case "Normal":
            return [
                { day: "Monday", exercise: "Cardio", duration: "30 mins" },
                { day: "Tuesday", exercise: "Weight Lifting", duration: "45 mins" },
                { day: "Wednesday", exercise: "Swimming", duration: "40 mins" },
                { day: "Thursday", exercise: "Pilates", duration: "50 mins" },
                { day: "Friday", exercise: "Cycling", duration: "45 mins" },
                { day: "Saturday", exercise: "Hiking", duration: "60 mins" },
                { day: "Sunday", exercise: "Rest Day", duration: "--" }
            ];
        default:
            return [];
    }
}

// Export to PDF
function exportToPDF(sectionId) {
    const element = document.getElementById(sectionId);
    html2pdf().from(element).save("health_plan.pdf");
}

// Google Maps API Integration
function loadGymMap(city) {
    const mapFrame = document.getElementById("gym-map");
    mapFrame.src = `https://www.google.com/maps/embed/v1/search?key=YOUR_GOOGLE_MAPS_API_KEY&q=gyms+in+${city}`;
}
