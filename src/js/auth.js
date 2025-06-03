const defaultUsers = [
    { name: "UserDummy", email: "dummy@example.com", password: "dummy123", age: "25", gender: "Male" }
];

if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(defaultUsers));
}

function loadUsers() {
    const users = localStorage.getItem("users");
    if (users) {
        return JSON.parse(users);
    } else {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function calculateAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function validateForm(users, name, email, password, dobString, gender) {
    if (!name || !email || !password || !dobString || !gender) {
        return { valid: false, message: "Please fill in all fields!" };
    }
    if (users.some(u => u.email === email)) {
        return { valid: false, message: "Email already registered." };
    }
    if (!email.includes("@") || !email.includes(".")) {
        return { valid: false, message: "Please enter a valid email address!" };
    }
    if (password.length < 6) {
        return { valid: false, message: "Password must be at least 6 characters long!" };
    }
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
        return { valid: false, message: "Password must contain both letters and numbers!" };
    }

    const age = calculateAge(dobString);
    if (age < 12) {
        return { valid: false, message: "Age must be at least 12 years old." };
    }
    
    return { valid: true, calculatedAge: age };
}

export function signUp(name, email, password, dobString, gender) {
    const users = loadUsers();
    const validation = validateForm(users, name, email, password, dobString, gender);
    
    if (!validation.valid) {
        return { success: false, message: validation.message };
    }

    const age = validation.calculatedAge;
    users.push({ name, email, password, age: age, gender });
    saveUsers(users);
    return { success: true, message: "Registration successful! Please sign in." };
}

export function signIn(email, password) {
    const users = loadUsers();
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        return { success: true, message: `Login successful! Welcome ${user.name}` };
    } else {
        return { success: false, message: "Invalid email or password." };
    }
}

export function handleAuthButton() {
    const currentUser = localStorage.getItem("currentUser");
    const authButton = document.getElementById("auth-button");
    const mobileAuthButton = document.getElementById("auth-button-mobile");
    
    if (!authButton || !mobileAuthButton) {
        console.error("Auth button not found in the DOM.");
        return;
    }

    if (currentUser !== null) {
        try {
            const user = JSON.parse(currentUser);
            authButton.textContent = "SIGN OUT";
            authButton.removeEventListener("click", redirectToSignIn);
            authButton.addEventListener("click", signOut);

            mobileAuthButton.textContent = "SIGN OUT";
            mobileAuthButton.removeEventListener("click", redirectToSignIn);
            mobileAuthButton.addEventListener("click", signOut);
        } catch (e) {
            console.error('Error parsing currentUser from localStorage:', e);
            localStorage.removeItem('currentUser');
        }
    } else {
        authButton.textContent = "SIGN IN";
        authButton.removeEventListener("click", signOut);
        authButton.addEventListener("click", redirectToSignIn);

        mobileAuthButton.textContent = "SIGN IN";
        mobileAuthButton.removeEventListener("click", signOut);
        mobileAuthButton.addEventListener("click", redirectToSignIn);
    }
}

function redirectToSignIn() {
    window.location.href = "./sign-in.html";
}

export function signOut(event) {
    if (event) {
        event.preventDefault();
    }
    localStorage.removeItem("currentUser");
    window.location.href = "./sign-in.html";
}

export function getUser() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        return JSON.parse(user);
    }
    return null;
}