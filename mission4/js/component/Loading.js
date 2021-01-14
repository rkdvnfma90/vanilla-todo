function Loading({ $app }) {
  const $target = document.createElement('div')
  $target.id = 'loading'
  $app.appendChild($target)

  this.$target = $target
  this.validate = () => {
    if (new.target !== Loading) {
      throw new Error('new 키워드로 함수의 인스턴스를 생성해야 합니다.')
    }
  }

  this.render = () => {
    $target.className = this.isLoading ? 'loading' : 'loading-completed'
    $target.innerHTML = `<img class="loading-img" src="../../img/loading.gif" alt="로딩중">`
  }

  this.setState = (nextLoadingState) => {
    this.validate()
    this.isLoading = nextLoadingState
    this.render()
  }
}

export default Loading
