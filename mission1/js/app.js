import TodoList from './TodoList.js'
import { data, dataFood, dataTravel } from './data.js'

new TodoList(data, 'todo-list')
new TodoList(dataFood, 'todo-list-food')
new TodoList(dataTravel, 'todo-list-travel')
