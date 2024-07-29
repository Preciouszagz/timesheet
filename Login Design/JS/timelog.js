document.addEventListener('DOMContentLoaded', function() {
    const timelogBtn = document.getElementById('timelogBtn');
    const clockType = document.getElementById('time');
    const manager = document.getElementById('manager');
    const project = document.getElementById('project');
    const error = document.querySelector('.error');
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
    const selects = [clockType, manager, project];

    let hasError = false;

    // Function to reset the border color and hide the error message
    function resetBorderColor(element) {
        element.style.borderColor = 'transparent';
        element.style.borderWidth = '';
        // error.style.display = 'none';
    }

    function setBorderColor(element) {
        element.style.borderColor = 'red';
        element.style.borderWidth = '1px';
        element.style.borderStyle = 'solid';
        hasError = true;
        error.style.display = 'block';
    }

    // Reset all field styles
    function resetFieldStyles() {
        selects.forEach(select => resetBorderColor(select));
        inputs.forEach(input => resetBorderColor(input));
    }

    // Add input event listener to hide error message and reset border color
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            resetBorderColor(input);
        });
    });

    // Add change event listener to hide error message and reset border color for select fields
    selects.forEach(select => {
        select.addEventListener('change', function() {
            if (select.value !== 'default') {
                resetBorderColor(select);
            }
        });
    });

    // Function to disable and re-enable button
    function disableBtn() {
        const dButton = document.getElementById('timelogBtn');
        
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


    //Actions and functions when submit button is clicked
    timelogBtn.addEventListener('click', function(event) {
        // Prevent default form submission
        event.preventDefault();

        hasError = false;
        resetFieldStyles();

        // Validate select elements
        if (clockType.value === 'default') {
            setBorderColor(clockType);
        }
        if (manager.value === 'default') {
            setBorderColor(manager);
        }
        if (project.value === 'default') {
            setBorderColor(project);
        }

        // Validate input elements
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                setBorderColor(input);
            }
        });

        // If no errors, proceed with form submission
        if (!hasError) {
            const error = document.querySelector('.error');
            const backBtn = document.getElementById('backbtn');

            disableBtn();
            showToast('Time log submitted');

            //Timer to display Back button
            setTimeout(() => {
                backBtn.style.display = 'block'
            },6000);
            error.style.display = 'none';
        }
    });

    document.getElementById('backbtn').addEventListener('click', function() {
        window.history.back();
    });

});

