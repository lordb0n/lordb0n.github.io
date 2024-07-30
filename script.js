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
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginContainer = document.getElementById('login-container');
    const searchContainer = document.getElementById('search-container');
    const loginError = document.getElementById('login-error');

    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();

        const user = tg.initDataUnsafe.user;
        if (user) {
            autoLogin(user);
        }
    } else {
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
                loginError.textContent = 'Invalid login or password';
            }
        });
    }
});

async function autoLogin(user) {
    const response = await fetch('/auto-login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            telegramId: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            username: user.username,
        }),
    });

    const result = await response.json();

    if (result.success) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('search-container').style.display = 'block';
    } else {
        document.getElementById('login-error').textContent = 'Auto login failed';
    }
}
