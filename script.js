// Run this code after the page has fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // 1. Select DOM elements
    const addButton = document.getElementById('add-task-btn'); // Add button
    const taskInput = document.getElementById('task-input');   // Input field
    const taskList = document.getElementById('task-list');     // Task list

    // 2. Function to add task
    function addTask() {
        // Get text from input and remove extra spaces
        const taskText = taskInput.value.trim();

        // If input is empty, show alert
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

        // When remove button is clicked → remove this task
        removeBtn.onclick = () => {
            taskList.removeChild(li);
        };

        // Add remove button inside li
        li.appendChild(removeBtn);

        // Add li to the task list
        taskList.appendChild(li);

        // Clear input box
        taskInput.value = "";
    }

    // 3. Add event listener to "Add Task" button
    addButton.addEventListener('click', addTask);

    // 4. Add event listener to allow pressing "Enter" key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

