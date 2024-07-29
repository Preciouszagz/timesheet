document.addEventListener('DOMContentLoaded', () => {
    function disableBtn() {
        const dButton = document.getElementById('enrollBtn');
        dButton.disabled = true;
        dButton.style.background = '#b890f8';
        dButton.style.cursor = 'not-allowed';

        setTimeout(() => {
            dButton.disabled = false;
            dButton.style.background = '';
            dButton.style.cursor = '';
        }, 6000);
    }

    function showToast(message) {
        const toast = document.getElementById('toast');
        const loader = document.getElementById('toastLoader');
        const pleaseWait = document.getElementById('pleaseWait');
        const toastMessage = document.getElementById('toastMessage');
        
        toast.className = 'toast show';
        loader.style.display = 'inline-block';
        pleaseWait.style.display = 'block';
        toastMessage.style.display = 'none';
        toastMessage.textContent = message;

        setTimeout(() => {
            loader.style.display = 'none';
            pleaseWait.style.display = 'none';
            toastMessage.style.display = 'inline-block';

            setTimeout(() => {
                toast.className = toast.className.replace('show', '');
            }, 3000);
        }, 3000);
    }

    const inputFields = document.querySelectorAll('.input-field');

    let hasError = false;

    function resetFieldStyles() {
        inputFields.forEach(field => {
            field.style.borderColor = 'transparent';
            const errorMessage = field.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.style.display = 'none';
            }
        });
    }

    function setFieldError(field, message) {
        field.style.border = '1px solid red';
        hasError = true;
        const errorMessage = field.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }
    }

    function hideErrorMessage(event) {
        const field = event.target.closest('.input-field');
        const errorMessage = field.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.style.display = 'none';
            field.style.borderColor = 'transparent';
        }
    }

    inputFields.forEach(field => {
        const input = field.querySelector('input');
        input.addEventListener('input', hideErrorMessage);
    });

    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', (e) => {
        const field = e.target.closest('.input-field');
        if (!validateEmail(e.target.value)) {
            setFieldError(field, 'Invalid email address!');
        } else {
            const errorMessage = field.querySelector('.error-message');
            errorMessage.style.display = 'none';
            field.style.borderColor = 'transparent';
            hasError = false;
        }
    });

    const passcodeInput = document.getElementById('passcode');
    passcodeInput.addEventListener('input', (e) => {
        const field = e.target.closest('.input-field');
        if (e.target.value.length !== 6) {
            setFieldError(field, 'Passcode must be 6 characters long');
        } else {
            const errorMessage = field.querySelector('.error-message');
            errorMessage.style.display = 'none';
            field.style.borderColor = 'transparent';
            hasError = false;
        }
    });

    document.getElementById('enrollBtn').addEventListener('click', (e) => {
        e.preventDefault();

        hasError = false;

        resetFieldStyles();

        inputFields.forEach(field => {
            const input = field.querySelector('input');
            if (input.value.trim() === '') {
                const errorMessageText = 'Please input this field';
                setFieldError(field, errorMessageText);
            } else if (input.getAttribute('name') === 'email' && !validateEmail(input.value)) {
                setFieldError(field, 'Invalid email address!');
            }
        });

        if (!hasError) {
            const backBtn = document.getElementById('backbtn');

            const formData = {};
            inputFields.forEach(field => {
                const input = field.querySelector('input');
                formData[input.name] = input.value;
            });

            let employees = JSON.parse(localStorage.getItem('enrollmentData')) || [];
            employees.push(formData);
            localStorage.setItem('enrollmentData', JSON.stringify(employees));

            disableBtn();
            showToast('Employee successfully enrolled!');

            setTimeout(() => {
                backBtn.style.display = 'block';
            }, 6000);
        }
    });
});
