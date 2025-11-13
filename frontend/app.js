const API_URL = 'http://localhost:8080/api/tasks';  
  
const taskForm = document.getElementById('task-form');  
const taskInput = document.getElementById('task-text');  
const taskList = document.getElementById('task-list');  
  



function fetchTasks() {
  fetch(API_URL)  
    .then(res => res.json())  
    .then(data => {  
      taskList.innerHTML = '';  
      data.forEach(task => {  
        const li = document.createElement('li');  
      
	//Checkbox to toggle done
	const checkbox = document.createElement('input');
	 
	checkbox.type = 'checkbox';
	checkbox.checked = task.done;
	checkbox.addEventListener('change', () => {
		updateTask(task.id, { ...task, done: checkbox.checked });
	});

	//Task text
	const span = document.createElement('span');
	span.textContent = task.text;
	span.style.margin = '0 10px';

	//Edit button
	const editBtn = document.createElement('button');
	editBtn.textContent = '✏️';
	editBtn.addEventListener('click', () => {
		const newText = prompt('Edit task:', task.text);
		if (newText !== null) {
			updateTask(task.id, { ...task, text: newText });
		}
	});

	//Delete Button
	
	const deleteBtn = document.createElement('button');
	deleteBtn.textContent = '🗑️';
	deleteBtn.addEventListener('click', () => {
		deleteTask(task.id);
	});
	

	li.appendChild(checkbox);
	li.appendChild(span);
	li.appendChild(editBtn);
	li.appendChild(deleteBtn);
	taskList.appendChild(li);
     });	
	
//        li.textContent = `${task.text} ${task.done ? '✅' : '❌'}`;  
//        taskList.appendChild(li);  
      
      
  })  

   	
}  
  

function updateTask(id, updatedTask) {
	fetch(`${API_URL}/${id}`, {
		method: 'PUT',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(updatedTask)
	}).then(fetchTasks);
}

function deleteTask(id) {
	fetch(`${API_URL}/${id}`, {
		method: 'DELETE'
	}).then(fetchTasks);
}



taskForm.addEventListener('submit', e => {  
  e.preventDefault();  
  const text = taskInput.value;  
  fetch(API_URL, {  
    method: 'POST',  
    headers: { 'Content-Type': 'application/json' },  
    body: JSON.stringify({ text, done: false })  
  }).then(() => {  
    taskInput.value = '';  
    fetchTasks();  
  });  
});  
  
fetchTasks();  
  
