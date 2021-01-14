import { validateTextValueCheck } from '../validator/validation.js'
import { MY_NAME, TODO_INPUT_PLACEHOLDER_TEXT } from '../data/constant.js'

function TodoInput({ $app, addTodoItem }) {
  const $target = document.createElement('input')
  $target.className = 'todo-input'
  $target.type = 'text'
  $target.placeholder = TODO_INPUT_PLACEHOLDER_TEXT

  $app.appendChild($target)

  this.$target = $target
  this.validate = () => {
    if (new.target !== TodoInput) {
      throw new Error('new 키워드로 함수의 인스턴스를 생성해야 합니다.')
    }
  }

  this.init = () => {
    this.validate()
    $target.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const target = event.target
        const inputData = {
          content: target && target.value,
          isCompleted: false,
        }

        validateTextValueCheck(inputData)
        addTodoItem(inputData)
        target.value = ''
      }
    })
  }

  this.setState = (userName) => {
    userName === MY_NAME
      ? ($target.disabled = false)
      : ($target.disabled = true)
  }

  this.init()
}

export default TodoInput
