// Define UI Variables

const form = document.querySelector('#task-form'),
	taskList = document.querySelector('.collection'),
	clearBtn = document.querySelector('.clear-tasks'),
	filterInput = document.querySelector('#filter'),
	taskInput = document.querySelector('#task');


// Store task in Local Storage

const storeTasksInLocalStorage = (task) => {
   let tasks;
   if (localStorage.getItem('tasks') === null){
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }
   tasks.push(task);

   localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task
const addTask = event => {
	if (taskInput.value === '') {
		alert('Add a task');
	} else {
		// Create task
		const li = document.createElement('li');

		// Add class to li
		li.className = 'collection-item';

		// Create text node and append to li
		li.appendChild(document.createTextNode(taskInput.value));

		// Create delete button
		const del = document.createElement('a');

		// Add classes to it
		del.className = 'delete-item secondary-content';

		// Append font awesome icon
		del.innerHTML = `<i class="fa fa-remove"></i>`;

		// Append del to li
		li.appendChild(del);

		// Append li to the document
		taskList.appendChild(li);
      
      // Store in Local storage
      storeTasksInLocalStorage(taskInput.value);

      // Clear input
      taskInput.value = '';

	}
   
	event.preventDefault();
};
// Delete task from Local Storage
const deletefromLS = (taskItem) => {
   let tasks;

   if (localStorage.getItem('tasks') === null){
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }
  
   tasks.forEach((task, index) => {
      if (taskItem.textContent === task){
         tasks.splice(index, 1);
      }
   })

   localStorage.setItem('tasks', JSON.stringify(tasks))
}


// Delete task
const deleteTask = (event) => {
   if (event.target.parentElement.classList.contains('delete-item')){
      if (confirm('Are you sure?')){
         event.target.parentElement.parentElement.remove();

         // Delete task from Local Storage
         deletefromLS(event.target.parentElement.parentElement);
      }
   }
}

// Clear tasks
const clearTask = () => {
   while (taskList.firstChild){
      taskList.removeChild(taskList.firstChild);

      let tasks;

      if (localStorage.getItem('tasks') === null){
         tasks = [];
      } else {
         tasks = JSON.parse(localStorage.getItem('tasks'));
      }

      localStorage.setItem('tasks', JSON.stringify([]));
   }
}

// Filter tasks
const filterTask = (event) => {
   const text = event.target.value.toLowerCase();
   document.querySelectorAll('.collection-item').forEach(task => {
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) !== -1){
         task.style.display = 'block';
      } else {
         task.style.display = 'none';
      }
   })
}

// Persist to DOM (Leveraging on HTML5 local storage power)

const getTaskfromLS = () => {
   let tasks;

   if (localStorage.getItem('tasks') === null){
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.map(task => {
      // Create task
		const li = document.createElement('li');

		// Add class to li
		li.className = 'collection-item';

		// Create text node and append to li
		li.appendChild(document.createTextNode(task));

		// Create delete button
		const del = document.createElement('a');

		// Add classes to it
		del.className = 'delete-item secondary-content';

		// Append font awesome icon
		del.innerHTML = `<i class="fa fa-remove"></i>`;

		// Append del to li
		li.appendChild(del);

		// Append li to the document
		taskList.appendChild(li);

      // Clear input
      taskInput.value = '';
   })
}

// Load all event listeners

const loadEventListeners = () => {
   // DOM load event
   window.addEventListener('DOMContentLoaded', getTaskfromLS)
	// Add task event
	form.addEventListener('submit', addTask);
	// Delete task event
   taskList.addEventListener('click', deleteTask);
   // Clear task event
   clearBtn.addEventListener('click', clearTask);
   // Filter task event
   filterInput.addEventListener('keyup', filterTask)
};

loadEventListeners();
