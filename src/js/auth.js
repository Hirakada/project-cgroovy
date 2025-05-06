document.addEventListener("DOMContentLoaded", () => {
    const defaultUsers = [
        { name: "UserDummy", email: "dummy@example.com", password: "dummy123", age: "25", gender: "Male" }
    ];

    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(defaultUsers));
    }

    function loadUsers() {
        return JSON.parse(localStorage.getItem("users")) || [];
    }

    function saveUsers(users) {
        localStorage.setItem("users", JSON.stringify(users));
    }

    // Sign Up
    const signUpForm = document.getElementById("sign-up");
    if (signUpForm) {
        signUpForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const age = document.getElementById("age").value;

            let gender = "Unspecified";
            if (document.getElementById("gender-male").classList.contains("active")) {
                gender = "Male";
            } else if (document.getElementById("gender-female").classList.contains("active")) {
                gender = "Female";
            }

            const users = loadUsers();
            const existing = users.find(u => u.email === email);
            if (existing) {
                alert("Email already registered.");
                return;
            }

            users.push({ name, email, password, age, gender });
            saveUsers(users);
            alert("Registration successful! Please sign in.");
            window.location.href = "sign-in.html";
        });
    }

    const genderBtns = document.querySelectorAll(".gender");
    genderBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            genderBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });

    // Sign In
    const signInForm = document.querySelector("form#sign-in");
    if (signInForm) {
        signInForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const users = loadUsers();
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem("currentUser", JSON.stringify(user));
                alert("Login successful! Welcome " + user.name);
                window.location.href = "index.html";
            } else {
                alert("Invalid email or password.");
            }
        });
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const signInBtn = document.getElementById("sign-in-button");

    if (currentUser && signInBtn) {

    }
});
