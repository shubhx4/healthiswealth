// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDK0PeFgt6_YNqggkIM9MTMSVDYb-a4eHc",
    authDomain: "health-is-wealth-6864b.firebaseapp.com",
    projectId: "health-is-wealth-6864b",
    storageBucket: "health-is-wealth-6864b.appspot.com",
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
        .then((userCredential) => {
            const user = userCredential.user;
            db.collection("users").doc(user.uid).set({
                email: user.email,
                name: "",
                age: "",
                weight: "",
                history: []
            });
            alert("Registered Successfully!");
        })
        .catch(error => alert(error.message));
}

// Login User
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Login Successful!");
            loadUserProfile(userCredential.user.uid);
        })
        .catch(error => alert(error.message));
}

// Load User Profile
function loadUserProfile(uid) {
    db.collection("users").doc(uid).get().then((doc) => {
        if (doc.exists) {
            document.getElementById("auth").style.display = "none";
            document.getElementById("userProfile").style.display = "block";
            document.getElementById("name").value = doc.data().name;
            document.getElementById("profileEmail").value = doc.data().email;
            document.getElementById("profileAge").value = doc.data().age;
            document.getElementById("profileWeight").value = doc.data().weight;
        }
    });
}

// Update Profile
function updateProfile() {
    const user = auth.currentUser;
    if (user) {
        db.collection("users").doc(user.uid).update({
            name: document.getElementById("name").value,
            age: document.getElementById("profileAge").value,
            weight: document.getElementById("profileWeight").value
        }).then(() => alert("Profile Updated!"));
    }
}

// Logout User
function logout() {
    auth.signOut().then(() => {
        alert("Logged Out!");
        document.getElementById("auth").style.display = "block";
        document.getElementById("userProfile").style.display = "none";
    });
}
