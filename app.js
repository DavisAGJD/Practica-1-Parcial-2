let tareas = [];

function guardarInformacion() {
    const tareaname = document.getElementById('tareaname').value;
    const fechainicio = document.getElementById('fechainicio').value;
    const fechafin = document.getElementById('fechafin').value;
    const responsable = document.getElementById('responsable').value;

    if (new Date(fechafin) < new Date(fechainicio)) {
        alert('La fecha de fin no puede ser menor a la fecha de inicio.');
        return;
    }

    const task = {
        nombre: tareaname,
        inicio: fechainicio,
        fin: fechafin,
        responsable: responsable,
        estado: 'pendiente'
    };

    tareas.push(task);
    agregarTarea(task);
    document.getElementById('task-form').reset();
}

function agregarTarea(task) {
    const taskList = document.getElementById('task-list');

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task', 'task-white'); 

    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task-info');
    taskInfo.innerHTML = `${task.nombre} (Inicio: ${task.inicio}, Fin: ${task.fin}, Responsable: ${task.responsable})`;

    const resolverButton = document.createElement('button');
    resolverButton.classList.add('btn', 'btn-success');
    resolverButton.innerText = 'Resolver';
    resolverButton.onclick = () => resolverTarea(taskDiv, desmarcarButton, task);

    const desmarcarButton = document.createElement('button');
    desmarcarButton.classList.add('btn', 'btn-warning');
    desmarcarButton.innerText = 'Desmarcar';
    desmarcarButton.onclick = () => desmarcarTarea(taskDiv, desmarcarButton, resolverButton, task);

    const eliminarButton = document.createElement('button');
    eliminarButton.classList.add('btn', 'btn-danger');
    eliminarButton.innerText = 'Eliminar';
    eliminarButton.onclick = () => eliminarTarea(taskDiv, task);

    taskDiv.appendChild(taskInfo);
    taskDiv.appendChild(resolverButton);
    taskDiv.appendChild(desmarcarButton);
    taskDiv.appendChild(eliminarButton);

    taskList.appendChild(taskDiv);

    actualizarEstadoTarea(taskDiv, task.fin);
    task.div = taskDiv;
}

function resolverTarea(taskDiv, desmarcarButton, task) {
    const today = new Date().toISOString().split('T')[0];
    if (task.fin < today) {
        alert('No se puede marcar como resuelta una tarea cuya fecha de fin ya expiró.');
        return;
    }
    task.estado = 'resuelta';
    taskDiv.classList.remove('task-white');
    taskDiv.classList.add('task-green');
    desmarcarButton.style.display = 'inline-block';
    desmarcarButton.previousSibling.style.display = 'none';
}

function desmarcarTarea(taskDiv, desmarcarButton, resolverButton, task) {
    task.estado = 'pendiente';
    taskDiv.classList.remove('task-green');
    taskDiv.classList.add('task-white');
    desmarcarButton.style.display = 'none';
    resolverButton.style.display = 'inline-block';
}

function eliminarTarea(taskDiv, task) {
    if (confirm('¿Está seguro de que desea eliminar esta tarea?')) {
        taskDiv.remove();
        tareas = tareas.filter(t => t !== task);
    }
}

function actualizarEstadoTarea(taskDiv, fechaFin) {
    const today = new Date().toISOString().split('T')[0];
    if (fechaFin < today) {
        taskDiv.classList.remove('task-white');
        taskDiv.classList.add('task-red');
    }
}

function buscarTareas() {
    const termino = document.getElementById('buscar').value.toLowerCase();
    tareas.forEach(task => {
        if (task.nombre.toLowerCase().includes(termino) || task.responsable.toLowerCase().includes(termino)) {
            task.div.style.display = 'flex';
        } else {
            task.div.style.display = 'none';
        }
    });
}

function mostrarTodas() {
    tareas.forEach(task => {
        task.div.style.display = 'flex';
    });
}

function mostrarResueltas() {
    tareas.forEach(task => {
        if (task.estado === 'resuelta') {
            task.div.style.display = 'flex';
        } else {
            task.div.style.display = 'none';
        }
    });
}

function mostrarVencidas() {
    const today = new Date().toISOString().split('T')[0];
    tareas.forEach(task => {
        if (task.fin < today && task.estado !== 'resuelta') {
            task.div.style.display = 'flex';
        } else {
            task.div.style.display = 'none';
        }
    });
}
