document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginContainer = document.getElementById('login-container');
    const searchContainer = document.getElementById('search-container');
    const loginError = document.getElementById('login-error');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password }),
        });

        const result = await response.json();

        if (result.success) {
            loginContainer.style.display = 'none';
            searchContainer.style.display = 'block';
        } else {
            loginError.textContent = result.message || 'Login failed';
        }
    });
});
