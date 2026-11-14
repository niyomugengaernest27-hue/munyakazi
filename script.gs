
window.onload = function() {
    const savedNote = localStorage.getItem('munyakazi_note');
    if (savedNote) {
        document.getElementById('noteArea').value = savedNote;
    }
    renderTasks();
};

// Task Management
let tasks = JSON.parse(localStorage.getItem('munyakazi_tasks')) || [];

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">Done</button>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();

    if (taskText !== '') {
        tasks.push(taskText);
        localStorage.setItem('munyakazi_tasks', JSON.stringify(tasks));
        input.value = '';
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('munyakazi_tasks', JSON.stringify(tasks));
    renderTasks();
}

// Note Management
function saveNote() {
    const noteText = document.getElementById('noteArea').value;
    localStorage.setItem('munyakazi_note', noteText);
    
    const status = document.getElementById('statusMsg');
    status.textContent = 'Note saved to Munyakazi Work Space!';
    setTimeout(() => { status.textContent = ''; }, 3000);
}
