function TodoList(data, target) {
  if (new.target !== TodoList) {
    throw new Error('new 키워드로 함수의 인스턴스를 생성해야 합니다.')
  }

  validCheck(data, target)

  this.data = data
  this.target = target
  this.render = function () {
    const todoListStringHtml =
      '<ul>' +
      this.data
        .map((todo) => {
          return todo.isCompleted
            ? `<li><s> ${todo.text} </s></li>`
            : `<li> ${todo.text} </li>`
        })
        .join('') +
      '</ul>'

    document.querySelector(`#${target}`).innerHTML = todoListStringHtml
  }
  this.setState = function (nextData) {
    stateValidCheck(nextData)
    this.data = nextData
    this.render()
  }
  this.setState(data)
}

// 데이터 밸리데이션 체크
function validCheck(data, target) {
  // data가 없거나 Array 가 아닐경우
  if (!(data && Array.isArray(data))) {
    throw new Error('올바른 데이터를 넘겨주세요.')
  }

  arrayDataValidCheck(data)

  // target이 존재하지 않을 경우
  if (!(target && document.querySelector(`#${target}`))) {
    throw new Error('target이 존재하지 않습니다.')
  }
}

function stateValidCheck(data) {
  if (!Array.isArray(data)) {
    throw new Error('올바른 데이터를 넘겨주세요.')
  }

  arrayDataValidCheck(data)
}

function arrayDataValidCheck(arr) {
  arr.forEach((element, index) => {
    if (typeof element.text !== 'string') {
      throw new Error(`${index} 번째 요소의 text 속성은 string 이어야 합니다.`)
    }

    if (typeof element.isCompleted !== 'boolean') {
      throw new Error(
        `${index} 번째 요소의 isComplete 속성은 boolean 이어야 합니다.`
      )
    }
  })
}

export default TodoList
