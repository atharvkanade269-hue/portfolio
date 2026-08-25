const API_BASE = "http://127.0.0.1:5000/api";

const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    loginError.textContent = "";
    loginBtn.disabled = true;
    loginBtn.textContent = "Signing in...";

    try {
        const response = await fetch(`${API_BASE}/admin/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Login failed"
            );
        }

        localStorage.setItem(
            "admin_token",
            data.access_token
        );

        localStorage.setItem(
            "admin_username",
            data.admin.username
        );

        window.location.href = "index.html";

    } catch (error) {

        console.error("Login failed:", error);

        loginError.textContent =
            error.message || "Unable to connect to server.";

        loginBtn.disabled = false;
        loginBtn.textContent = "Sign In";
    }
});