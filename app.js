// Ambil data dari LocalStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const themeToggle = document.getElementById('theme-toggle');
const filterBtns = document.querySelectorAll('.filter-btn');

// Fungsi Render Tasks
function renderTasks(filter = 'all') {
    taskList.innerHTML = '';

    const filtered = tasks.filter(t => {
        if (filter === 'active') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
    });

    filtered.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleTask(${index})">✔️</button>
                <button onclick="deleteTask(${index})">🗑️</button>
            </div>
        `;
        taskList.appendChild(li);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Tambah Task
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    tasks.push({ text: taskInput.value, completed: false });
    taskInput.value = '';
    renderTasks();
});

// Hapus & Toggle (Global agar terbaca dari HTML onclick)
window.deleteTask = (i) => {
    tasks.splice(i, 1);
    renderTasks();
};

window.toggleTask = (i) => {
    tasks[i].completed = !tasks[i].completed;
    renderTasks();
};

// Filter
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        renderTasks(btn.dataset.filter);
    });
});

// Dark Mode
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
});

// Jalankan saat start
renderTasks();