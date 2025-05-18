const gearContainer = document.createElement('div')
gearContainer.className = 'gears-container';
gearContainer.innerHTML = `
<svg class="gears-svg" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
    <path class="gear gear-outer" d="M300,100c110.5,0,200,89.5,200,200s-89.5,200-200,200S100,410.5,100,300S189.5,100,300,100z M300,130c-93.9,0-170,76.1-170,170s76.1,170,170,170s170-76.1,170-170S393.9,130,300,130z M300,160c77.3,0,140,62.7,140,140s-62.7,140-140,140S160,377.3,160,300S222.7,160,300,160z" fill="#ff214f"/>
    <path class="gear gear-inner" d="m299.81 343.84c22.582-0.28673 42.621 15.918 46.432 38.833 4.205 25.286-12.949 49.211-38.283 53.408-25.334 4.1968-49.299-12.932-53.504-38.218-4.205-25.286 12.949-49.21 38.283-53.407 2.3751-0.39345 4.7364-0.58552 7.0724-0.61493z" fill="#ff6464" transform="translate(-50,-50)"/>
</svg>
`

document.body.appendChild(gearContainer)

const outerGear = document.querySelector('.gear-outer');
const innerGear = document.querySelector('.gear-inner');

let scrollPosition = 0;
let rotationSpeed = 0;
const maxSpeed = 0.5;

function AnimateGears() {
    const currentRotation = parseFloat(outerGear.style.transform.replace('rotate(', '').replace('deg)', '')) || 0;
    outerGear.style.transform = `rotate(${currentRotation + rotationSpeed}deg)`;
    innerGear.style.transform = `rotate(${-currentRotation * 0.7}deg) translate(50px, 50px)`;

    if (rotationSpeed > 0.1) {
        rotationSpeed *= 0.98;
    } else if (rotationSpeed < -0.1) {
        rotationSpeed *= 0.98;
    } else {
        rotationSpeed = 0;
    }

    requestAnimationFrame(AnimateGears);
}

window.addEventListener('scroll', () => {
    const newScrollPosition = window.scrollY;
    const scrollDelta = newScrollPosition - scrollPosition;

    if (Math.abs(scrollDelta) > 5) {
        rotationSpeed = Math.min(Math.max(rotationSpeed + scrollDelta * 0.01, maxSpeed), -maxSpeed);
    }

    scrollPosition = newScrollPosition;
});

AnimateGears();

