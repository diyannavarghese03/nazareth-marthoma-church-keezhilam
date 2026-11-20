const API_URL = "YOUR_AZURE_FUNCTION_URL";

document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const message = document.getElementById("message");

    message.textContent = "Please wait...";

    try {
        const response = await fetch(`${API_URL}/api/adminLogin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Login failed");
        }

        // Session handling will be added next.
        window.location.href = "dashboard.html";

    } catch (error) {
        message.textContent = error.message;
    }
});