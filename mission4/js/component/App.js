import TodoList from './TodoList.js'
import TodoInput from './TodoInput.js'
import TodoCount from './TodoCount.js'
import TodoRemoveAll from './TodoRemoveAll.js'
import Loading from './Loading.js'
import { REMOVE_ALL_EVENT, MY_NAME } from '../data/constant.js'
import {
  searchTodosByName,
  createTodo,
  deleteTodo,
  toggleTodo,
  deleteAllTodos,
  searchUsers,
} from '../util/api.js'
import Users from './Users.js'
import MiniTrello from './MiniTrello.js'

function App({ $app }) {
  this.$app = $app
  this.$loading = new Loading({
    $app,
  })

  this.init = async () => {
    const $todoTitle = document.querySelector('#todo-title')
    const $mainContent = document.createElement('div')

    $mainContent.className = 'main-content'

    this.$todoTitle = $todoTitle
    this.todos = await this.searchTodoList()
    this.users = await this.searchUserList()

    this.todoInput = new TodoInput({
      $app,
      addTodoItem,
    })

    this.todoRemoveAll = new TodoRemoveAll({
      $app,
    })

    this.todoCount = new TodoCount({
      $app,
    })

    $app.appendChild($mainContent)

    this.miniTrello = new MiniTrello({
      $mainContent,
      todos: this.todos,
      updateTodoItem,
      deleteTodoItem,
    })
    this.users = new Users({
      $mainContent,
      users: this.users,
      searchUserTodoList,
    })

    this.initRemoveAllBtn()
    this.countTodoItem(this.todos)
  }

  this.searchTodoList = async (userName = MY_NAME) => {
    const searchResult = await this.setLoading(() =>
      searchTodosByName(userName)
    )
    this.setTitle(userName)
    return searchResult
  }

  this.searchUserList = async () => {
    const searchUserResult = await this.setLoading(() => searchUsers())
    return searchUserResult
  }

  this.setStateForComponents = async (userName = MY_NAME) => {
    const searchResult = await this.setLoading(() =>
      this.searchTodoList(userName)
    )

    this.miniTrello.setState(searchResult, userName)
    this.todoRemoveAll.setState(userName)
    this.todoInput.setState(userName)
    this.countTodoItem(searchResult)
  }

  this.initRemoveAllBtn = () => {
    const removeAllBtn = this.todoRemoveAll.$target
    removeAllBtn.addEventListener(REMOVE_ALL_EVENT, (event) => {
      deleteAllTodoItem()
    })
  }

  this.setLoading = async (fetchMethod) => {
    this.$loading.setState(true)
    const result = await fetchMethod()
    this.$loading.setState(false)
    return result
  }

  this.setTitle = (name) => {
    this.$todoTitle.innerHTML = `${name}'s To Do List`
  }

  this.countTodoItem = (todoItem) => {
    const completedTodoList = todoItem.filter((data) => data.isCompleted)
    const countTodo = {
      allTodoListCount: todoItem.length,
      completedTodoListCount: completedTodoList.length,
    }

    this.todoCount.setState(countTodo)
  }

  const addTodoItem = async (todoItem) => {
    await this.setLoading(() =>
      createTodo({ userName: MY_NAME, content: todoItem.content })
    )
    await this.setStateForComponents()
  }

  const updateTodoItem = async (todoItem) => {
    await this.setLoading(() => toggleTodo({ _id: todoItem._id }))
    await this.setStateForComponents()
  }

  const deleteTodoItem = async (todoItem) => {
    await this.setLoading(() => deleteTodo({ _id: todoItem._id }))
    await this.setStateForComponents()
  }

  const deleteAllTodoItem = async () => {
    await this.setLoading(() => deleteAllTodos())
    await this.setStateForComponents()
  }

  const searchUserTodoList = async (userName) => {
    await this.setStateForComponents(userName)
  }

  this.init()
}

export default App
