document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskText = document.getElementById('newTask').value.trim();
    
    if (taskText) {
        addTask(taskText);
        document.getElementById('newTask').value = ''; // clear the input
        saveTasksToLocalStorage();
    }
});

function addTask(taskText) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.innerHTML = `
        ${taskText}
        <div>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
    `;

    // Delete task
    li.querySelector('.delete').addEventListener('click', function() {
        taskList.removeChild(li);
        saveTasksToLocalStorage();
    });

    // Edit task
    li.querySelector('.edit').addEventListener('click', function() {
        const newText = prompt('Edit task:', taskText);
        if (newText) {
            li.childNodes[0].nodeValue = newText; // update text
            saveTasksToLocalStorage();
        }
    });

    taskList.appendChild(li);
}

function saveTasksToLocalStorage() {
    const tasks = Array.from(document.querySelectorAll('#taskList li')).map(li => li.childNodes[0].nodeValue.trim());
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(task => addTask(task));
}

// Load tasks on page load
loadTasksFromLocalStorage();
