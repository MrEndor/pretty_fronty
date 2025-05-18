function FixHeader() {
    const header = document.getElementById('menu_block');
    const firstScreenSize = window.innerHeight;

    if (window.scrollY > firstScreenSize) {
        header.classList.add('fix');
    } else {
        header.classList.remove('fix');
    }
}

window.addEventListener('scroll', FixHeader);