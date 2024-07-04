function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-page').style.display = 'block';
        document.getElementById('assigned-by').value = username;
        showHome();
    } else {
        alert('Please enter both username and password');
    }
}

function logout() {
    document.getElementById('main-page').style.display = 'none';
    document.getElementById('login-page').style.display = 'block';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
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
}

function submitForm() {
    const assignedBy = document.getElementById('assigned-by').value;
    const assignedTo = document.getElementById('assigned-to').value;
    const title = document.getElementById('title').value;
    const start_date = document.getElementById('start_date').value;
    const time = document.getElementById('time').value;
    const hrs = document.getElementById('hrs').value;
    const email = document.getElementById('email').value;
    const description = document.getElementById('description').value;

    if (assignedTo && title && start_date && time && hrs && email && description) {
        const grid = document.getElementById('grid');
        const taskDiv = document.createElement('div');
        taskDiv.innerHTML = `<strong>Assigned by:</strong> ${assignedBy}<br>
                             <strong>Assigned to:</strong> ${assignedTo}<br>
                             <strong>Title:</strong> ${title}<br>
                             <strong>Start Date:</strong> ${start_date}<br>
                             <strong>Start Time:</strong> ${time}<br>
                             <strong>Hours to Complete:</strong> ${hrs}<br>
                             <strong>Email:</strong> ${email}<br>
                             <strong>Description:</strong> ${description}`;
        grid.appendChild(taskDiv);

        showHome();
    } else {
        alert('Please fill out all fields');
    }
}


