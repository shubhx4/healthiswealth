// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDK0PeFgt6_YNqggkIM9MTMSVDYb-a4eHc",
    authDomain: "health-is-wealth-6864b.firebaseapp.com",
    projectId: "health-is-wealth-6864b",
    storageBucket: "health-is-wealth-6864b.firebasestorage.app",
    messagingSenderId: "701100085079",
    appId: "1:701100085079:web:7d8cfbdce0f91553577812",
    measurementId: "G-6Y75SX5E8Q"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Register User
function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => alert("Registered Successfully"))
        .catch(error => alert(error.message));
}

// Login User
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            alert("Login Successful");
            document.getElementById("auth").style.display = "none";
            document.getElementById("userForm").style.display = "block";
        })
        .catch(error => alert(error.message));
}

// Logout User
function logout() {
    auth.signOut().then(() => {
        alert("Logged Out");
        document.getElementById("auth").style.display = "block";
        document.getElementById("userForm").style.display = "none";
        document.getElementById("result").style.display = "none";
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
    document.getElementById("result").style.display = "block";
}
