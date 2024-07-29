document.addEventListener('DOMContentLoaded', function() {

    // Function to disable and re-enable button
    function disableBtn() {
        const dButton = document.getElementById('loginBtn');
        
        // Disable button
        dButton.disabled = true;
        dButton.style.background = '#b890f8';
        dButton.style.cursor = 'not-allowed';

        // Re-enable button
        setTimeout(() => {
            dButton.disabled = false;
            dButton.style.background = '';
            dButton.style.cursor = '';
        }, 6000);
    }

    // Show toast notification
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

        // Timer to hide loader and loading message after 3 seconds of display
        setTimeout(() => {
            loader.style.display = 'none';
            pleaseWait.style.display = 'none';
            toastMessage.style.display = 'inline-block';

            // Timer to hide toast message after 3 seconds of display
            setTimeout(() => {
                toast.className = toast.className.replace('show', '');
            }, 3000);
        }, 3000);
    }

    // Function to reset the border color
    function resetBorderColor(selectElement) {
        selectElement.style.borderColor = 'transparent';
        selectElement.style.borderWidth = '';
    }

    // Set border color to indicate error
    function setBorderColor(selectElement) {
        selectElement.style.borderColor = 'red';
        selectElement.style.borderWidth = '1px';
        selectElement.style.borderStyle = 'solid';
    }

    // Set field error and display message
    function setFieldError(field, message) {
        field.style.border = '1px solid red';
        const errorMessage = field.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            errorMessage.style.color = 'red';
            errorMessage.style.marginTop = '5px';
        }
    }

    // Hide error message when the user starts typing
    function hideErrorMessage(event) {
        const field = event.target.closest('.input-field');
        const errorMessage = field.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.style.display = 'none';
            field.style.borderColor = 'transparent';
        }
    }

    // Event listener for password length validation in real-time
    const passwordInput = document.getElementById('password');
    passwordInput.addEventListener('input', (e) => {
        const field = e.target.closest('.input-field');
        if (e.target.value.length !== 6) {
            setFieldError(field, 'Passcode must be 6 characters long');
        } else {
            const errorMessage = field.querySelector('.error-message');
            errorMessage.style.display = 'none';
            field.style.borderColor = 'transparent';
        }
    });

    // Actions and functions when login button is clicked
    document.getElementById('loginBtn').addEventListener('click', function() {
        // Get the elements
        const manager = document.getElementById('manager');
        const password = document.getElementById('password');
        const error = document.querySelector('.error');

        let hasError = false;

        // Reset all field styles
        function resetFieldStyles() {
            resetBorderColor(manager);
            resetBorderColor(password);
            const errorMessage = password.closest('.input-field').querySelector('.error-message');
            if (errorMessage) {
                errorMessage.style.display = 'none';
            }
        }

        resetFieldStyles();

        if (manager.value === 'default') {
            setBorderColor(manager);
            hasError = true;
        }
        if (password.value === '') {
            setBorderColor(password);
            hasError = true;
        } else if (password.value.length !== 6) {
            setFieldError(password.closest('.input-field'), 'Passcode must be 6 characters long');
            hasError = true;
        }

        if (hasError) {
            error.style.display = 'block';
        } else {
            const storedData = JSON.parse(localStorage.getItem('enrollmentData')) || [];

            // Check if the entered details match any entry in the local storage
            const isAuthenticated = storedData.some(employee => 
                employee['name'] === manager.value && employee['password'] === password.value
            );

            if (isAuthenticated) {
                disableBtn();
                showToast('Login successful');
                error.style.display = 'none';

                // Redirect to another page or perform another action
                setTimeout(() => {
                    window.location.href = 'role.html'; // Change this to your target page
                }, 6000);

            } else {
                setFieldError(manager.closest('.input-field'), 'Invalid credentials');
                setFieldError(password.closest('.input-field'), 'Invalid credentials');
                error.style.display = 'block';
            }
        }
    });
});
