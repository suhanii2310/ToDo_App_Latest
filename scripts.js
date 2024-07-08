function showLogin() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function showSignup() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (email && password) {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-page').style.display = 'block';
        document.getElementById('assigned-by').value = username;
        showHome();
    } else {
        alert('Invalid username or password');
    }
}

function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (email && password && confirmPassword) {
        if (password === confirmPassword) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            alert('Signup successful! Please login.');
            showLogin();
        } else {
            alert('Passwords do not match');
        }
    } else {
        alert('Please fill out all fields');
    }
}

function logout() {
    document.getElementById('main-page').style.display = 'none';
    document.getElementById('login-page').style.display = 'block';
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
}

function showHome() {
    document.getElementById('home').style.display = 'block';
    document.getElementById('form').style.display = 'none';
    document.getElementById('page-title').innerText = 'Home';
}

function showForm() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('form').style.display = 'block';
    resetForm();
    document.getElementById('page-title').innerText = 'Form';
}

function resetForm() {
    const assignedByValue = document.getElementById('assigned-by').value;
    document.getElementById('task-form').reset();
    document.getElementById('assigned-by').value = assignedByValue;
    clearErrors();
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function validateDate(date) {
    const now = new Date();
    const inputDate = new Date(date + 'T00:00:00');
    return inputDate <= new Date(now.setHours(0, 0, 0, 0));
}

function validateTime(date, time) {
    const now = new Date();
    const inputDateTime = new Date(date + 'T' + time);
    return inputDateTime <= now;
}

function showError(element, message) {
    element.classList.add('error');
    const errorMessage = element.parentNode.querySelector('.error-message');
    if (!errorMessage) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerText = message;
        element.parentNode.appendChild(errorDiv);
    }
}

function clearError(element) {
    element.classList.remove('error');
    const errorMessage = element.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(e => e.remove());
    document.querySelectorAll('input, select, textarea').forEach(e => e.classList.remove('error'));
}

function realTimeValidation(element, validateFunction, errorMessage) {
    element.addEventListener('input', function () {
        if (validateFunction(this.value)) {
            clearError(this);
        } else {
            showError(this, errorMessage);
        }
    });
}

function submitForm() {
    const assignedBy = document.getElementById('assigned-by').value;
    const assignedTo = document.getElementById('assigned-to');
    const title = document.getElementById('title');
    const start_date = document.getElementById('start_date');
    const time = document.getElementById('time');
    const hrs = document.getElementById('hrs');
    const email = document.getElementById('email');
    const description = document.getElementById('description');

    let isValid = true;

    clearErrors();

    if (assignedTo.value === "") {
        isValid = false;
        showError(assignedTo, "Please fill out this field");
    }

    if (title.value === "") {
        isValid = false;
        showError(title, "Please fill out this field");
    }

    if (start_date.value === "") {
        isValid = false;
        showError(start_date, "Please fill out this field");
    } else if (!validateDate(start_date.value)) {
        isValid = false;
        showError(start_date, 'A valid date is required');
    }

    if (time.value === "") {
        isValid = false;
        showError(time, "Please fill out this field");
    } else if (!validateTime(start_date.value, time.value)) {
        isValid = false;
        showError(time, 'A valid time is required');
    }

    if (hrs.value === "") {
        isValid = false;
        showError(hrs, "Please fill out this field");
    }

    if (email.value === "") {
        isValid = false;
        showError(email, "Please fill out this field");
    } else if (!validateEmail(email.value)) {
        isValid = false;
        showError(email, 'A valid email address is required');
    }

    if (description.value === "") {
        isValid = false;
        showError(description, "Please fill out this field");
    }

    if (isValid) {
        const grid = document.getElementById('grid');
        const taskDiv = document.createElement('div');
        taskDiv.innerHTML = `<strong>Assigned by:</strong> ${assignedBy}<br>
                             <strong>Assigned to:</strong> ${assignedTo.value}<br>
                             <strong>Title:</strong> ${title.value}<br>
                             <strong>Start Date:</strong> ${start_date.value}<br>
                             <strong>Start Time:</strong> ${time.value}<br>
                             <strong>Hours to Complete:</strong> ${hrs.value}<br>
                             <strong>Email:</strong> ${email.value}<br>
                             <strong>Description:</strong> ${description.value}`;
        grid.appendChild(taskDiv);

        showHome();
    }
}

realTimeValidation(document.getElementById('assigned-to'), value => value !== "", "Please fill out this field");
realTimeValidation(document.getElementById('title'), value => value !== "", "Please fill out this field");
realTimeValidation(document.getElementById('start_date'), validateDate, "A valid date is required");
realTimeValidation(document.getElementById('time'), value => validateTime(document.getElementById('start_date').value, value), "A valid time is required");
realTimeValidation(document.getElementById('hrs'), value => value !== "", "Please fill out this field");
realTimeValidation(document.getElementById('email'), validateEmail, "A valid email address is required");
realTimeValidation(document.getElementById('description'), value => value !== "", "Please fill out this field");

document.getElementById('start_date').addEventListener('input', function () {
    if (validateDate(this.value)) {
        clearError(this);
    } else {
        showError(this, "A valid date is required");
    }
});

document.getElementById('time').addEventListener('input', function () {
    if (validateTime(document.getElementById('start_date').value, this.value)) {
        clearError(this);
    } else {
        showError(this, "A valid time is required");
    }
});

