const slider = document.querySelector('.photo-slider');
const slides = document.querySelectorAll('.photo-slide');
let currentSlide = 0;

function goToSlide(index) {
    currentSlide = index;
    slider.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    if (currentSlide < slides.length - 1) {
        goToSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
}

document.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        nextSlide();
    } else {
        prevSlide();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    }
});

// Touch event for mobile devices
let startX = 0;
document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.addEventListener('touchmove', (e) => {
    const moveX = e.touches[0].clientX;
    const diff = startX - moveX;

    if (diff > 50) {
        nextSlide();
        startX = moveX;
    } else if (diff < -50) {
        prevSlide();
        startX = moveX;
    }
});

goToSlide(currentSlide); // Ініціалізуємо перший слайд
