const galleryImages = document.querySelectorAll('.news_image');
const galleryPopup = document.querySelector('.gallery_popup');
const popupImage = document.querySelector('.popup_image');
const closeBtn = document.querySelector('.close_btn');
const prevBtn = document.querySelector('.prev_btn');
const nextBtn = document.querySelector('.next_btn');
const imageCounter = document.querySelector('.popup_image_counter');

const imageUrls = Array.from(galleryImages).map(img => img.src);

galleryImages.forEach((img, index) => {
    img.addEventListener('click', function () {
        window.currentIndex = index;
        UpdatePopupImage();
        galleryPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeBtn.addEventListener('click', function () {
    galleryPopup.classList.remove('active');
    document.body.style.overflow = '';
});

galleryPopup.addEventListener('click', function (e) {
    if (e.target === this) {
        galleryPopup.classList.remove('active');
        document.body.style.overflow = '';
    }
});

prevBtn.addEventListener('click', ShowPrevImage);
nextBtn.addEventListener('click', ShowNextImage);

document.addEventListener('keydown', function (event) {
    if (!galleryPopup.classList.contains('active')) return;

    if (event.key === 'Escape') {
        galleryPopup.classList.remove('active');
        document.body.style.overflow = '';
    } else if (event.key === 'ArrowLeft') {
        ShowPrevImage();
    } else if (event.key === 'ArrowRight') {
        ShowNextImage();
    }
});

function UpdatePopupImage() {
    popupImage.src = imageUrls[window.currentIndex];
    popupImage.alt = galleryImages[window.currentIndex].alt;

    imageCounter.textContent = `${window.currentIndex + 1}/${imageUrls.length}`;

    prevBtn.disabled = window.currentIndex === 0;
    nextBtn.disabled = window.currentIndex === imageUrls.length - 1;
}

function ShowPrevImage() {
    if (window.currentIndex > 0) {
        window.currentIndex--;
        UpdatePopupImage();
    }
}

function ShowNextImage() {
    if (window.currentIndex < imageUrls.length - 1) {
        window.currentIndex++;
        UpdatePopupImage();
    }
}
