import {
  REMOVE_ALL_EVENT,
  DELETE_ALL_MSG,
  MY_NAME,
  REMOVE_ALL_TEXT,
} from '../data/constant.js'

function TodoRemoveAll({ $app }) {
  const $target = document.createElement('button')
  const $targetTextNode = document.createTextNode(REMOVE_ALL_TEXT)

  $target.className = 'todo-remove-all'
  $target.appendChild($targetTextNode)
  $app.appendChild($target)

  this.$target = $target
  this.validate = () => {
    if (new.target !== TodoRemoveAll) {
      throw new Error('new 키워드로 함수의 인스턴스를 생성해야 합니다.')
    }
  }

  this.addRemoveAllEvent = () => {
    $target.addEventListener('click', (event) => {
      if (confirm(DELETE_ALL_MSG)) {
        const removeAllEvent = new CustomEvent(REMOVE_ALL_EVENT)
        event.target.dispatchEvent(removeAllEvent)
      }
    })
  }

  this.init = () => {
    this.validate()
    this.addRemoveAllEvent()
  }

  this.setState = (userName) => {
    userName === MY_NAME
      ? ($target.disabled = false)
      : ($target.disabled = true)
  }

  this.init()
}

export default TodoRemoveAll
