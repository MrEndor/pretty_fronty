const NOTIFICATION_COUNTDOWN = 24 * 60 * 60 * 1000;
const NOTIFICATION_COOKIE = 'notification_shown';


function SetCookie(name, value, ttl) {
    const date = new Date();
    date.setTime(date.getTime() + ttl);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
}

function GetCookie(name) {
    const row_name = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(row_name) === 0) {
            return cookie.substring(row_name.length, cookie.length);
        }
    }
    return null;
}

function showNotification() {
    const notification = document.createElement('div');
    notification.className = 'notification-popup';
    notification.innerHTML = `
    <p class="notification-text">Like what you see? Feel free to contact me!</p>
    <button class="notification-close">&times;</button>
`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('active');
        SetCookie(NOTIFICATION_COOKIE, 'true', NOTIFICATION_COUNTDOWN);
    }, 30_000);

    const notificationClose = notification.querySelector('.notification-close');
    notificationClose.addEventListener('click', function () {
        notification.classList.remove('active');
    });

}

if (!GetCookie(NOTIFICATION_COOKIE)) {
    showNotification();
}
