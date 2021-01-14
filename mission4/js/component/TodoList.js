import { useArrayState, checkTypes } from '../validator/validation.js'
import { MY_NAME } from '../data/constant.js'

function TodoList({
  componentName,
  $todoList,
  todos,
  updateTodoItem,
  deleteTodoItem,
}) {
  this.$todoList = $todoList
  this.todos = todos
  this.componentName = componentName

  this.validate = (todos) => {
    if (new.target !== TodoList) {
      throw new Error('new 키워드로 함수의 인스턴스를 생성해야 합니다.')
    }
    useArrayState(todos)
    checkTypes(
      todos,
      ({ content, isCompleted }) =>
        typeof content === 'string' && typeof isCompleted === 'boolean'
    )
  }

  this.createTodoHtml = (todo, index) => {
    const todoText = todo.isCompleted
      ? `<s> ${todo.content} </s>`
      : `${todo.content}`

    const delBtnClassName =
      this.userName === MY_NAME ? 'view-delete-btn' : 'hide-delete-btn'

    const isDraggable = this.userName === MY_NAME ? true : false

    return `
      <li id=${todo._id} class="todoLi" data-completed=${todo.isCompleted} data-index=${index} draggable=${isDraggable}>
        ${todoText}
        <button class=${delBtnClassName} type="button" data-index=${index}> 삭제 </button>
      </li>
    `
  }

  this.render = () => {
    $todoList.innerHTML = `
      <ul id="${this.componentName}-todo-ul">
        ${this.todos.map(this.createTodoHtml).join('')}
      </ul>
    `
  }

  this.setState = (nextTodos, userName = MY_NAME) => {
    this.validate(nextTodos)
    this.todos = nextTodos
    this.userName = userName
    this.render()
    this.setEventListener()
  }

  this.setEventListener = () => {
    const todoUl = document.querySelector(`#${this.componentName}-todo-ul`)

    todoUl.addEventListener('click', (event) => {
      const target = event.target
      const todoLi = target.closest('li')

      if (todoLi) {
        const todoDelBtn = target.closest('button')
        const index = todoLi.dataset.index
        const items = this.todos

        if (this.userName === MY_NAME) {
          if (todoDelBtn) {
            deleteTodoItem(items[index])
          } else {
            updateTodoItem(items[index])
          }
        }
      }
    })

    $todoList.addEventListener('drop', (event) => {
      event.preventDefault()
      const todoId = event.dataTransfer.getData('text/plain')
      const $dragStartTarget = document.getElementById(todoId).parentElement
        .parentElement

      if ($dragStartTarget !== $todoList) {
        updateTodoItem({ _id: todoId })
      }
    })

    $todoList.addEventListener('dragover', (event) => {
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'
    })
  }

  this.setState(todos)
}

export default TodoList
