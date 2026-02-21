// get elements from HTML
const todoInput = document.getElementById('todo-input');
const todoDate = document.getElementById('todo-date');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const clearBtn = document.getElementById('clear-btn');
const filterBtn = document.getElementById('filter-btn');
const filterDropdown = document.getElementById('filter-dropdown');

// store todo's array
let todos = [];

// add button's event listener
addBtn.addEventListener('click', addTodo);

// function to add a new todo item
function addTodo() {
    const text = todoInput.value.trim();
    const date = todoDate.value;

    // basic validation
    if (text === '' || date === '') {
        alert("Please enter a to-do and select a date");
        return;
    }

    // create a new todo object
    const newTodo = {
        id: Date.now(),
        text: text,
        date: date
    };

    // add the new todo
    todos.push(newTodo);

    // re-render list
    renderTodos(todos);

    // reset input
    todoInput.value = '';
    todoDate.value = '';
}

// function to display todo
function renderTodos(todoArray) {
    todoList.innerHTML = '';

    todoArray.forEach(todo => {
        const li = document.createElement('li');

        li.innerHTML = `
            <span>${todo.text} - ${todo.date}</span>
            <button data-id="${todo.id}">Delete</button>
        `;

        // delete event
        li.querySelector('button').addEventListener('click', function() {
            deleteTodo(todo.id);
        });

        todoList.appendChild(li);
    });
}

// function to delete a todo item
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos(todos);
}


// function to clear all todo items
clearBtn.addEventListener('click', function() {
    if (confirm("Are you sure you want to clear all to-dos?")) {
        todos = [];
        renderTodos(todos);
    }
});

// filter button's event listener
filterBtn.addEventListener('click', function() {
    filterDropdown.classList.toggle('hidden');
});

// filter options event listeners
filterDropdown.addEventListener('click', function (e) {
    const type = e.target.dataset.filter;

    if (type) {
        filterTodos(type);
        filterDropdown.classList.add('hidden');
    }
});

// function to filter
function filterTodos(type) {
    const today = new Date().toISOString().split('T')[0];

    if (type === 'all') {
        renderTodos(todos);
    } else if (type === 'today') {
        const filtered = todos.filter(todo => todo.date === today);
        renderTodos(filtered);
    } else if (type === 'upcoming') {
        const filtered = todos.filter(todo => todo.date > today);
        renderTodos(filtered);
    }
}