import { useArrayState } from '../validator/validation.js'

function Users({ $mainContent, users, searchUserTodoList }) {
  const $target = document.createElement('div')
  $target.className = 'users'
  $mainContent.appendChild($target)

  this.$target = $target
  this.users = users
  this.validate = () => {
    if (new.target !== Users) {
      throw new Error('new 키워드로 함수의 인스턴스를 생성해야 합니다.')
    }
    useArrayState(this.users)
  }

  this.createUsersHtml = (user) => {
    return `<li class="userLi">${user}</li>`
  }

  this.render = () => {
    $target.innerHTML = `<ul id="userUl">
      ${this.users.map(this.createUsersHtml).join('')}
      </ul>`
  }

  this.setEvent = () => {
    const userUl = document.querySelector('#userUl')
    userUl.addEventListener('click', (event) => {
      const target = event.target
      const userLi = target.closest('li')

      if (userLi) {
        const userName = target.innerText
        searchUserTodoList(userName)
      }
    })
  }

  this.setState = (nextUsers) => {
    this.users = nextUsers
    this.validate()
    this.render()
    this.setEvent()
  }

  this.setState(users)
}

export default Users
