document.addEventListener('DOMContentLoaded', function() {
    const markBtn = document.getElementById('markBtn');
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
    const error = document.querySelector('.error');

     // Function to disable and re-enable button
     function disableBtn() {
        const dButton = document.getElementById('markBtn');
        
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
        // disableBtn();
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

    // Function to reset the border color and hide error message
    function resetBorderColor(inputElement) {
        inputElement.style.borderColor = 'transparent';
        inputElement.style.borderWidth = '';
    }

    // Function to set the border color and show error message
    function setBorderColor(inputElement) {
        inputElement.style.borderColor = 'red';
        inputElement.style.borderWidth = '1px';
        inputElement.style.borderStyle = 'solid';
        error.style.display = 'block';
    }

    // Reset all field styles
    function resetFieldStyles() {
        inputs.forEach(input => resetBorderColor(input));
    }

    // Add input event listener to hide error message and reset border color
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            resetBorderColor(input);
        });
    });


    //Actions and events when submit button  is clicked
    markBtn.addEventListener('click', function(event) {
        // Prevent default form submission
        event.preventDefault();

        // Initialize a flag to track if there are any errors
        let hasError = false;

        resetFieldStyles();

        // Validate input fields
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                setBorderColor(input);
                hasError = true;
            }
        });

        // If no errors, proceed with form submission
        if (!hasError) {
            const backBtn = document.getElementById('backbtn');

            disableBtn();
            showToast('Stand-up attendance successfully marked.');

            //Timer to display Back button
            setTimeout(() => {
                backBtn.style.display = 'block'
            },6000);
            error.style.display = 'none';
        }
    });

    //Event listener for Back-button
    document.getElementById('backbtn').addEventListener('click', () =>{
        window.history.back();
    })
});
