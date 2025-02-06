// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDK0PeFgt6_YNqggkIM9MTMSVDYb-a4eHc",
    authDomain: "health-is-wealth-6864b.firebaseapp.com",
    projectId: "health-is-wealth-6864b",
    storageBucket: "health-is-wealth-6864b.appspot.com", // FIXED TYPO
    storageBucket: "health-is-wealth-6864b.appspot.com",
    messagingSenderId: "701100085079",
    appId: "1:701100085079:web:7d8cfbdce0f91553577812",
    measurementId: "G-6Y75SX5E8Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

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
function generatePlan() {
    const height = parseFloat(document.getElementById("height").value) / 100;
    const weight = parseFloat(document.getElementById("weight").value);
    const bmi = weight / (height * height);

    let diet, workout, tips;

    if (bmi < 18.5) {
        diet = "High-protein, calorie-rich diet (nuts, dairy, meat)";
        workout = "Light strength training, yoga, and stretching";
        tips = "Increase meal frequency, focus on nutrient-dense foods";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        diet = "Balanced diet with lean proteins, veggies, and whole grains";
        workout = "Cardio + Strength Training (4-5 days a week)";
        tips = "Maintain hydration, avoid junk food, and stay active";
    } else {
        diet = "Low-carb, high-fiber diet (greens, lean proteins, less sugar)";
        workout = "Intense cardio + weight training (5-6 days a week)";
        tips = "Reduce sugar, stay consistent, and prioritize sleep";
    }

    document.getElementById("diet").innerText = diet;
    document.getElementById("workout").innerText = workout;
    document.getElementById("tips").innerText = tips;
}

// Export to PDF
function exportToPDF() {
    const element = document.getElementById("plan");
    html2pdf().from(element).save("health_plan.pdf");
}

// Google Maps API Integration
function loadGymMap() {
    const city = document.getElementById("city").value;
    const mapFrame = document.getElementById("gym-map");
    mapFrame.src = `https://www.google.com/maps/embed/v1/search?key=YOUR_GOOGLE_MAPS_API_KEY&q=gyms+in+${city}`;
}
