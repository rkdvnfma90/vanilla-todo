function TodoCount({$app}) {
    const $target = document.createElement('div');
    $target.id = 'todo-count';
    $app.appendChild($target);
    
    this.$target = $target;
    this.validate = () => {
        if(new.target !== TodoCount) {
            throw new Error('new 키워드로 함수의 인스턴스를 생성해야 합니다.');
        }
    };

    this.render = () => {
        const countTodoData = this.countTodoData;
        let todoCountStringHtml = '';

        if (countTodoData && countTodoData.allTodoListCount > 0
            && countTodoData.allTodoListCount === countTodoData.completedTodoListCount) {
            todoCountStringHtml = `총 ${countTodoData.allTodoListCount} 건 모두 완료하였습니다.`;
        } else if(countTodoData && countTodoData.allTodoListCount > 0) {
            todoCountStringHtml = `총 ${countTodoData.allTodoListCount} 건 중 ${countTodoData.completedTodoListCount} 건 완료하였습니다.`;
        } else {
            todoCountStringHtml = '해야할일이 없습니다.';
        }

        $target.innerHTML = todoCountStringHtml;
    };

    this.setState = (countTodoData) => {
        this.validate();
        this.countTodoData = countTodoData;
        this.render();
    };

}

export default TodoCount
