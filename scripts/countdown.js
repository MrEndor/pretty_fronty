const countdownContainer = document.createElement('div');
countdownContainer.className = 'countdown-container';
countdownContainer.innerHTML = `
<p class="countdown-text">Time until graduation: <span id="countdown-timer"></span></p>
`;
document.body.appendChild(countdownContainer);

const graduationDate = new Date('2028-06-30T00:00:00');

function UpdateCountdown() {
    const now = new Date();
    const diff = graduationDate - now;

    if (diff <= 0) {
        document.getElementById('countdown-timer').textContent = 'Congratulations!';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countdown-timer').textContent =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

UpdateCountdown();
setInterval(UpdateCountdown, 1000);