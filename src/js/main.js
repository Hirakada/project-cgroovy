import { signUp, signIn, handleAuthButton, getUser } from './auth.js';

function loadUsers() {
  const users = localStorage.getItem("users");
  if (users) {
      console.log("Loaded users:", JSON.parse(users));
      return JSON.parse(users);
  } else {
      return [];
  }
}

function setTheme() {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  const theme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  root.setAttribute('data-theme', theme);
}

document.addEventListener("DOMContentLoaded", function () {
    loadUsers();
    setTheme();

    const loadHTMLContent = (containerId, fileName) => {
        const container = document.getElementById(containerId);
        if (container) {
            fetch(fileName)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(data => {
                    container.innerHTML = data;
                    if (containerId === 'header-container') {
                        handleAuthButton();
                    }
                })
                .catch(error => {
                    console.error(`Failed to load ${fileName}:`, error);
                    alert(`Failed to load ${fileName}. Please try again later.`);
                });
        } else {
            console.error(`Container with ID ${containerId} not found.`);
        }
    };

    if (!window.location.pathname.includes('sign-up') && !window.location.pathname.includes('sign-in')) {
        loadHTMLContent("header-container", "header.html");
        loadHTMLContent("footer-container", "footer.html");
    }

    const user = getUser();

    if (user) {
        console.log('Current User:', user);
    } else {
        console.log('No user logged in.');
    }

    const signUpForm = document.getElementById("sign-up");
    if (signUpForm) {
        signUpForm.addEventListener("submit", function (event) {
            event.preventDefault(); 
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const age = document.getElementById("age").value;
            const gender = document.querySelector('input[name="gender"]:checked')?.value;
    
            if (!gender) {
                alert("Please select your gender.");
                return;
            }
    
            const result = signUp(name, email, password, age, gender);
    
            if (result.success) {
                alert(result.message);
                window.location.href = "sign-in.html"; 
            } else {
                alert(result.message);
            }
        });
    }
    
    const signInForm = document.getElementById("sign-in");
    if (signInForm) {
        signInForm.addEventListener("submit", function (event) {
            event.preventDefault();
        
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
    
            const result = signIn(email, password);
        
            if (result.success) {
                alert(result.message);
                window.location.href = "index.html";
            } else {
                alert(result.message);
            }
        });
    }

});
