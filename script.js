const addTaskButton = document.getElementById('addTaskBtn')

addTaskButton.addEventListener('click', () => addTask())

const addTask = () => {
  const taskInput = document.getElementById('taskInput')

  if (taskInput.value.trim() === '') {
    alert('Nazwa zadania nie może być pusta.')
    return
  }

  const taskList = document.getElementById('taskList')
  const taskElement = createTaskElement(taskInput.value)

  taskList.appendChild(taskElement)
  taskInput.value = ''
}

const createTaskElement = (taskName) => {
  const li = document.createElement('li')
  const textSpan = document.createElement('span')
  const editBtn = document.createElement('button')
  const deleteBtn = document.createElement('button')

  textSpan.textContent = taskName
  li.appendChild(textSpan)

  editBtn.textContent = 'Edytuj'
  editBtn.onclick = () => {
    if (editBtn.textContent === 'Edytuj') {
      const input = document.createElement('input')

      input.type = 'text'
      input.value = taskName
      li.removeChild(textSpan)
      li.prepend(input)
      editBtn.textContent = 'Zatwierdź zmiany'
    } else {
      const input = li.querySelector('input')

      if (input.value.trim() === '') {
        alert('Nazwa zadania nie może być pusta.')
        return
      }

      textSpan.textContent = input.value
      li.removeChild(input)
      li.prepend(textSpan)
      editBtn.textContent = 'Edytuj'
    }
  }
  li.appendChild(editBtn)

  deleteBtn.textContent = 'Usuń'
  deleteBtn.onclick = () => li.parentNode.removeChild(li)
  li.appendChild(deleteBtn)

  return li
}
