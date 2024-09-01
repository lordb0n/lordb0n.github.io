let selectedTemptations = [];

function showPage2() {
    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'flex';
    console.log("Перехід на сторінку 2");
}

function showPage3() {
    document.getElementById('page2').style.display = 'none';
    document.getElementById('page3').style.display = 'flex';
}

function showPage4() {
    document.getElementById('page3').style.display = 'none';
    document.getElementById('page4').style.display = 'flex';
}
function showPage5() {
    document.getElementById('page4').style.display = 'none';
    document.getElementById('page5').style.display = 'flex';
}

function showPage6() {
    document.getElementById('page5').style.display = 'none';
    document.getElementById('page6').style.display = 'flex';
}

function showPage7() {
    document.getElementById('page6').style.display = 'none';
    document.getElementById('page7').style.display = 'flex';
}
function showPage7() {
    document.getElementById('page6').style.display = 'none';
    document.getElementById('page7').style.display = 'flex';
}

function showPage8() {
    document.getElementById('page7').style.display = 'none';
    document.getElementById('page8').style.display = 'flex';
}
function showPage9() {
    document.getElementById('page8').style.display = 'none';
    document.getElementById('page9').style.display = 'flex';
}
function showPage10() {
    document.getElementById('page9').style.display = 'none';
    document.getElementById('page10').style.display = 'flex';
    showButtonBar(); // Викликаємо функцію для показу панелі кнопок
}

document.querySelectorAll('input').forEach(function(inputElement) {
    inputElement.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {  // Перевіряємо, чи натиснута клавіша "Enter"
            event.preventDefault();   // Запобігаємо стандартній дії
            inputElement.blur();      // Знімаємо фокус з поля вводу, що закриває клавіатуру
        }
    });
});

function loadFile(event, index) {
    const output = document.getElementById('output' + index);
    const container = output.parentElement;

    output.src = URL.createObjectURL(event.target.files[0]);
    output.style.display = 'block';

    // Додаємо клас filled, щоб прибрати плюсик
    container.classList.add('filled');
}

function saveSelectedTemptations() {
    selectedTemptations = [];
    const checkboxes = document.querySelectorAll('#page8 .grid-item input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const name = checkbox.closest('.grid-item').querySelector('p').innerText;
            const description = checkbox.closest('.grid-item').querySelector('.description').innerText;
            selectedTemptations.push({ name, description });
        }
    });
}

// Функція для відображення обраних спокус на 10 сторінці
function displaySelectedTemptations() {
    const container = document.querySelector('#page10 .details .grid-container');
    container.innerHTML = ''; // Очищаємо контейнер перед додаванням
    selectedTemptations.forEach(temptation => {
        const item = document.createElement('div');
        item.className = 'grid-item';
        item.innerHTML = `
            <p>${temptation.name}</p>
            <div class="description">${temptation.description}</div>
        `;
        container.appendChild(item);
    });
}

const temptations = [
    { name: "Обійми", description: "Дотик душі" },
    { name: "Поцілунки", description: "Мова кохання" },
    { name: "Масаж", description: "Магія рук" },
    { name: "Футплей", description: "Вибирай в якому ритмі відпочивати" },
    { name: "Іграшки", description: "Інструменти радості" },
    { name: "Оральний секс", description: "Ніжність губ" },
    { name: "Домашні відео", description: "Моя власна історія" },
    { name: "Стриптиз", description: "Танець спокуси" },
    { name: "Фантазії", description: "Світ уяви" },
    { name: "Брудні розмови", description: "Слова, що палять" },
    { name: "Інтелект", description: "Розум '–' найкраща прелюдія" },
    { name: "Секстинг", description: "Технології бажання" },
    { name: "Фемдом", description: "Сила у витонченості" },
    { name: "Спанкінг", description: "Удар задоволення" },
    { name: "Домінування", description: "Я – твій господар" },
    { name: "Підпорядкування", description: "Солодкий смак контролю" },
    { name: "Світч", description: "Зміна ролей" },
    { name: "Гік вайс", description: "Чарівні дивацтва" },
    { name: "Куколд", description: "Інший погляд на задоволення" },
    { name: "Ігри з воском", description: "Тепло пристрасті" },
    { name: "Рольові ігри", description: "Втілення фантазій" },
    { name: "Позаду", description: "Таємна позиція" },
    { name: "Еджинг", description: "Мистецтво стриманості" },
    { name: "Всліпу", description: "Темрява відкриває" },
    { name: "Шоколад", description: "Солодка спокуса" },
    { name: "Тату&Пірсинг", description: "Знакове тіло" },
    { name: "Свінг", description: "Обмін емоціями" },
    { name: "Ваніль", description: "Класика у простоті" },
];

const container = document.getElementById('grid-container');

temptations.forEach(temptation => {
    const item = document.createElement('div');
    item.className = 'grid-item';
    item.innerHTML = `
        ${temptation.name}
        <div class="description">${temptation.description}</div>
        <input type="checkbox">
    `;
    container.appendChild(item);
});

const avatarContainer = document.getElementById('avatar-container');
const avatarImg = document.getElementById('avatar');
const contextMenu = document.getElementById('context-menu');
const nameAgeContainer = document.getElementById('name-age-container');
const saveProfileButton = document.getElementById('save-profile');

avatarContainer.addEventListener('click', () => {
    if (!avatarImg.src || avatarImg.src === window.location.href) {
        uploadPhoto();
    } else {
        showPhoto();
    }
});

avatarContainer.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showContextMenu(e.clientX, e.clientY);
});

document.addEventListener('click', (e) => {
    if (!contextMenu.contains(e.target)) {
        contextMenu.style.display = 'none';
    }
});

document.getElementById('change-photo').addEventListener('click', () => {
    contextMenu.style.display = 'none';
    uploadPhoto();
});

document.getElementById('copy-photo').addEventListener('click', () => {
    contextMenu.style.display = 'none';
    copyPhoto();
});

document.getElementById('delete-photo').addEventListener('click', () => {
    contextMenu.style.display = 'none';
    deletePhoto();
});

document.getElementById('change-info').addEventListener('click', () => {
    contextMenu.style.display = 'none';
    document.getElementById('name').style.display = 'block';
    document.getElementById('age').style.display = 'block';
    document.getElementById('name-container').style.display = 'block';
    document.getElementById('age-container').style.display = 'block';
    saveProfileButton.style.display = 'block';
});

saveProfileButton.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    if (name && age) {
        nameAgeContainer.innerHTML = `<p>${name}, ${age}</p>`;
        document.getElementById('name').style.display = 'none';
        document.getElementById('age').style.display = 'none';
        document.getElementById('name-container').style.display = 'none';
        document.getElementById('age-container').style.display = 'none';
        saveProfileButton.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const avatarImg = document.getElementById('avatar');
    const avatarContainer = document.getElementById('avatar-container');
});

function uploadPhoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            avatarImg.src = event.target.result;
            avatarImg.style.display = 'block';
            avatarContainer.querySelector('p').style.display = 'none';
        };
        reader.readAsDataURL(file);
    };
    input.click();
}

function showPhoto() {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';

    overlay.style.zIndex = '1000';

    const img = document.createElement('img');
    img.src = avatarImg.src;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
}

function showContextMenu(x, y) {
    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    contextMenu.style.display = 'block';
}

function copyPhoto() {
    const img = document.createElement('img');
    img.src = avatarImg.src;
    const div = document.createElement('div');
    div.appendChild(img);
    document.body.appendChild(div);

    const range = document.createRange();
    range.selectNode(div);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    try {
        document.execCommand('copy');
        alert('Фото скопійовано!');
    } catch (err) {
        alert('Не вдалося скопіювати фото.');
    }

    window.getSelection().removeAllRanges();
    document.body.removeChild(div);
}

function deletePhoto() {
    avatarImg.src = '';
    avatarImg.style.display = 'none';
    avatarContainer.querySelector('p').style.display = 'block';
}

// Функція, яка показує панель кнопок тільки на 10-й сторінці і далі
function showButtonBar() {
    const currentPageId = document.querySelector('.container').id;
    const buttonBar = document.getElementById('buttonBar');

    if (currentPageId === 'page10' || currentPageId.startsWith('page')) {
        buttonBar.style.display = 'flex'; // Показуємо панель кнопок
    } else {
        buttonBar.style.display = 'none'; // Ховаємо панель кнопок
    }
}

// Оновлена частина для налаштувань
function loadPage(page) {
    const pages = ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8', 'page9', 'page10', 'settingsPage', 'likedYouPage', 'searchPage', 'chatsPage']; // Список всіх сторінок
    pages.forEach(pageId => {
        const pageElement = document.getElementById(pageId);
        if (pageElement) {
            pageElement.style.display = 'none'; // Ховаємо всі сторінки
        }
    });

    const targetPage = document.getElementById(page);
    if (targetPage) {
        targetPage.style.display = 'block'; // Показуємо вибрану сторінку
    }
}


function goToSettings() {
    loadPage('settingsPage');
}

function goToLikedYou() {
    loadPage('likedYouPage');
}

function goToSearch() {
    loadPage('searchPage');
}

function goToChats() {
    loadPage('chatsPage');
}

function goToProfile() {
    loadPage('page10');
}



document.addEventListener('DOMContentLoaded', () => {
    loadPage('page1'); // Завантажуємо початкову сторінку
});

function viewPhoto(photoSrc) {
    alert("View photo: " + photoSrc);
}

function viewProfile(userId) {
    alert("View profile of: " + userId);
}

function toggleStar(button) {
    const card = button.closest('.profile-card');
    const container = card.parentNode;

    if (!card.classList.contains('starred')) {
        container.insertBefore(card, container.children[1]);
        button.classList.add('starred');
    } else {
        const timestamp = parseInt(card.getAttribute('data-timestamp'));
        let inserted = false;

        for (let i = 1; i < container.children.length; i++) {
            const currentCard = container.children[i];
            const currentTimestamp = parseInt(currentCard.getAttribute('data-timestamp'));

            if (currentTimestamp > timestamp) {
                container.insertBefore(card, currentCard);
                inserted = true;
                break;
            }
        }

        if (!inserted) {
            container.appendChild(card);
        }

        button.classList.remove('starred');
    }

    card.classList.toggle('starred');
}

function deleteCard(button) {
    const card = button.closest('.profile-card');
    card.remove();
}
function checkUser(button) {
    button.classList.toggle('checked');
}

function submitProfile() {
    const name = document.getElementById('name-input').value;
    const age = document.getElementById('age-input').value;
    const gender = document.getElementById('gender-select').value;
    const orientation = document.getElementById('orientation-select').value;
    const interested_in = document.getElementById('interested-in-select').value;
    const bio = document.getElementById('bio').value;
    const temptations = Array.from(document.querySelectorAll('input[name="temptations"]:checked')).map(el => el.value);

    const data = {
        name: name,
        age: age,
        gender: gender,
        orientation: orientation,
        interested_in: interested_in,
        bio: bio,
        temptations: temptations
    };

    function changeTheme(theme) {
        const root = document.documentElement;
        switch (theme) {
            case 'black-white':
                root.style.setProperty('--background-color', '#000000');
                root.style.setProperty('--text-color', '#FFFFFF');
                root.style.setProperty('--secondary-color', '#1a1a1a');
                root.style.setProperty('--hover-color', '#333333');
                break;
            case 'dark-gray':
                root.style.setProperty('--background-color', '#2C2C2C');
                root.style.setProperty('--text-color', '#FFFFFF');
                root.style.setProperty('--secondary-color', '#1C1C1C');
                root.style.setProperty('--hover-color', '#3D3D3D');
                break;
            case 'purple-pink':
                root.style.setProperty('--background-color', '#800080');
                root.style.setProperty('--text-color', '#FFFFFF');
                root.style.setProperty('--secondary-color', '#b030b0');
                root.style.setProperty('--hover-color', '#c060c0');
                break;
            case 'blue-lightblue':
                root.style.setProperty('--background-color', '#0000FF');
                root.style.setProperty('--text-color', '#FFFFFF');
                root.style.setProperty('--secondary-color', '#4682B4');
                root.style.setProperty('--hover-color', '#5F9EA0');
                break;
            default:
                // Тема за замовчуванням
                root.style.setProperty('--background-color', '#e6e6fa');
                root.style.setProperty('--text-color', '#000000');
                root.style.setProperty('--secondary-color', '#333333');
                root.style.setProperty('--hover-color', '#555555');
                break;
        }
    
        // Сохранение выбранной темы
        localStorage.setItem('selectedTheme', theme);
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme) {
            changeTheme(savedTheme);
        }
    
        document.querySelectorAll('.theme-circle').forEach(circle => {
            circle.addEventListener('click', () => {
                const selectedTheme = circle.getAttribute('data-theme');
                changeTheme(selectedTheme);
            });
        });
    });
    
    fetch('/submit_profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Redirect to another page or update the UI based on the response
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}



