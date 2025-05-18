const feedbackPopup = document.createElement('div');
feedbackPopup.className = 'popup-overlay';
feedbackPopup.innerHTML = `
<div class="popup-content">
    <button class="popup-close">&times;</button>
    <h2>Contact Me</h2>
    <form class="form" method="post" id="popup-contact" novalidate>
        <div class="input_container">
            <div class="input_row">
                <div class="input_label">
                    <label class="input_naming" for="popup-first_name">Name</label>
                    <input class="input_field" type="text" id="popup-first_name" name="first_name"
                           placeholder="Enter your first name">
                </div>
                <div class="input_label">
                    <label class="input_naming" for="popup-email">Email</label>
                    <input class="input_field" type="email" id="popup-email" name="email"
                           placeholder="Enter your email">
                </div>
            </div>
            <div class="input_row">
                <div class="input_label input_message">
                    <label class="input_naming" for="popup-message">Message</label>
                    <textarea class="input_field" id="popup-message" name="message"
                              placeholder="Enter your message"></textarea>
                </div>
            </div>
        </div>
        <div class="submit_container base_container">
            <button class="submit_button" type="submit">Submit</button>
        </div>
    </form novalidate onSubmit>
</div>
`;
document.body.appendChild(feedbackPopup);

function ShowError(input, message) {
    const oldError = input.nextElementSibling;
    if (oldError && oldError.classList.contains('error-message')) {
        oldError.remove();
    }

    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    input.parentNode.insertBefore(errorElement, input.nextSibling);
    input.classList.add('error');
    errorElement.style.display = 'block';
}

function IsValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function ValidateForm(form) {
    let isValid = true;
    const errors = form.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());

    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector('textarea');
    const name = form.querySelector('input[type="text"]');

    let currentRegex = '';
    const russianSymbols = /^[а-яА-ЯЁё]*$/;
    const englishSymbols = /^[a-zA-Z]*$/;

    if (russianSymbols.test(name.value) || russianSymbols.test(message.value)) {
        currentRegex = russianSymbols;
    } else if (englishSymbols.test(name.value) || englishSymbols.test(message.value)) {
        currentRegex = englishSymbols;
    } else {
        ShowError(message, 'Only English or Russian characters allowed');
        ShowError(name, 'Only English or Russian characters allowed');
        isValid = false;
    }

    if (name && name.value.trim() === '') {
        ShowError(name, 'Please enter your name');
        isValid = false;
    } else if (!currentRegex.test(name.value)) {
        ShowError(name, 'Only English or Russian characters allowed');
        isValid = false;
    }

    if (!IsValidEmail(email.value)) {
        ShowError(email, 'Please enter a valid email');
        isValid = false;
    }

    if (message && message.value.trim() === '') {
       ShowError(message, 'Please enter your message');
    } else if (!currentRegex.test(message.value)) {
        ShowError(message, 'Only English or Russian characters allowed');
        isValid = false;
    } else if (message.value.length < 15) {
        ShowError(message, 'Message must be at least 15 characters');
        isValid = false;
    }

    return isValid;
}

function HandleFormSubmit(form, submitButton) {
    if (!ValidateForm(form)) {
        return;
    }
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    fetch('https://example.com', {
        method: 'POST',
        body: new FormData(form)
    })
        .then(response => {
            if (response.ok) {
                submitButton.textContent = 'Successfully Sent!';
                submitButton.classList.add('success');
                setTimeout(() => {
                    form.reset();
                    submitButton.textContent = 'Submit';
                    submitButton.disabled = false;
                    submitButton.classList.remove('success');
                }, 2000);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            submitButton.textContent = 'Error, Try Again';
            setTimeout(() => {
                submitButton.textContent = 'Submit';
                submitButton.disabled = false;
            }, 2000);
        });
}

const contactLinks = document.querySelectorAll('.header_link');
const popupClose = feedbackPopup.querySelector('.popup-close');

contactLinks.forEach(link => {
    link.addEventListener('click', function () {
        if (this.textContent.trim().toLowerCase() === 'contact') {
            feedbackPopup.classList.add('active');
        }
    });
});

popupClose.addEventListener('click', function () {
    feedbackPopup.classList.remove('active');
});

feedbackPopup.addEventListener('click', function (event) {
    if (event.target === this) {
        feedbackPopup.classList.remove('active');
    }
});

const popupForm = document.getElementById('popup-contact');

popupForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const submitButton = this.querySelector('.submit_button');
    HandleFormSubmit(this, submitButton);
});
