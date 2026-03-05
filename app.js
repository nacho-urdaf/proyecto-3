document.addEventListener("DOMContentLoaded", () => {



  function getPriorityEmoji(priority) {
    if (priority === "Alta") return "🔴";
    if (priority === "Media") return "🟡";
    if (priority === "Baja") return "🟢";
}

    const modal = document.getElementById("taskModal");
    const openModalBtn = document.getElementById("openModal");
    const closeModalBtn = document.getElementById("closeModal");
    const form = document.querySelector("form");
    const searchInput = document.querySelector(".search");

    let editingTaskId = null;

    /* ==============================
       MODAL
    ============================== */

    openModalBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
        form.reset();
        editingTaskId = null;
    });

    /* ==============================
       CARGAR TAREAS AL INICIO
    ============================== */
    //kdmaskdsamka
    //kwfwekfnw
    //jnfdsj
    /*  */
    

    loadTasks();

    /* ==============================
       GUARDAR / EDITAR TAREA
    ============================== */

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const tasks = getTasks();

        const taskData = {
            id: editingTaskId ? editingTaskId : Date.now(),
            title: form.querySelector("input[type='text']").value,
            description: form.querySelector("textarea").value,
            date: form.querySelector("input[type='date']").value,
            priority: form.querySelector("select").value
        };

        if (editingTaskId) {
            const index = tasks.findIndex(t => t.id === editingTaskId);
            tasks[index] = taskData;
            editingTaskId = null;
        } else {
            tasks.push(taskData);
        }

        saveTasks(tasks);
        renderAllTasks();

        form.reset();
        modal.style.display = "none";
    });

    /* ==============================
       BUSCADOR
    ============================== */

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const allCards = document.querySelectorAll(".task-card");

        allCards.forEach(card => {
            const text = card.innerText.toLowerCase();
            card.style.display = text.includes(searchTerm) ? "block" : "none";
        });
    });

    /* ==============================
       FUNCIONES
    ============================== */

    function getTasks() {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    }

    function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        renderAllTasks();
    }

    function renderAllTasks() {
        // Limpiar todas las columnas
        document.querySelectorAll(".task-list").forEach(column => {
            column.innerHTML = "";
        });

        const tasks = getTasks();
        tasks.forEach(task => createTaskCard(task));
    }

    function createTaskCard(task) {
        const card = document.createElement("div");
        card.classList.add("task-card");

        card.innerHTML = `
    <div class="card-header">
        <span class="badge ${task.priority}">
            ${getPriorityEmoji(task.priority)} ${task.priority}
        </span>
        <button class="complete-btn">✔</button>
    </div>

    <h3 class="${task.completed ? 'completed' : ''}">
        ${task.title}
    </h3>

    <p>${task.description}</p>
    <p><strong>Fecha:</strong> ${task.date || "Sin fecha"}</p>

    <div class="card-buttons">
        <button class="edit-btn">Editar</button>
        <button class="delete-btn">Eliminar</button>
    </div>
`;

        /* ===== EDITAR ===== */
        card.querySelector(".edit-btn").addEventListener("click", () => {
            modal.style.display = "flex";

            form.querySelector("input[type='text']").value = task.title;
            form.querySelector("textarea").value = task.description;
            form.querySelector("input[type='date']").value = task.date;
            form.querySelector("select").value = task.priority;

            editingTaskId = task.id;
        });

        /* ===== ELIMINAR ===== */
        card.querySelector(".delete-btn").addEventListener("click", () => {
            const tasks = getTasks().filter(t => t.id !== task.id);
            saveTasks(tasks);
            renderAllTasks();
        });
        card.querySelector(".complete-btn").addEventListener("click", () => {
    const tasks = getTasks();
    const index = tasks.findIndex(t => t.id === task.id);

    tasks[index].completed = !tasks[index].completed;

    saveTasks(tasks);
    renderAllTasks();
    updateCounters();
    function updateCounters() {
    document.querySelectorAll(".column").forEach(column => {
        const count = column.querySelectorAll(".task-card").length;
        const title = column.querySelector("h3");

        const baseText = column.id;
        title.textContent = `${baseText} (${count})`;
    });
}
});

        /* ===== ENVIAR A SU COLUMNA ===== */
        const column = document.querySelector(`#${task.priority} .task-list`);
        if (column) {
            column.appendChild(card);
        }
    }

});