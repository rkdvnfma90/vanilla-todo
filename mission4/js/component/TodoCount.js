function TodoCount({ $app }) {
  const $target = document.createElement('div')
  $target.className = 'todo-count'
  $app.appendChild($target)

  this.$target = $target
  this.validate = () => {
    if (new.target !== TodoCount) {
      throw new Error('new 키워드로 함수의 인스턴스를 생성해야 합니다.')
    }
  }

  this.render = () => {
    const countTodo = this.countTodo
    let todoCountStringHtml = ''

    if (
      countTodo &&
      countTodo.allTodoListCount > 0 &&
      countTodo.allTodoListCount === countTodo.completedTodoListCount
    ) {
      todoCountStringHtml = `총 ${countTodo.allTodoListCount} 건 모두 완료하였습니다.`
    } else if (countTodo && countTodo.allTodoListCount > 0) {
      todoCountStringHtml = `총 ${countTodo.allTodoListCount} 건 중 ${countTodo.completedTodoListCount} 건 완료하였습니다.`
    } else {
      todoCountStringHtml = '해야할일이 없습니다.'
    }

    $target.innerHTML = todoCountStringHtml
  }

  this.setState = (countTodo) => {
    this.validate()
    this.countTodo = countTodo
    this.render()
  }
}

export default TodoCount
