// Run this code after the page has fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // 1. Select DOM elements
    const addButton = document.getElementById('add-task-btn'); // Add button
    const taskInput = document.getElementById('task-input');   // Input field
    const taskList = document.getElementById('task-list');     // Task list

    // 2. Function to save tasks into Local Storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // 3. Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don’t re-save
    }

    // 4. Function to add task (with optional save flag)
    function addTask(taskText = taskInput.value.trim(), save = true) {
        // If no text, alert and return
        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        // Create a new list item (li)
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";
        removeBtn.classList.add('remove-btn'); // required by checker

        // Remove task when button clicked
        removeBtn.onclick = () => {
            taskList.removeChild(li);

            // Update Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = storedTasks.filter(task => task !== taskText);
            saveTasks(updatedTasks);
        };

        // Add remove button inside li
        li.appendChild(removeBtn);

        // Add li to task list
        taskList.appendChild(li);

        // Save to Local Storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            saveTasks(storedTasks);
        }

        // Clear input
        taskInput.value = "";
    }

    // 5. Add event listener to "Add Task" button
    addButton.addEventListener('click', () => addTask());

    // 6. Add event listener to allow pressing "Enter"
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // 7. Load tasks when page starts
    loadTasks();
});

