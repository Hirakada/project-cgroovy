const defaultUsers = [
    { name: "UserDummy", email: "dummy@example.com", password: "dummy123", age: "25", gender: "Male" }
];

if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(defaultUsers));
}

function loadUsers() {
    const users = localStorage.getItem("users");
    if (users) {
        console.log("Loaded users:", JSON.parse(users));
        return JSON.parse(users);
    } else {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function validateForm(password, age) {
    if (password.length < 6) {
        return { valid: false, message: "Password must be at least 6 characters long!" };
    }
    if (isNaN(age) || age < 12) {
        return { valid: false, message: "Please enter a valid age above 12" };
    }
    return { valid: true };
}

export function signUp(name, email, password, age, gender) {
    const users = loadUsers();
    if (users.some(u => u.email === email)) {
        return { success: false, message: "Email already registered." };
    }

    const validation = validateForm(password, age);
    if (!validation.valid) {
        return { success: false, message: validation.message };
    }

    users.push({ name, email, password, age, gender });
    saveUsers(users);
    return { success: true, message: "Registration successful! Please sign in." };
}

export function signIn(email, password) {
    const users = loadUsers();
    console.log("Attempting to sign in with email:", email, "and password:", password);
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        console.log("Login successful:", user); 
        localStorage.setItem("currentUser", JSON.stringify(user));
        return { success: true, message: `Login successful! Welcome ${user.name}` };
    } else {
        console.log("Login failed: Invalid email or password.");
        return { success: false, message: "Invalid email or password." };
    }
}

export function handleAuthButton() {
    const currentUser = localStorage.getItem("currentUser");
    const authButton = document.getElementById("auth-button");
    
    if (!authButton) {
        console.error("Auth button not found in the DOM.");
        return;
    }

    if (currentUser !== null) {
        try {
            const user = JSON.parse(currentUser);
            authButton.textContent = "SIGN OUT";
            authButton.addEventListener("click", signOut);
        } catch (e) {
            console.error('Error parsing currentUser from localStorage:', e);
            localStorage.removeItem('currentUser');
        }
    } else {
        authButton.textContent = "SIGN IN";
        authButton.addEventListener("click", () => {
            window.location.href = "sign-in.html";
        });
    }
}

export function signOut(event) {
    event.preventDefault();
    localStorage.removeItem("currentUser");
    window.location.href = "sign-in.html";
}

export function getUser() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        return JSON.parse(user);
    }
    return null;
}