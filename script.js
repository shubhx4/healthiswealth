// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDK0PeFgt6_YNqggkIM9MTMSVDYb-a4eHc",
    authDomain: "health-is-wealth-6864b.firebaseapp.com",
    projectId: "health-is-wealth-6864b",
    storageBucket: "health-is-wealth-6864b.appspot.com", // FIXED TYPO
    messagingSenderId: "701100085079",
    appId: "1:701100085079:web:7d8cfbdce0f91553577812",
    measurementId: "G-6Y75SX5E8Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Helper Function: Show Toaster Message
function showToast(message, type) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: type === "success" ? "#4CAF50" : "#FF5733",
    }).showToast();
}

// Register User
function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => showToast("Registered Successfully!", "success"))
        .catch(error => showToast(error.message, "error"));
}

// Login User
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            showToast("Login Successful!", "success");
            document.getElementById("auth").style.display = "none";
            document.getElementById("userForm").classList.add("show");
        })
        .catch(error => showToast(error.message, "error"));
}

// Logout User
function logout() {
    auth.signOut().then(() => {
        showToast("Logged Out!", "success");
        document.getElementById("auth").style.display = "block";
        document.getElementById("userForm").classList.remove("show");
        document.getElementById("result").classList.remove("show");
    });
}

// Submit User Details
function submitDetails() {
    const age = document.getElementById("age").value;
    const weight = document.getElementById("weight").value;

    let healthPlan = "";

    if (age < 18) {
        healthPlan = "Eat more proteins, do physical activities like running.";
    } else if (age >= 18 && age <= 40) {
        healthPlan = "Maintain a balanced diet with proteins and carbs, exercise daily.";
    } else {
        healthPlan = "Eat light food, walk daily, and maintain low salt intake.";
    }

    document.getElementById("report").innerText = healthPlan;
    document.getElementById("result").classList.add("show");
    showToast("Health Plan Generated!", "success");
}
