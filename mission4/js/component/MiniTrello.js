import TodoList from './TodoList.js'

function MiniTrello({ $mainContent, todos, updateTodoItem, deleteTodoItem }) {
  const $target = document.createElement('div')
  const $inCompletedTodoList = document.createElement('div')
  const $completedTodoList = document.createElement('div')

  $target.className = 'mini-trello'
  $inCompletedTodoList.className = 'incompleted-todo-list'
  $completedTodoList.className = 'completed-todo-list'

  this.$target = $target
  this.todos = todos

  $target.appendChild($inCompletedTodoList)
  $target.appendChild($completedTodoList)
  $mainContent.appendChild($target)

  this.filterCompleted = (data) => data.isCompleted

  this.filterIncompleted = (data) => !data.isCompleted

  this.inCompletedTodoList = new TodoList({
    componentName: 'incompleted',
    $todoList: $inCompletedTodoList,
    todos: this.todos.filter(this.filterIncompleted),
    updateTodoItem,
    deleteTodoItem,
  })
  this.completedTodoList = new TodoList({
    componentName: 'completed',
    $todoList: $completedTodoList,
    todos: this.todos.filter(this.filterCompleted),
    updateTodoItem,
    deleteTodoItem,
  })

  this.setState = (nextTodos, userName) => {
    this.todos = nextTodos
    this.completedTodoList.setState(
      this.todos.filter(this.filterCompleted),
      userName
    )
    this.inCompletedTodoList.setState(
      this.todos.filter(this.filterIncompleted),
      userName
    )
  }

  $target.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', event.target.id)
  })
}

export default MiniTrello
