document.addEventListener('DOMContentLoaded', function () {
    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    const gistId = 'b96cff6d8852bc7ec8b663bdd7886663'; // Вставте ваш GitHub Gist ID сюди

    // Функція для завантаження повідомлень з GitHub Gist
    async function loadMessages() {
        const response = await fetch(`https://api.github.com/gists/${gistId}`);
        const gistData = await response.json();
        const messages = JSON.parse(gistData.files['chat.json'].content);
        
        messagesContainer.innerHTML = '';
        messages.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.textContent = msg;
            messagesContainer.appendChild(messageElement);
        });
    }

    // Функція для відправки нового повідомлення
    async function sendMessage() {
        const message = messageInput.value;
        if (!message) return;

        const response = await fetch(`https://api.github.com/gists/${gistId}`);
        const gistData = await response.json();
        const messages = JSON.parse(gistData.files['chat.json'].content);

        messages.push(message);

        await fetch(`https://api.github.com/gists/${gistId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ВАШ_GITHUB_TOKEN` // Використовуйте ваш особистий токен GitHub
            },
            body: JSON.stringify({
                files: {
                    'chat.json': {
                        content: JSON.stringify(messages.slice(-50)) // Зберігати останні 50 повідомлень
                    }
                }
            })
        });

        messageInput.value = '';
        loadMessages();
    }

    // Ініціалізація чату
    loadMessages();

    // Обробка натискання кнопки відправки
    sendButton.addEventListener('click', sendMessage);

    // Відправка повідомлення при натисканні Enter
    messageInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Оновлення повідомлень кожні 5 секунд
    setInterval(loadMessages, 5000);
});
