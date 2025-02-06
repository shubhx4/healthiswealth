// Register
function register() {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Registration Successful!");
            window.location.href = "dashboard.html";
        })
        .catch(error => alert(error.message));
}


function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => window.location.href = "dashboard.html")
        .catch(error => alert(error.message));
}

function logout() {
    auth.signOut().then(() => window.location.href = "index.html");
}

function saveUserDetails() {
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const age = document.getElementById("age").value;
    const city = document.getElementById("city").value;

    if (!height || !weight || !age || !city) {
        alert("Please fill in all fields.");
        return;
    }

    const user = auth.currentUser;
    if (user) {
        db.collection('users').doc(user.uid).set({
            height: parseFloat(height),
            weight: parseFloat(weight),
            age: parseInt(age),
            city: city
        }).then(() => {
            alert("User details saved!");
            checkUserDetails();
        }).catch(error => {
            console.error("Error saving user details:", error);
            alert("Error saving details. Please try again.");
        });
    }
}

function checkUserDetails() {
    const user = auth.currentUser;
    if (user) {
        const userDetailsRef = db.collection('users').doc(user.uid);
        userDetailsRef.get().then((doc) => {
            if (doc.exists) {
                document.getElementById('details-container').style.display = 'none';
                document.getElementById('dashboard-content').style.display = 'block';

                const data = doc.data();
                const bmiCategory = calculateBMI(data.height, data.weight);

                const dietPlan = getDietPlan(bmiCategory);
                populateTable('diet-table', dietPlan);

                const workoutPlan = getWorkoutPlan(bmiCategory);
                populateTable('workout-table', workoutPlan);

                loadGymMap(data.city);
            } else {
                document.getElementById('details-container').style.display = 'block';
                document.getElementById('dashboard-content').style.display = 'none';
            }
        }).catch((error) => {
            console.error("Error checking user details:", error);
        });
    }
}

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
        case "Overweight":
            return [
                { day: "Monday", exercise: "Brisk Walking", duration: "30 mins" },
                { day: "Tuesday", exercise: "Bodyweight Circuit", duration: "30 mins" },
                { day: "Wednesday", exercise: "Swimming", duration: "30 mins" },
                { day: "Thursday", exercise: "Yoga (Gentle)", duration: "40 mins" },
                { day: "Friday", exercise: "Cycling (Moderate)", duration: "30 mins" },
                { day: "Saturday", exercise: "Active Rest (e.g., Stretching)", duration: "20 mins" },
                { day: "Sunday", exercise: "Rest Day", duration: "--" }
            ];
        case "Obese":
            return [
                { day: "Monday", exercise: "Walking (Slow Pace)", duration: "20 mins" },
                { day: "Tuesday", exercise: "Chair Exercises", duration: "20 mins" },
                { day: "Wednesday", exercise: "Water Aerobics", duration: "20 mins" },
                { day: "Thursday", exercise: "Gentle Stretching", duration: "20 mins" },
                { day: "Friday", exercise: "Walking (Gradually Increase Pace)", duration: "25 mins" },
                { day: "Saturday", exercise: "Rest or Very Light Activity", duration: "15 mins" },
                { day: "Sunday", exercise: "Rest Day", duration: "--" }
            ];
        default:
            return [];
    }
}

function populateTable(tableId, plan) {
    const table = document.getElementById(tableId);
    table.innerHTML = ""; // Clear existing table data

    const headerRow = table.insertRow();
    if (tableId === "diet-table") {
        headerRow.insertCell().textContent = "Time";
        headerRow.insertCell().textContent = "Meal";
        headerRow.insertCell().textContent = "Calories";
    } else if (tableId === "workout-table") {
        headerRow.insertCell().textContent = "Day";
        headerRow.insertCell().textContent = "Exercise";
        headerRow.insertCell().textContent = "Duration";
    }

    plan.forEach(item => {
        const row = table.insertRow();
        if (tableId === "diet-table") {
            row.insertCell().textContent = item.time;
            row.insertCell().textContent = item.meal;
            row.insertCell().textContent = item.calories;
        } else if (tableId === "workout-table") {
            row.insertCell().textContent = item.day;
            row.insertCell().textContent = item.exercise;
            row.insertCell().textContent = item.duration;
        }
    });
}

// Export to PDF
function exportToPDF(sectionId) {
    const element = document.getElementById(sectionId);
    html2pdf().from(element).save("health_plan.pdf");
}
function showRegister() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'block';
    document.getElementById('details-container').style.display = 'none'; // Hide details container
    document.getElementById('dashboard-content').style.display = 'none'; // Hide dashboard content
}

function showLogin() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('details-container').style.display = 'none'; // Hide details container
    document.getElementById('dashboard-content').style.display = 'none'; // Hide dashboard content
}
// Google Maps API Integration
function loadGymMap(city) {
    const mapFrame = document.getElementById("gym-map");
    mapFrame.src = `https://www.google.com/maps/embed/v1/search?key=YOUR_GOOGLE_MAPS_API_KEY&q=gyms+in+${city}`;
}
