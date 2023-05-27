// public/script.js
document.addEventListener('DOMContentLoaded', () => {
    const dayElement = document.getElementById('day');
    const dateElement = document.getElementById('date');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const submitBtn = document.getElementById('submitBtn');
    const todosContainer = document.getElementById('todos');
  
    submitBtn.addEventListener('click', () => {
      const title = titleInput.value;
      const description = descriptionInput.value;
  
      fetch('/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      })
        .then((response) => response.json())
        .then((data) => {
          const todoElement = createTodoElement(data);
          todosContainer.prepend(todoElement);
          titleInput.value = '';
          descriptionInput.value = '';
        })
        .catch((error) => console.error('Error creating todo:', error));
    });
  
    todosContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('deleteBtn')) {
        const todoElement = event.target.closest('.todo');
        const todoId = todoElement.dataset.id;
  
        fetch(`/todos/${todoId}`, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((data) => {
            todoElement.remove();
          })
          .catch((error) => console.error('Error deleting todo:', error));
      }
    });
  
    fetch('/todos')
      .then((response) => response.json())
      .then((data) => {
        data.forEach((todo) => {
          const todoElement = createTodoElement(todo);
          todosContainer.prepend(todoElement);
        });
      })
      .catch((error) => console.error('Error retrieving todos:', error));
  
    function createTodoElement(todo) {
      const todoElement = document.createElement('div');
      todoElement.classList.add('todo');
      todoElement.dataset.id = todo.id;
      todoElement.innerHTML = `
        <h3>${todo.title}</h3>
        <p>${todo.description}</p>
        <br>
        <button class="deleteBtn">Delete</button>
      `;
      return todoElement;
    }
  
    function getCurrentDate() {
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      const currentDate = new Date();
      const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
      const date = currentDate.toLocaleDateString('en-US', options);
      return { day, date };
    }
  
    const { day, date } = getCurrentDate();
    dayElement.textContent = day;
    dateElement.textContent = date;
  });
  