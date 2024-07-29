document.addEventListener('DOMContentLoaded', function() {

    // Function to disable and re-enable button
    function disableBtn() {
        const dButton = document.getElementById('generateBtn');
        
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
        field.style.border = '1px solid transparent';
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
    const passwordInput = document.getElementById('passcode');
    passwordInput.addEventListener('input', (e) => {
        const field = e.target.closest('.input-field');
        if (e.target.value.length < 8) {
            setFieldError(field, 'Passcode cannot be less than 8 characters');
        } else {
            const errorMessage = field.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.style.display = 'none';
            }
            field.style.borderColor = 'transparent';
        }
    });

    // Actions and functions when generate button is clicked
    document.getElementById('generateBtn').addEventListener('click', function() {
        // Get the elements
        const manager = document.getElementById('manager');
        const passcode = document.getElementById('passcode');
        const error = document.querySelector('.error');

        let hasError = false;

        // Reset all field styles
        function resetFieldStyles() {
            resetBorderColor(manager);
            resetBorderColor(passcode);
            const errorMessage = passcode.closest('.input-field').querySelector('.error-message');
            if (errorMessage) {
                errorMessage.style.display = 'none';
            }
        }

        resetFieldStyles();

        if (manager.value === 'default') {
            setBorderColor(manager);
            hasError = true;
        }
        if (passcode.value === '') {
            setBorderColor(passcode);
            hasError = true;
        } else if (passcode.value.length < 8) {
            setFieldError(passcode.closest('.input-field'), 'Passcode cannot be less than 8 characters');
            hasError = true;
        }

        if (hasError) {
            error.style.display = 'block';
        } else {
            const backBtn = document.getElementById('backbtn');

            disableBtn();
            showToast('Stand-up Code Generated');

            // Timer to display Back button
            setTimeout(() => {
                backBtn.style.display = 'block'
            }, 6000);

            error.style.display = 'none';
        }
    });

    document.getElementById('backbtn').addEventListener('click', () =>{
        window.history.back();
    })
});
